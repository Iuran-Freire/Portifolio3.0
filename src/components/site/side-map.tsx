"use client";

import { useEffect } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { stageIds } from "./stages";

/*
  Mapa lateral: uma marca fina por etapa, à direita da tela.
  A etapa atual fica vermelha, mais longa e mostra o nome; as outras
  mostram o nome ao passar o mouse. Clicar leva até a etapa.
  Também marca a etapa atual na navegação do cabeçalho.
  Funciona sem animação (usa IntersectionObserver, não o GSAP).
*/
export function SideMap({ d }: { d: Dictionary }) {
  useEffect(() => {
    const setCurrent = (id: string) => {
      document.querySelectorAll("[data-stage-link]").forEach((el) => {
        if (el.getAttribute("href") === `#${id}`) el.setAttribute("data-current", "");
        else el.removeAttribute("data-current");
      });
    };

    // Uma etapa é a atual quando cruza a faixa central da tela.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    stageIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label={d.nav.label}
      className="fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 md:block"
    >
      <ol className="flex flex-col items-end gap-3.5">
        {stageIds.map((id) => (
          <li key={id}>
            <a data-stage-link href={`#${id}`} className="side-map-link group flex items-center gap-3 py-1">
              <span className="side-map-label label-mono">{d.nav[id]}</span>
              <span aria-hidden className="side-map-tick block h-0.5 rounded-full" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
