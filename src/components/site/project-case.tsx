import { ArrowUpRight } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/content/projects";

const labels = {
  problem: { pt: "O problema", en: "The problem" },
  solution: { pt: "A solução", en: "The solution" },
  results: { pt: "Resultado", en: "Outcome" },
  flow: { pt: "Como o dado passa pelo sistema", en: "How data moves through it" },
};

// Projeto em destaque: contado como estudo de caso.
export function ProjectCase({ project, locale, d }: { project: Project; locale: Locale; d: Dictionary }) {
  const t = <T,>(v: { pt: T; en: T }) => pick(v, locale);

  return (
    <article
      data-card
      aria-labelledby={`${project.id}-title`}
      className="origin-top rounded-2xl border border-grid bg-surface p-6 will-change-transform md:p-10"
    >
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-[60ch]">
          <h3 id={`${project.id}-title`} className="font-wide text-[length:var(--step-2)] leading-tight font-bold">
            {t(project.title)}
          </h3>
          <p className="mt-3 text-ink-muted">{t(project.summary)}</p>
        </div>
        {project.metric && (
          <p className="min-w-[12rem]">
            <span data-count className="block font-mono text-[length:var(--step-4)] leading-none text-cobalt">
              {project.metric.value}
            </span>
            <span className="mt-2 block text-sm text-ink-muted">
              {t(project.metric.label)}
              {project.metric.estimated && <span className="text-ink-muted/70"> ({d.estimated})</span>}
            </span>
          </p>
        )}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          {project.problem && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-ink-muted">{t(labels.problem)}</h4>
              <p>{t(project.problem)}</p>
            </div>
          )}
          {project.solution && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-ink-muted">{t(labels.solution)}</h4>
              <p>{t(project.solution)}</p>
            </div>
          )}
          {project.results && project.results.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-semibold text-ink-muted">{t(labels.results)}</h4>
              <ul className="space-y-2">
                {project.results.map((result) => (
                  <li key={result.pt} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-valid" />
                    <span>{t(result)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {project.flow && project.flow.length > 0 && (
            <div className="rounded-xl border border-grid bg-paper/60 p-5">
              <h4 className="mb-4 text-sm font-semibold text-ink-muted">{t(labels.flow)}</h4>
              <ol data-flow className="space-y-0">
                {project.flow.map((step, i) => (
                  <li key={step.pt} className="relative flex gap-4 pb-4 last:pb-0">
                    {i < project.flow!.length - 1 && (
                      <span aria-hidden className="absolute top-7 bottom-1 left-[0.8125rem] w-px bg-cobalt/40" />
                    )}
                    <span className="grid size-[1.625rem] shrink-0 place-items-center rounded-full border border-cobalt/60 font-mono text-xs text-cobalt">
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
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-cobalt underline-offset-4 hover:underline"
            >
              {d.actions.viewCode}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// Projeto menor: uma linha de contexto, stack e link.
export function ProjectCompact({ project, locale, d }: { project: Project; locale: Locale; d: Dictionary }) {
  const t = <T,>(v: { pt: T; en: T }) => pick(v, locale);
  return (
    <article data-fade className="flex flex-col gap-3 border-t border-grid pt-6">
      <h3 className="font-wide text-[length:var(--step-1)] font-bold">{t(project.title)}</h3>
      <p className="text-ink-muted">{t(project.summary)}</p>
      <p className="font-mono text-xs text-ink-muted">{project.stack.join(", ")}</p>
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-cobalt underline-offset-4 hover:underline"
        >
          {d.actions.viewCode}
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      )}
    </article>
  );
}
