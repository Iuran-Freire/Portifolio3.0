"use client";

import type React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChartColumn } from "lucide-react";
import {
  siCloudflare,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siTypescript,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

gsap.registerPlugin(useGSAP);

/*
  Logos das tecnologias flutuando ao redor do retrato.
  Cada logo tem duas camadas: a de fora reage ao mouse (profundidade) e a de
  dentro flutua sozinha, devagar. A cor da marca aparece ao passar o mouse.
  Power BI não tem logo livre de uso (marca da Microsoft): vira um ícone
  genérico de gráfico com o nome escrito.
  Com "reduzir movimento" os logos ficam parados.
*/

type Chip = { icon?: SimpleIcon; label: string; x: string; y: string; size: number; depth: number };

const chips: Chip[] = [
  { icon: siPython, label: "Python", x: "4%", y: "12%", size: 58, depth: 1.2 },
  { icon: siTypescript, label: "TypeScript", x: "80%", y: "6%", size: 50, depth: 0.8 },
  { icon: siReact, label: "React", x: "90%", y: "40%", size: 56, depth: 1.4 },
  { icon: siVuedotjs, label: "Vue", x: "-4%", y: "46%", size: 48, depth: 0.7 },
  { icon: siNodedotjs, label: "Node.js", x: "84%", y: "74%", size: 52, depth: 1 },
  { icon: siPostgresql, label: "PostgreSQL", x: "2%", y: "78%", size: 54, depth: 1.3 },
  { icon: siCloudflare, label: "Cloudflare", x: "44%", y: "-4%", size: 46, depth: 0.6 },
  { icon: siNextdotjs, label: "Next.js", x: "62%", y: "88%", size: 44, depth: 0.9 },
  { label: "Power BI", x: "18%", y: "-2%", size: 0, depth: 1.1 },
];

export function HeroTech() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const floats = gsap.utils.toArray<HTMLElement>("[data-float]");
      floats.forEach((el) => {
        gsap.to(el, {
          y: gsap.utils.random(-16, 16),
          x: gsap.utils.random(-8, 8),
          rotation: gsap.utils.random(-8, 8),
          duration: gsap.utils.random(3, 5.5),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 1.5),
        });
      });

      // Profundidade: logos "mais perto" andam mais com o mouse.
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((el) => ({
        depth: Number(el.dataset.depth),
        x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
      }));
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => {
          l.x(-nx * 36 * l.depth);
          l.y(-ny * 28 * l.depth);
        });
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0">
      {chips.map((chip) => (
        <span
          key={chip.label}
          data-depth={chip.depth}
          className="absolute"
          style={{ left: chip.x, top: chip.y }}
        >
          <span data-float className="block">
            <span
              data-tech-chip
              title={chip.label}
              className="tech-chip pointer-events-auto flex items-center justify-center gap-2 rounded-2xl border border-grid bg-surface/80 text-ink-muted shadow-[0_10px_30px_-12px_rgb(0_0_0/0.6)] backdrop-blur-md transition-colors duration-300"
              style={
                chip.icon
                  ? ({
                      width: chip.size,
                      height: chip.size,
                      // Marcas pretas (Next.js) somem no fundo escuro: usam a cor do texto.
                      "--brand": chip.icon.hex === "000000" ? "var(--ink)" : `#${chip.icon.hex}`,
                    } as React.CSSProperties)
                  : ({ "--brand": "#F2C811" } as React.CSSProperties)
              }
            >
              {chip.icon ? (
                <svg viewBox="0 0 24 24" className="size-[46%]" fill="currentColor">
                  <path d={chip.icon.path} />
                </svg>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold">
                  <ChartColumn className="size-4" />
                  {chip.label}
                </span>
              )}
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}

// Faixa contínua de logos para o celular, onde não cabem ao redor da foto.
export function TechMarquee() {
  const items = chips;
  return (
    <div aria-hidden className="tech-marquee relative -mx-6 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] lg:hidden">
      <div className="tech-marquee-track flex w-max gap-3">
        {[...items, ...items].map((chip, i) => (
          <span
            key={`${chip.label}-${i}`}
            className="flex h-11 shrink-0 items-center gap-2 rounded-xl border border-grid bg-surface/80 px-3 text-xs text-ink-muted"
          >
            {chip.icon ? (
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                <path d={chip.icon.path} />
              </svg>
            ) : (
              <ChartColumn className="size-4" />
            )}
            {chip.label}
          </span>
        ))}
      </div>
    </div>
  );
}
