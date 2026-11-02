import type React from "react";
import { ArrowUpRight } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/content/projects";
import { cardLabels } from "@/content/copy";

const statusStyle: Record<Project["status"], string> = {
  "in-use": "border-valid/60 text-valid",
  prototype: "border-ink/25 text-ink-muted",
  dashboard: "border-signal/50 text-signal",
  "this-site": "border-ink/25 text-ink-muted",
};

// Um projeto contado sempre no mesmo formato. Campos ausentes não aparecem.
export function ProjectCard({
  project,
  index,
  total,
  locale,
  d,
}: {
  project: Project;
  index: number;
  total: number;
  locale: Locale;
  d: Dictionary;
}) {
  const t = <T,>(v: { pt: T; en: T }) => pick(v, locale);
  const hasStory = Boolean(project.problem || project.challenges || project.results || project.learned);

  return (
    <article
      data-card
      aria-labelledby={`${project.id}-title`}
      className="origin-top rounded-2xl border border-grid bg-surface p-6 will-change-transform md:p-10"
    >
      {/* Cabeçalho: número, selo, título, resumo e o número de impacto */}
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-[62ch]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label-mono text-signal">
              {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className={`label-mono rounded-full border px-2.5 py-1 ${statusStyle[project.status]}`}>
              {project.status === "in-use" && (
                <span aria-hidden className="mr-1.5 inline-block size-1.5 rounded-full bg-valid align-middle" />
              )}
              {t(cardLabels.status[project.status])}
            </span>
          </div>
          <h3 id={`${project.id}-title`} className="font-display mt-4 text-[length:var(--step-3)] leading-none">
            {t(project.title)}
          </h3>
          <p className="mt-4 text-[length:var(--step-1)] leading-relaxed text-ink-muted">{t(project.oneLiner)}</p>
        </div>
        {project.metric && (
          <p className="min-w-[13rem]">
            <span data-count className="block font-mono text-[length:var(--step-4)] leading-none text-signal">
              {project.metric.value}
            </span>
            <span className="mt-2 block max-w-[24ch] text-sm text-ink-muted">
              {t(project.metric.label)}
              {project.metric.estimated && <span className="text-ink-muted/70"> ({d.estimated})</span>}
            </span>
          </p>
        )}
      </div>

      <div className={`mt-10 grid gap-10 ${hasStory || project.flow ? "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]" : ""}`}>
        {/* A história: problema, dificuldade, o que foi feito, resultado, aprendizado */}
        <div className="space-y-8">
          {project.problem && (
            <Block label={t(cardLabels.problem)}>
              <p>{t(project.problem)}</p>
            </Block>
          )}
          {project.challenges && (
            <Block label={t(cardLabels.challenges)}>
              <ul className="space-y-2.5">
                {project.challenges.map((c) => (
                  <li key={c.pt} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-signal" />
                    <span>{t(c)}</span>
                  </li>
                ))}
              </ul>
            </Block>
          )}
          {project.built && (
            <Block label={t(cardLabels.built)}>
              <p>{t(project.built)}</p>
            </Block>
          )}
          {project.results && (
            <Block label={t(cardLabels.results)}>
              <ul className="space-y-2.5">
                {project.results.map((r) => (
                  <li key={r.pt} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-valid" />
                    <span>{t(r)}</span>
                  </li>
                ))}
              </ul>
            </Block>
          )}
          {project.learned && (
            <Block label={t(cardLabels.learned)}>
              <blockquote className="border-l-2 border-signal pl-4 text-[length:var(--step-1)] leading-relaxed">
                {t(project.learned)}
              </blockquote>
            </Block>
          )}
        </div>

        {/* A parte técnica: fluxo, stack e links */}
        <div className="space-y-8">
          {project.flow && (
            <div className="rounded-xl border border-grid bg-paper/60 p-5">
              <h4 className="label-mono mb-4 text-ink-muted">{t(cardLabels.flow)}</h4>
              <ol data-flow>
                {project.flow.map((step, i) => (
                  <li key={step.pt} className="relative flex gap-4 pb-4 last:pb-0">
                    {i < project.flow!.length - 1 && (
                      <span aria-hidden className="absolute top-7 bottom-1 left-[0.8125rem] w-px bg-signal/40" />
                    )}
                    <span className="grid size-[1.625rem] shrink-0 place-items-center rounded-full border border-signal/60 font-mono text-xs text-signal">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-[0.95rem]">{t(step)}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-md border border-grid px-2 py-1 font-mono text-xs text-ink-muted">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.repo && <CardLink href={project.repo} label={d.actions.viewCode} />}
            {project.links?.map((link) => (
              <CardLink key={link.href} href={link.href} label={t(link.label)} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="label-mono mb-3 text-signal">{label}</h4>
      {children}
    </div>
  );
}

function CardLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-signal/60 px-4 py-2 text-sm font-semibold text-signal transition-colors hover:bg-signal hover:text-signal-ink"
    >
      {label}
      <ArrowUpRight className="size-4" aria-hidden />
    </a>
  );
}
