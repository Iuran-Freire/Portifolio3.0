"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);

/*
  Abertura do portfólio, inspirada na do portfólio atual do Iuran:
  1. cortina preta com o "IF." e uma linha vermelha carregando (só na
     primeira visita da sessão); a cortina sobe revelando o site;
  2. as letras do título caem uma a uma, dobrando de cima para baixo;
  3. o parágrafo desce palavra por palavra; depois botões, foto e cabeçalho.
  Com "reduzir movimento" nada disso roda e a página aparece pronta.
*/
export function Intro() {
  useGSAP(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro-pending")) return;

    const withCurtain = !root.classList.contains("intro-seen");
    const title = document.querySelector<HTMLElement>("[data-intro-title]");
    const lead = document.querySelector<HTMLElement>("[data-intro-lead]");
    if (!title || !lead) {
      root.classList.remove("intro-pending");
      return;
    }

    const titleSplit = SplitText.create(title, { type: "lines,chars", mask: "lines" });
    const leadSplit = SplitText.create(lead, { type: "words" });

    // A partir daqui o GSAP controla a visibilidade.
    root.classList.remove("intro-pending");
    root.classList.add("intro-running");

    let done = false;
    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      onComplete: () => {
        done = true;
        root.classList.remove("intro-running");
        try {
          sessionStorage.setItem("intro-seen", "1");
        } catch {}
      },
    });

    if (withCurtain) {
      tl.from("[data-intro-logo] span", { yPercent: 110, duration: 0.7, stagger: 0.08 })
        .fromTo("[data-intro-bar]", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, "-=0.2")
        .to("[data-intro-curtain]", { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "+=0.05")
        .set("[data-intro-curtain]", { display: "none" });
    } else {
      tl.set("[data-intro-curtain]", { display: "none" });
    }

    tl.from(
      titleSplit.chars,
      {
        yPercent: -115,
        rotateX: -90,
        transformOrigin: "50% 0%",
        opacity: 0,
        duration: 1,
        stagger: 0.022,
      },
      withCurtain ? "-=0.45" : 0.1,
    )
      .from(
        leadSplit.words,
        {
          rotateX: -80,
          transformOrigin: "50% 0%",
          transformPerspective: 600,
          opacity: 0,
          y: -8,
          duration: 0.7,
          stagger: 0.018,
        },
        "-=0.6",
      )
      .from("[data-intro-item]", { opacity: 0, y: 24, duration: 0.8, stagger: 0.1 }, "-=0.55")
      .from(
        "[data-intro-photo]",
        { clipPath: "inset(100% 0% 0% 0%)", y: 40, duration: 1.2, ease: "expo.inOut" },
        withCurtain ? "-=1.3" : "-=1.1",
      )
      .from("header", { yPercent: -100, opacity: 0, duration: 0.8 }, "<0.2");

    return () => {
      titleSplit.revert();
      leadSplit.revert();
      // Desmontado no meio (ex.: o React monta duas vezes em desenvolvimento):
      // volta ao estado inicial para a próxima montagem recomeçar a abertura.
      if (!done) {
        root.classList.remove("intro-running");
        root.classList.add("intro-pending");
      }
    };
  });

  return (
    <div
      aria-hidden
      data-intro-curtain
      className="intro-curtain fixed inset-0 z-[60] flex-col items-center justify-center gap-6 bg-paper"
    >
      <p data-intro-logo className="font-display flex overflow-hidden text-7xl leading-none">
        <span className="inline-block">I</span>
        <span className="inline-block">F</span>
        <span className="inline-block text-signal">.</span>
      </p>
      <span className="block h-px w-40 overflow-hidden bg-grid">
        <span data-intro-bar className="block h-full w-full origin-left bg-signal" />
      </span>
    </div>
  );
}
