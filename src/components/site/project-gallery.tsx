"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/content/projects";
import { galleryLabels } from "@/content/copy";
import { lenisStore } from "@/lib/lenis";
import { ProjectDetail, StatusBadge } from "./project-case";
import { spotlightStyle, useTilt } from "./use-tilt";

/*
  Vitrine dos projetos: todos visíveis de uma vez, em grade.
  Clicar num cartão abre o estudo de caso completo num painel (<dialog>)
  que cresce a partir do cartão. Dentro do painel, ← e → passam para o
  projeto anterior ou seguinte; Esc ou o X fecha e devolve o foco ao cartão.
  Os 8 painéis ficam no HTML (fechados), então o conteúdo continua indexável.
*/
export function ProjectGallery({ projects, locale, d }: { projects: Project[]; locale: Locale; d: Dictionary }) {
  const t = <T,>(v: { pt: T; en: T }) => pick(v, locale);
  const [open, setOpen] = useState<number | null>(null);
  const dialogs = useRef<(HTMLDialogElement | null)[]>([]);
  const tiles = useRef<(HTMLElement | null)[]>([]);
  const reduce = useRef(false);

  const { onPointerMove: onTileMove, onPointerLeave: onTileLeave } = useTilt(7);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const show = useCallback((index: number, from?: DOMRect) => {
    const dialog = dialogs.current[index];
    if (!dialog) return;
    const panel = dialog.querySelector<HTMLElement>("[data-panel]")!;
    dialog.showModal();
    panel.scrollTop = 0;
    lenisStore.current?.stop();
    setOpen(index);
    if (reduce.current) return;

    // O painel cresce a partir do cartão clicado (ou entra de lado ao navegar).
    if (from) {
      const to = panel.getBoundingClientRect();
      gsap.fromTo(
        panel,
        {
          x: from.left + from.width / 2 - (to.left + to.width / 2),
          y: from.top + from.height / 2 - (to.top + to.height / 2),
          scaleX: from.width / to.width,
          scaleY: from.height / to.height,
          opacity: 0.6,
        },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: 0.65, ease: "expo.out" },
      );
      gsap.fromTo(panel.querySelector("[data-panel-body]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.2 });
    }
  }, []);

  const close = useCallback(
    (index: number, then?: () => void) => {
      const dialog = dialogs.current[index];
      if (!dialog) return;
      const finish = () => {
        dialog.close();
        if (then) then();
        else {
          setOpen(null);
          lenisStore.current?.start();
          tiles.current[index]?.querySelector<HTMLElement>("[data-open]")?.focus();
        }
      };
      if (reduce.current) return finish();
      const panel = dialog.querySelector<HTMLElement>("[data-panel]")!;
      const tile = tiles.current[index];
      if (!then && tile) {
        // Ao fechar, o painel encolhe de volta para o cartão.
        const to = tile.getBoundingClientRect();
        const from = panel.getBoundingClientRect();
        gsap.to(panel, {
          x: to.left + to.width / 2 - (from.left + from.width / 2),
          y: to.top + to.height / 2 - (from.top + from.height / 2),
          scaleX: to.width / from.width,
          scaleY: to.height / from.height,
          opacity: 0,
          duration: 0.45,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(panel, { clearProps: "all" });
            finish();
          },
        });
      } else {
        gsap.to(panel, { opacity: 0, x: -40, duration: 0.25, ease: "power2.in", onComplete: () => {
          gsap.set(panel, { clearProps: "all" });
          finish();
        } });
      }
    },
    [],
  );

  const go = useCallback(
    (from: number, step: number) => {
      const next = (from + step + projects.length) % projects.length;
      close(from, () => {
        show(next);
        if (!reduce.current) {
          const panel = dialogs.current[next]?.querySelector<HTMLElement>("[data-panel]");
          if (panel) gsap.fromTo(panel, { opacity: 0, x: 60 * step }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" });
        }
      });
    },
    [close, show, projects.length],
  );

  // Setas do teclado navegam entre projetos com o painel aberto.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(open, 1);
      if (e.key === "ArrowLeft") go(open, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <>
      <ul data-gallery className="grid gap-5 md:grid-cols-6">
        {projects.map((project, i) => {
          const featured = i < 2;
          return (
            <li
              key={project.id}
              ref={(el) => {
                tiles.current[i] = el;
              }}
              data-tile
              onPointerMove={onTileMove}
              onPointerLeave={onTileLeave}
              className={`group relative flex flex-col rounded-2xl border border-grid bg-surface p-6 transition-[border-color] duration-300 [transform-style:preserve-3d] hover:border-signal/70 md:p-7 ${
                featured ? "md:col-span-3" : "md:col-span-2"
              }`}
            >
              {/* Luz que segue o cursor dentro do cartão */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={spotlightStyle}
              />
              <div className="relative flex flex-wrap items-center gap-3">
                <span className="label-mono text-signal">{String(i + 1).padStart(2, "0")}</span>
                <StatusBadge project={project} locale={locale} />
              </div>
              <h3
                className={`font-display relative mt-5 leading-[1.02] ${featured ? "text-[length:var(--step-3)]" : "text-[length:var(--step-2)]"}`}
              >
                {t(project.title)}
              </h3>
              <p className={`relative mt-3 text-ink-muted ${featured ? "" : "line-clamp-4 text-[0.95rem]"}`}>{t(project.oneLiner)}</p>

              {project.metric && (
                <p className="relative mt-6 flex items-baseline gap-3">
                  <span
                    data-count
                    className={`font-mono leading-none whitespace-nowrap text-signal ${featured ? "text-[length:var(--step-3)]" : "text-[length:var(--step-2)]"}`}
                  >
                    {project.metric.value}
                  </span>
                  <span className="max-w-[22ch] text-sm leading-snug text-ink-muted">{t(project.metric.label)}</span>
                </p>
              )}

              <p className="relative mt-6 font-mono text-xs text-ink-muted">{project.stack.slice(0, featured ? 6 : 4).join(" · ")}</p>

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                {/* O botão cobre o cartão inteiro; o link de código fica por cima dele */}
                <button
                  type="button"
                  data-open
                  onClick={(e) => show(i, (e.currentTarget.closest("[data-tile]") as HTMLElement).getBoundingClientRect())}
                  aria-haspopup="dialog"
                  className="inline-flex items-center gap-2 font-semibold text-ink after:absolute after:inset-0 after:rounded-2xl after:content-['']"
                >
                  {t(galleryLabels.open)}
                  <ArrowRight className="size-4 text-signal transition-transform group-hover:translate-x-1" aria-hidden />
                </button>
                {(project.repo || project.links?.[0]) && (
                  <a
                    href={project.repo ?? project.links![0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-signal"
                  >
                    {project.repo ? d.actions.viewCode : d.actions.openDashboard}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {projects.map((project, i) => (
        <dialog
          key={project.id}
          ref={(el) => {
            dialogs.current[i] = el;
          }}
          aria-labelledby={`${project.id}-detail-title`}
          onCancel={(e) => {
            e.preventDefault();
            close(i);
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close(i);
          }}
          className="project-dialog m-auto h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-ink backdrop:bg-black/70 backdrop:backdrop-blur-sm md:h-[92dvh] md:w-[min(76rem,94vw)]"
        >
          <div
            data-panel
            data-lenis-prevent
            className="h-full overflow-y-auto overscroll-contain border border-grid bg-surface md:rounded-2xl"
          >
            {/* Barra fixa do painel: posição, navegação e fechar */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-grid bg-surface/95 px-5 py-3 backdrop-blur md:px-8">
              <span className="label-mono text-ink-muted">
                <span className="text-signal">{String(i + 1).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2">
                <PanelButton label={t(galleryLabels.previous)} onClick={() => go(i, -1)}>
                  <ArrowLeft className="size-4" aria-hidden />
                </PanelButton>
                <PanelButton label={t(galleryLabels.next)} onClick={() => go(i, 1)}>
                  <ArrowRight className="size-4" aria-hidden />
                </PanelButton>
                <PanelButton label={t(galleryLabels.close)} onClick={() => close(i)}>
                  <X className="size-4" aria-hidden />
                </PanelButton>
              </div>
            </div>
            <div data-panel-body className="p-6 md:p-10">
              <ProjectDetail project={project} index={i + 1} total={projects.length} locale={locale} d={d} />
            </div>
          </div>
        </dialog>
      ))}
    </>
  );
}

function PanelButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full border border-grid text-ink-muted transition-colors hover:border-signal hover:text-signal"
    >
      {children}
    </button>
  );
}
