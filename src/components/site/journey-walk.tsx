"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { pick, type Locale } from "@/i18n/config";
import { timeline } from "@/content/profile";
import { scenes } from "./journey-scenes";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
  A trajetória como uma caminhada.
  No desktop, a seção fica presa na tela e a rolagem move as cenas para o
  lado, enquanto um bonequinho caminha pela trilha embaixo, de cena em cena;
  os detalhes de cada ilustração surgem quando ela chega.
  No celular e com "reduzir movimento", as cenas viram um carrossel de
  arrastar, sem prender a rolagem.
*/
export function JourneyWalk({ locale }: { locale: Locale }) {
  const t = <T,>(v: { pt: T; en: T }) => pick(v, locale);
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [step, setStep] = useState(0);

  useGSAP(
    () => {
      const el = root.current!;
      const list = track.current!;
      const walker = el.querySelector<HTMLElement>("[data-walker]")!;
      const panels = gsap.utils.toArray<HTMLElement>("[data-scene]", list);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        el.dataset.pinned = "true";
        const distance = () => list.scrollWidth - el.clientWidth;

        const move = gsap.to(list, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // O bonequinho anda pela trilha conforme a rolagem avança.
              gsap.set(walker, { left: `${6 + self.progress * 86}%` });
              walker.dataset.walking = Math.abs(self.getVelocity()) > 20 ? "true" : "false";
              walker.dataset.facing = self.direction < 0 ? "left" : "right";
              setStep(Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1))));
            },
          },
        });

        // Os detalhes de cada cena surgem quando ela entra na tela.
        panels.forEach((panel) => {
          gsap.from(panel.querySelectorAll("[data-pop]"), {
            scale: 0.4,
            opacity: 0,
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
            duration: 0.6,
            ease: "back.out(2)",
            stagger: 0.06,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: move,
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          });
        });

        return () => {
          delete el.dataset.pinned;
          delete walker.dataset.walking;
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="journey-walk relative -mx-6 flex flex-col justify-center overflow-x-auto md:-mx-10 md:h-dvh"
    >
      {/* Gradiente de brilho usado pelas ilustrações */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <radialGradient id="journey-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <ol
        ref={track}
        className="flex w-max snap-x snap-mandatory gap-6 px-6 pt-4 pb-28 md:gap-10 md:px-10 md:pt-24"
      >
        {timeline.map((item, i) => {
          const Scene = scenes[i] ?? scenes[scenes.length - 1];
          return (
            <li
              key={item.period.pt}
              data-scene
              className="flex w-[82vw] shrink-0 snap-center flex-col gap-5 sm:w-[60vw] md:w-[min(52vw,34rem,calc((100dvh-17rem)*1.43))]"
            >
              <div className="aspect-[10/7] overflow-hidden rounded-3xl border border-grid bg-surface/80 p-4 backdrop-blur-sm md:p-6">
                <Scene title={t(item.title)} />
              </div>
              <div className="max-w-[52ch]">
                <p className="label-mono text-signal">
                  {String(i + 1).padStart(2, "0")} <span className="text-ink-muted">/ {t(item.period)}</span>
                </p>
                <h3 className="font-display mt-3 text-[length:var(--step-3)] leading-none">{t(item.title)}</h3>
                <p className="mt-3 text-ink-muted">{t(item.text)}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Trilha com o bonequinho caminhando (só no desktop com animação) */}
      <div aria-hidden className="journey-trail pointer-events-none absolute inset-x-0 bottom-10 hidden h-16">
        <div className="absolute inset-x-[6%] bottom-3 border-t-2 border-dashed border-grid" />
        {timeline.map((_, i) => (
          <span
            key={i}
            className={`absolute bottom-[0.5625rem] size-3 -translate-x-1/2 rounded-full border-2 transition-colors duration-300 ${
              i <= step ? "border-signal bg-signal" : "border-grid bg-paper"
            }`}
            style={{ left: `${6 + (i / (timeline.length - 1)) * 86}%` }}
          />
        ))}
        <div data-walker className="walker absolute bottom-4 -translate-x-1/2" style={{ left: "6%" }}>
          <svg viewBox="0 0 40 60" className="h-12 w-8" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round">
            <circle cx="20" cy="9" r="7" fill="var(--signal)" stroke="none" />
            <path d="M20 17 L20 36" />
            <path className="walker-arm-a" d="M20 22 L10 32" />
            <path className="walker-arm-b" d="M20 22 L30 32" />
            <path className="walker-leg-a" d="M20 36 L12 56" />
            <path className="walker-leg-b" d="M20 36 L28 56" />
          </svg>
        </div>
      </div>
    </div>
  );
}
