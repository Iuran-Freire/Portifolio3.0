"use client";

import type React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { stageIds } from "./stages";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Cor e posição do brilho de fundo em cada etapa: o recrutador sente que avançou.
const ambient: Record<string, { x: string; y: string; color: string }> = {
  source: { x: "80%", y: "20%", color: "rgba(239, 85, 75, 0.14)" },
  ingestion: { x: "18%", y: "40%", color: "rgba(239, 85, 75, 0.09)" },
  processing: { x: "85%", y: "55%", color: "rgba(240, 163, 93, 0.09)" },
  analysis: { x: "25%", y: "70%", color: "rgba(239, 85, 75, 0.11)" },
  deploy: { x: "55%", y: "85%", color: "rgba(239, 85, 75, 0.16)" },
};

/*
  Coreografia da página inteira:
  - rolagem suave (Lenis) sincronizada com o GSAP;
  - títulos que sobem de dentro de uma máscara;
  - estudos de caso que se empilham (o próximo desliza por cima);
  - fluxo de cada projeto acendendo no ritmo da rolagem;
  - números que contam, brilho de fundo que muda por etapa,
    etapa atual marcada no cabeçalho e a etiqueta final "impressa".
  Com "reduzir movimento", nada disso roda e o conteúdo fica como está.
*/
export function Motion() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -72 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Brilho de fundo e etapa atual no cabeçalho.
    const glow = document.querySelector<HTMLElement>("[data-ambient]");
    stageIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      const link = document.querySelector<HTMLElement>(`header a[href="#${id}"]`);
      const enter = () => {
        const a = ambient[id];
        if (glow) gsap.to(glow, { "--glow-x": a.x, "--glow-y": a.y, "--glow-color": a.color, duration: 1.4, ease: "power2.out" });
        document.querySelectorAll("header [data-current]").forEach((el) => el.removeAttribute("data-current"));
        link?.setAttribute("data-current", "");
      };
      ScrollTrigger.create({ trigger: section, start: "top 55%", end: "bottom 55%", onEnter: enter, onEnterBack: enter });
    });

    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (ctx) => {
      const desktop = Boolean(ctx.conditions?.desktop);

      // Títulos das etapas: cada linha sobe de dentro de uma máscara.
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
      });

      // Blocos de apoio entram com um deslize curto.
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Estudos de caso: entram abrindo de dentro para fora.
      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(6% 4% 6% 4% round 28px)", scale: 0.97 },
          {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top 95%", end: "top 45%", scrub: 0.6 },
          },
        );
      });

      // Cartões empilhados: o cartão fica preso e o próximo desliza por cima.
      if (desktop) {
        gsap.utils.toArray<HTMLElement>("[data-stack-group]").forEach((group) => {
          const cards = gsap.utils.toArray<HTMLElement>("[data-card]", group);
          cards.slice(0, -1).forEach((card, i) => {
            const next = cards[i + 1];
            const tall = () => card.offsetHeight > window.innerHeight - 110;
            ScrollTrigger.create({
              trigger: card,
              start: () => (tall() ? "bottom bottom-=24" : "top top+=88"),
              endTrigger: next,
              end: "top top+=88",
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            });
            gsap.to(card, {
              scale: 0.92,
              opacity: 0.35,
              ease: "none",
              scrollTrigger: { trigger: next, start: "top bottom", end: "top top+=88", scrub: true },
            });
          });
        });
      }

      // O caminho do dado em cada projeto acende passo a passo com a rolagem.
      gsap.utils.toArray<HTMLElement>("[data-flow]").forEach((list) => {
        const steps = list.querySelectorAll("li");
        gsap.fromTo(
          steps,
          { opacity: 0.22, x: -10 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.5,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 82%", end: desktop ? "bottom 50%" : "bottom 70%", scrub: 0.5 },
          },
        );
      });

      // Números contam a partir de zero.
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const match = el.textContent?.match(/^(\D*)(\d+)(.*)$/);
        if (!match) return;
        const [, prefix, digits, suffix] = match;
        const state = { value: 0 };
        gsap.to(state, {
          value: Number(digits),
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(state.value)}${suffix}`;
          },
        });
      });

      // Fechamento: a etiqueta sai "impressa" e os botões chegam em sequência.
      const deploy = document.getElementById("deploy");
      if (deploy) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: deploy, start: "top 65%", once: true } });
        tl.fromTo(
          "[data-print]",
          { clipPath: "inset(0 0 100% 0)", y: -14 },
          { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.7, ease: "steps(6)" },
        ).from("[data-deploy-item]", { opacity: 0, y: 18, stagger: 0.12, duration: 0.6, ease: "power3.out" }, "-=0.1");
      }
    });

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      mm.revert();
    };
  });

  return (
    <div
      aria-hidden
      data-ambient
      className="pointer-events-none fixed inset-0 -z-10"
      style={
        {
          "--glow-x": "80%",
          "--glow-y": "20%",
          "--glow-color": "rgba(239, 85, 75, 0.14)",
          background: "radial-gradient(60rem 40rem at var(--glow-x) var(--glow-y), var(--glow-color), transparent 70%)",
        } as React.CSSProperties
      }
    />
  );
}
