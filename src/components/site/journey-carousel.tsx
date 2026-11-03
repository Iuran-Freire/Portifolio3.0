"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import { timeline } from "@/content/profile";
import { journeyLabels } from "@/content/copy";
import { scenes } from "./journey-scenes";

/*
  A trajetória como um carretel de cenas.
  No topo, a pipeline com as 7 etapas ligadas por uma linha que se enche de
  vermelho até a etapa atual; clicar numa etapa, usar as setas (botões ou
  teclado) ou arrastar para o lado troca a cena. A arte entra deslizando
  com uma "cortina" e um leve zoom, e o texto chega em seguida.
  Cada etapa mostra a imagem em public/journey/<id>.webp quando existir
  (image: true); senão, a ilustração em SVG.
*/
export function JourneyCarousel({ locale }: { locale: Locale }) {
  const t = <T,>(v: { pt: T; en: T }) => pick(v, locale);
  const [index, setIndex] = useState(0);
  const previous = useRef(0);
  const stage = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const total = timeline.length;

  function go(next: number) {
    const target = (next + total) % total;
    if (target !== index) setIndex(target);
  }

  // Transição entre cenas: a nova arte abre como cortina na direção da navegação.
  useEffect(() => {
    const from = previous.current;
    previous.current = index;
    if (from === index) return;
    const forward = index > from;
    const arts = stage.current?.querySelectorAll<HTMLElement>("[data-art]");
    const incoming = arts?.[index];
    const outgoing = arts?.[from];
    if (!incoming || !outgoing) return;
    // A visibilidade das cenas é controlada aqui (não pelo React), para a cena
    // que sai continuar visível durante a transição.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(outgoing, { autoAlpha: 0 });
      gsap.set(incoming, { autoAlpha: 1 });
      return;
    }

    gsap.killTweensOf([incoming, outgoing]);
    gsap.set(outgoing, { zIndex: 1 });
    gsap.set(incoming, { zIndex: 2, autoAlpha: 1 });
    gsap.fromTo(
      incoming,
      { clipPath: forward ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" },
    );
    gsap.fromTo(incoming.querySelector("[data-art-inner]"), { scale: 1.12, x: forward ? 40 : -40 }, { scale: 1, x: 0, duration: 1.2, ease: "expo.out" });
    gsap.to(outgoing.querySelector("[data-art-inner]"), { x: forward ? -60 : 60, scale: 0.96, duration: 0.9, ease: "expo.inOut" });
    gsap.set(outgoing, { autoAlpha: 0, delay: 0.9 });
    gsap.set(outgoing.querySelector("[data-art-inner]"), { x: 0, scale: 1, delay: 0.95 });

    if (text.current) {
      gsap.fromTo(
        text.current.children,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.07, delay: 0.25 },
      );
    }
  }, [index]);

  const item = timeline[index];

  return (
    <div
      className="outline-none"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      {/* Pipeline das etapas */}
      <nav aria-label={t(journeyLabels.steps)} className="relative">
        <div aria-hidden className="absolute top-[0.6875rem] right-[calc(100%/14)] left-[calc(100%/14)] h-0.5 bg-grid">
          <div
            className="h-full origin-left bg-signal transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `scaleX(${index / (total - 1)})` }}
          />
        </div>
        <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
          {timeline.map((step, i) => {
            const done = i <= index;
            return (
              <li key={step.id} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === index ? "step" : undefined}
                  aria-label={`${String(i + 1).padStart(2, "0")}. ${t(step.title)}`}
                  className="group flex flex-col items-center gap-3"
                >
                  <span
                    className={`grid size-6 place-items-center rounded-full border-2 transition-all duration-500 ${
                      i === index
                        ? "scale-125 border-signal bg-signal shadow-[0_0_0_6px_color-mix(in_oklab,var(--signal)_22%,transparent)]"
                        : done
                          ? "border-signal bg-signal"
                          : "border-grid bg-paper group-hover:border-signal/60"
                    }`}
                  />
                  <span
                    className={`label-mono hidden text-center transition-colors md:block ${
                      i === index ? "text-signal" : "text-ink-muted group-hover:text-ink"
                    }`}
                  >
                    {t(step.step)}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        {/* A arte da etapa: todas empilhadas, só a atual visível */}
        <div
          ref={stage}
          className="relative aspect-[16/10] touch-pan-y overflow-hidden rounded-3xl border border-grid bg-surface select-none"
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerUp={(e) => {
            const start = drag.current;
            drag.current = null;
            if (!start) return;
            const dx = e.clientX - start.x;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - start.y)) go(index + (dx < 0 ? 1 : -1));
          }}
        >
          {timeline.map((step, i) => {
            const Scene = scenes[i] ?? scenes[scenes.length - 1];
            return (
              <div
                key={step.id}
                data-art
                aria-hidden={i !== index}
                className="absolute inset-0"
                style={{ visibility: i === 0 ? "visible" : "hidden" }}
              >
                <div data-art-inner className="absolute inset-0">
                  {step.image ? (
                    <Image
                      src={`/journey/${step.id}.webp`}
                      alt={t(step.title)}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 p-6 md:p-10">
                      <Scene title={t(step.title)} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {/* Brilho e vinheta por cima da arte */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklab,var(--signal)_14%,transparent),transparent_60%)]" />
        </div>

        {/* O texto da etapa */}
        <div>
          <div ref={text} aria-live="polite">
            <p className="label-mono text-signal">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              <span className="text-ink-muted"> · {t(item.period)}</span>
            </p>
            <h3 className="font-display mt-4 text-[length:var(--step-4)] leading-[0.98]">{t(item.title)}</h3>
            <p className="mt-5 max-w-[46ch] text-[length:var(--step-1)] leading-relaxed text-ink-muted">{t(item.text)}</p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={t(journeyLabels.previous)}
              className="grid size-12 place-items-center rounded-full border border-grid text-ink-muted transition-colors hover:border-signal hover:text-signal"
            >
              <ArrowLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={t(journeyLabels.next)}
              className="grid size-12 place-items-center rounded-full bg-signal text-signal-ink transition-transform hover:scale-105"
            >
              <ArrowRight className="size-5" aria-hidden />
            </button>
            <span className="ml-2 text-sm text-ink-muted">{t(journeyLabels.hint)}</span>
          </div>
        </div>
      </div>

      {/* Gradiente de brilho usado pelas ilustrações em SVG */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <radialGradient id="journey-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
