"use client";

import type React from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project, ProjectArea } from "@/content/projects";
import { areaLabels, galleryLabels } from "@/content/copy";
import { lenisStore } from "@/lib/lenis";
import { ProjectDetail, StatusBadge } from "./project-case";
import { spotlightStyle, useTilt } from "./use-tilt";

const areas: ProjectArea[] = ["dev", "data"];

/*
  Vitrine dos projetos, dividida por área (Desenvolvimento / Dados e Power BI).
  Cada área é um carrossel horizontal: setas, arrasto com o dedo ou trackpad e
  uma barra de progresso. Trocar de área faz os cartões atuais descerem e os
  novos subirem em onda, como um carretel.
  Clicar num cartão abre o estudo de caso completo num painel (<dialog>) que
  cresce a partir do cartão; ← e → passam pelos projetos da mesma área.
  Os 8 painéis ficam no HTML (fechados), então o conteúdo continua indexável.
*/
export function ProjectGallery({ projects, locale, d }: { projects: Project[]; locale: Locale; d: Dictionary }) {
  const t = <T,>(v: { pt: T; en: T }) => pick(v, locale);
  const [area, setArea] = useState<ProjectArea>("dev");
  const [open, setOpen] = useState<number | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false, progress: 0 });
  const dialogs = useRef<(HTMLDialogElement | null)[]>([]);
  const tiles = useRef<(HTMLElement | null)[]>([]);
  const scroller = useRef<HTMLUListElement>(null);
  const reduce = useRef(false);
  const switching = useRef(false);
  const firstRender = useRef(true);

  const { onPointerMove: onTileMove, onPointerLeave: onTileLeave } = useTilt(7);

  // Posição de cada projeto dentro da sua área (para "03 / 06").
  const byArea = (a: ProjectArea) => projects.map((p, i) => ({ p, i })).filter(({ p }) => p.area === a);
  const visible = byArea(area);
  const positionInArea = (i: number) => {
    const list = byArea(projects[i].area);
    return { index: list.findIndex((x) => x.i === i) + 1, total: list.length };
  };

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Setas habilitadas/desabilitadas e barra de progresso do carrossel.
  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft >= max - 4,
      progress: max > 0 ? el.scrollLeft / max : 1,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, area]);

  function scrollByCard(direction: 1 | -1) {
    const el = scroller.current;
    const card = el?.querySelector<HTMLElement>("[data-tile]");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 20;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reduce.current ? "auto" : "smooth" });
  }

  // Trocar de área: os cartões atuais descem, os novos sobem em onda.
  function chooseArea(next: ProjectArea) {
    if (next === area || switching.current) return;
    const current = scroller.current?.querySelectorAll("[data-tile]");
    if (reduce.current || !current?.length) {
      setArea(next);
      return;
    }
    switching.current = true;
    gsap.to(current, {
      y: 60,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.04,
      onComplete: () => setArea(next),
    });
  }

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = scroller.current;
    if (!el) return;
    el.scrollLeft = 0;
    const cards = el.querySelectorAll("[data-tile]");
    if (!reduce.current) {
      gsap.fromTo(
        cards,
        { y: 120, opacity: 0, rotateX: 18, transformPerspective: 1000, transformOrigin: "50% 100%", clipPath: "inset(40% 0% 0% 0% round 16px)" },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          clearProps: "transform,clipPath,opacity",
          onComplete: () => {
            switching.current = false;
          },
        },
      );
    } else {
      switching.current = false;
    }
  }, [area]);

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

  const close = useCallback((index: number, then?: () => void) => {
    const dialog = dialogs.current[index];
    if (!dialog) return;
    const finish = () => {
      dialog.close();
      if (then) then();
      else {
        setOpen(null);
        lenisStore.current?.start();
        tiles.current[index]?.querySelector<HTMLElement>("[data-open]")?.focus({ preventScroll: true });
      }
    };
    if (reduce.current) return finish();
    const panel = dialog.querySelector<HTMLElement>("[data-panel]")!;
    const tile = tiles.current[index];
    const tileRect = tile?.getBoundingClientRect();
    const tileVisible = tileRect && tileRect.width > 0 && tileRect.right > 0 && tileRect.left < window.innerWidth;
    if (!then && tileRect && tileVisible) {
      // Ao fechar, o painel encolhe de volta para o cartão.
      const from = panel.getBoundingClientRect();
      gsap.to(panel, {
        x: tileRect.left + tileRect.width / 2 - (from.left + from.width / 2),
        y: tileRect.top + tileRect.height / 2 - (from.top + from.height / 2),
        scaleX: tileRect.width / from.width,
        scaleY: tileRect.height / from.height,
        opacity: 0,
        duration: 0.45,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(panel, { clearProps: "all" });
          finish();
        },
      });
    } else {
      gsap.to(panel, {
        opacity: 0,
        x: then ? -40 : 0,
        scale: then ? 1 : 0.96,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(panel, { clearProps: "all" });
          finish();
        },
      });
    }
  }, []);

  // ← e → navegam dentro da área do projeto aberto, e o carrossel acompanha.
  const go = useCallback(
    (from: number, step: number) => {
      const list = projects.map((p, i) => ({ p, i })).filter(({ p }) => p.area === projects[from].area);
      const pos = list.findIndex((x) => x.i === from);
      const next = list[(pos + step + list.length) % list.length].i;
      close(from, () => {
        show(next);
        tiles.current[next]?.scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
        if (!reduce.current) {
          const panel = dialogs.current[next]?.querySelector<HTMLElement>("[data-panel]");
          if (panel) gsap.fromTo(panel, { opacity: 0, x: 60 * step }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" });
        }
      });
    },
    [close, show, projects],
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
      {/* Abas de área */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div role="tablist" aria-label={t(galleryLabels.areas)} className="flex flex-wrap gap-2">
          {areas.map((a) => {
            const selected = a === area;
            return (
              <button
                key={a}
                type="button"
                role="tab"
                id={`tab-${a}`}
                aria-selected={selected}
                aria-controls="project-carousel"
                tabIndex={selected ? 0 : -1}
                onClick={() => chooseArea(a)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const next = areas[(areas.indexOf(a) + 1) % areas.length];
                    chooseArea(next);
                    document.getElementById(`tab-${next}`)?.focus();
                  }
                }}
                className={`group inline-flex items-center gap-3 rounded-full border px-5 py-3 font-semibold transition-colors duration-300 ${
                  selected
                    ? "border-signal bg-signal text-signal-ink"
                    : "border-grid text-ink-muted hover:border-signal/60 hover:text-ink"
                }`}
              >
                {t(areaLabels[a])}
                <span
                  className={`grid min-w-6 place-items-center rounded-full px-1.5 font-mono text-xs ${
                    selected ? "bg-signal-ink/15" : "bg-grid text-ink-muted"
                  }`}
                >
                  {byArea(a).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Setas do carrossel */}
        <div className="flex items-center gap-2">
          <PanelButton label={t(galleryLabels.scrollPrev)} onClick={() => scrollByCard(-1)} disabled={edges.start}>
            <ArrowLeft className="size-4" aria-hidden />
          </PanelButton>
          <PanelButton label={t(galleryLabels.scrollNext)} onClick={() => scrollByCard(1)} disabled={edges.end}>
            <ArrowRight className="size-4" aria-hidden />
          </PanelButton>
        </div>
      </div>

      {/* Carrossel da área escolhida */}
      <ul
        ref={scroller}
        id="project-carousel"
        role="tabpanel"
        aria-labelledby={`tab-${area}`}
        data-gallery
        onScroll={measure}
        className="-mx-6 mt-8 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pt-3 pb-6 [scrollbar-width:none] md:-mx-10 md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {visible.map(({ p: project, i }, n) => (
          <li
            key={project.id}
            ref={(el) => {
              tiles.current[i] = el;
            }}
            data-tile
            onPointerMove={onTileMove}
            onPointerLeave={onTileLeave}
            className="group relative flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border border-grid bg-surface p-6 transition-[border-color] duration-300 [transform-style:preserve-3d] hover:border-signal/70 sm:w-[62%] md:p-7 lg:w-[calc((100%-2.5rem)/3)]"
          >
            {/* Luz que segue o cursor dentro do cartão */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={spotlightStyle}
            />
            <div className="relative flex flex-wrap items-center gap-3">
              <span className="label-mono text-signal">
                {String(n + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
              </span>
              <StatusBadge project={project} locale={locale} />
            </div>
            <h3 className="font-display relative mt-5 text-[length:var(--step-2)] leading-[1.02]">{t(project.title)}</h3>
            <p className="relative mt-3 line-clamp-5 text-[0.95rem] text-ink-muted">{t(project.oneLiner)}</p>

            {project.metric && (
              <p className="relative mt-6 flex items-baseline gap-3">
                <span
                  data-count
                  className="font-mono text-[length:var(--step-2)] leading-none whitespace-nowrap text-signal"
                >
                  {project.metric.value}
                </span>
                <span className="max-w-[22ch] text-sm leading-snug text-ink-muted">{t(project.metric.label)}</span>
              </p>
            )}

            <p className="relative mt-6 font-mono text-xs text-ink-muted">{project.stack.slice(0, 5).join(" · ")}</p>

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
        ))}
      </ul>

      {/* Barra de progresso do carrossel */}
      <div aria-hidden className="mt-2 h-px w-full bg-grid">
        <div
          className="h-full origin-left bg-signal transition-transform duration-300"
          style={{ transform: `scaleX(${Math.max(edges.progress, visible.length ? 1 / visible.length : 1)})` }}
        />
      </div>

      {projects.map((project, i) => {
        const { index, total } = positionInArea(i);
        return (
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
              {/* Barra fixa do painel: área, posição, navegação e fechar */}
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-grid bg-surface/95 px-5 py-3 backdrop-blur md:px-8">
                <span className="label-mono text-ink-muted">
                  {t(areaLabels[project.area])}
                  <span className="mx-2">·</span>
                  <span className="text-signal">{String(index).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
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
                <ProjectDetail project={project} index={index} total={total} locale={locale} d={d} />
              </div>
            </div>
          </dialog>
        );
      })}
    </>
  );
}

function PanelButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      aria-disabled={disabled}
      className={`grid size-10 place-items-center rounded-full border border-grid text-ink-muted transition-colors hover:border-signal hover:text-signal ${
        disabled ? "pointer-events-none opacity-35" : ""
      }`}
    >
      {children}
    </button>
  );
}
