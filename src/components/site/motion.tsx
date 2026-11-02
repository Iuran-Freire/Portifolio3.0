"use client";

import type React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { lenisStore } from "@/lib/lenis";
import { stageIds } from "./stages";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Cor e posição do brilho de fundo em cada etapa: o recrutador sente que avançou.
const ambient: Record<string, { x: string; y: string; color: string }> = {
  home: { x: "80%", y: "20%", color: "rgba(239, 85, 75, 0.14)" },
  projects: { x: "15%", y: "45%", color: "rgba(239, 85, 75, 0.08)" },
  journey: { x: "85%", y: "60%", color: "rgba(240, 163, 93, 0.09)" },
  contact: { x: "55%", y: "85%", color: "rgba(239, 85, 75, 0.16)" },
};

/*
  Coreografia da página inteira:
  - rolagem suave (Lenis) sincronizada com o GSAP;
  - títulos que sobem de dentro de uma máscara;
  - vitrine de projetos que chega em sequência;
  - números que contam, brilho de fundo que muda por etapa,
    e a etiqueta final "impressa".
  Com "reduzir movimento", nada disso roda e o conteúdo fica como está.
*/
export function Motion() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -72 } });
    lenisStore.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Brilho de fundo por etapa.
    const glow = document.querySelector<HTMLElement>("[data-ambient]");
    stageIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      const enter = () => {
        const a = ambient[id];
        if (glow) gsap.to(glow, { "--glow-x": a.x, "--glow-y": a.y, "--glow-color": a.color, duration: 1.4, ease: "power2.out" });
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

      // Vitrine de projetos: os cartões chegam em sequência, de baixo e levemente inclinados.
      gsap.utils.toArray<HTMLElement>("[data-gallery]").forEach((gallery) => {
        gsap.from(gallery.querySelectorAll("[data-tile]"), {
          opacity: 0,
          y: 80,
          scale: 0.94,
          rotateX: desktop ? 12 : 0,
          transformPerspective: 1000,
          transformOrigin: "50% 100%",
          clipPath: "inset(30% 0% 0% 0% round 16px)",
          duration: 1.1,
          ease: "expo.out",
          stagger: { each: 0.09, from: "start" },
          clearProps: "transform,clipPath",
          scrollTrigger: { trigger: gallery, start: "top 82%", once: true },
        });
      });

      // Números contam a partir de zero.
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        // Guarda o valor original: se a animação for recriada, não parte de um texto já zerado.
        el.dataset.countValue ??= el.textContent ?? "";
        const match = el.dataset.countValue.match(/^(\D*)(\d+)(.*)$/);
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
      const deploy = document.getElementById("contact");
      if (deploy) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: deploy, start: "top 65%", once: true } });
        tl.fromTo(
          "[data-print]",
          { clipPath: "inset(0 0 100% 0)", y: -14 },
          { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.7, ease: "steps(6)" },
        ).from("[data-deploy-item]", { opacity: 0, y: 18, stagger: 0.12, duration: 0.6, ease: "power3.out" }, "-=0.1");
      }
    });

    // Fontes e textos divididos mudam a altura dos cartões depois do carregamento:
    // recalcula as posições quando tudo assentar, senão o empilhamento erra o ponto.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisStore.current = null;
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
