"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Linha de leitura: o pacote fica "parado" nessa altura da tela enquanto a página rola.
const READ_LINE = "45%";

/*
  O elemento memorável da página.
  - O trilho (traço fraco) percorre o conteúdo inteiro.
  - O preenchimento (traço forte) cresce com a rolagem.
  - O pacote de dados acompanha a leitura e muda de forma a cada etapa:
    sinal → registro → registro validado → gráfico → etiqueta.
  Sem animação (celular ou "reduzir movimento"), o conteúdo continua completo.
*/
export function Pipeline() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const main = el.parentElement!;
      const fill = el.querySelector<HTMLElement>("[data-rail-fill]")!;
      const packet = el.querySelector<HTMLElement>("[data-packet]")!;
      const nodes = gsap.utils.toArray<HTMLElement>("[data-stage-node]", main);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        el.dataset.animated = "true";

        // O traço forte acompanha a linha de leitura do topo ao fim do conteúdo.
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: main, start: `top ${READ_LINE}`, end: `bottom ${READ_LINE}`, scrub: 0.4 },
          },
        );

        // Cada marcador acende quando o pacote passa por ele.
        nodes.forEach((node, i) => {
          ScrollTrigger.create({
            trigger: node,
            start: `top ${READ_LINE}`,
            onEnter: () => {
              node.dataset.active = "true";
              packet.dataset.stage = String(i + 1);
            },
            onLeaveBack: () => {
              delete node.dataset.active;
              packet.dataset.stage = String(Math.max(i, 1));
            },
          });
        });

        // Abertura: o primeiro trecho do traço e o pacote entram junto com o título.
        gsap.from(packet, { scale: 0, opacity: 0, duration: 0.6, delay: 0.5, ease: "back.out(2)" });

        return () => {
          delete el.dataset.animated;
          nodes.forEach((node) => delete node.dataset.active);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute top-0 bottom-0 left-[3.625rem] hidden w-px md:block"
    >
      {/* Trilho */}
      <div className="absolute inset-0 bg-signal/25" />
      {/* Preenchimento que cresce com a rolagem */}
      <div data-rail-fill className="absolute inset-0 origin-top bg-signal shadow-[0_0_12px_var(--signal)]" />
      {/* Pacote de dados: fica na linha de leitura (sticky) e troca de forma por etapa */}
      <div className="sticky top-[45vh] h-0">
        <div
          data-packet
          data-stage="1"
          className="packet absolute top-0 left-0 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-signal bg-paper text-signal shadow-[0_0_24px_-4px_var(--signal)]"
        >
          <PacketGlyphs />
        </div>
      </div>
    </div>
  );
}

// Uma forma para cada etapa do pipeline. O CSS mostra só a da etapa atual.
function PacketGlyphs() {
  const common = "packet-glyph absolute size-5";
  return (
    <>
      {/* 1. Fonte: sinal bruto */}
      <svg data-glyph="1" className={common} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polyline points="1,11 6,11 8,5 11,16 13,9 15,11 19,11" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      {/* 2. Ingestão: um registro capturado */}
      <svg data-glyph="2" className={common} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <line x1="6" y1="8" x2="14" y2="8" strokeLinecap="round" />
        <line x1="6" y1="12" x2="11" y2="12" strokeLinecap="round" />
      </svg>
      {/* 3. Processamento: registro validado */}
      <svg data-glyph="3" className={common} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <polyline points="6.5,10.5 9,13 14,7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* 4. Análise: virou gráfico */}
      <svg data-glyph="4" className={common} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
        <line x1="5" y1="16" x2="5" y2="10" strokeLinecap="round" />
        <line x1="10" y1="16" x2="10" y2="5" strokeLinecap="round" />
        <line x1="15" y1="16" x2="15" y2="8" strokeLinecap="round" />
      </svg>
      {/* 5. Deploy: etiqueta pronta */}
      <svg data-glyph="5" className={common} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 4h8l6 6-6 6H3z" strokeLinejoin="round" />
        <circle cx="7" cy="10" r="1.3" />
      </svg>
    </>
  );
}
