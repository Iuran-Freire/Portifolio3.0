import type React from "react";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { contacts, timeline } from "@/content/profile";
import { projects, projectsByStage } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import {
  analysisCopy,
  deployCopy,
  footerCopy,
  ingestionCopy,
  processingCopy,
  sourceCopy,
} from "@/content/copy";
import { ProjectCase, ProjectCompact } from "./project-case";
import { Stage, StageNode } from "./stages";

type Props = { locale: Locale; d: Dictionary };

const tr = (locale: Locale) => <T,>(v: { pt: T; en: T }) => pick(v, locale);

// 1. Fonte: quem é o Iuran e o que ele procura.
export function SourceSection({ locale, d }: Props) {
  const t = tr(locale);
  return (
    <section id="source" aria-labelledby="source-title" className="relative scroll-mt-24 pt-16 pb-24 md:pt-28 md:pb-32">
      <StageNode index={1} className="top-16 md:top-28" />
      <h1
        id="source-title"
        data-reveal
        className="font-wide max-w-[20ch] text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[1.03] font-extrabold tracking-tight"
      >
        {t(sourceCopy.title)}
      </h1>
      <p data-reveal style={{ "--reveal-order": 1 } as React.CSSProperties} className="mt-8 max-w-[62ch] text-[length:var(--step-1)] leading-relaxed text-ink-muted">
        {t(sourceCopy.lead)}
      </p>
      <p data-reveal style={{ "--reveal-order": 2 } as React.CSSProperties} className="mt-4 max-w-[62ch] text-[length:var(--step-1)] font-medium">{t(sourceCopy.seeking)}</p>

      <div data-reveal style={{ "--reveal-order": 3 } as React.CSSProperties} className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href="#ingestion"
          className="rounded-full bg-cobalt px-6 py-3 font-semibold text-cobalt-ink transition-transform hover:-translate-y-0.5"
        >
          {d.actions.seeProjects}
        </a>
        <a
          href={d.resume.file}
          download
          className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-6 py-3 font-semibold transition-colors hover:border-cobalt hover:text-cobalt"
        >
          <Download className="size-4" aria-hidden />
          {d.actions.downloadResume}
        </a>
      </div>

      <div className="mt-20 max-w-3xl">
        <h2 className="mb-6 text-sm font-semibold text-ink-muted">{t(sourceCopy.journeyTitle)}</h2>
        <ol className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {timeline.map((item) => (
            <li key={item.period.pt} className="border-l border-grid pl-4">
              <p className="font-mono text-xs text-cobalt">{t(item.period)}</p>
              <p className="mt-1 text-[0.95rem]">{t(item.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// 2. Ingestão: apps que capturam o dado.
export function IngestionSection({ locale, d }: Props) {
  const t = tr(locale);
  const items = projectsByStage("ingestion");
  return (
    <Stage id="ingestion" index={2} name={d.nav.ingestion} title={t(ingestionCopy.title)} intro={t(ingestionCopy.intro)}>
      <div className="space-y-12">
        {items.filter((p) => p.featured).map((p) => (
          <ProjectCase key={p.id} project={p} locale={locale} d={d} />
        ))}
        <div className="grid gap-10 md:grid-cols-2">
          {items.filter((p) => !p.featured).map((p) => (
            <ProjectCompact key={p.id} project={p} locale={locale} d={d} />
          ))}
        </div>
      </div>
    </Stage>
  );
}

// 3. Processamento: regras, APIs e banco.
export function ProcessingSection({ locale, d }: Props) {
  const t = tr(locale);
  return (
    <Stage id="processing" index={3} name={d.nav.processing} title={t(processingCopy.title)} intro={t(processingCopy.intro)}>
      <div data-stack-group className="space-y-12">
        {projectsByStage("processing").map((p) => (
          <ProjectCase key={p.id} project={p} locale={locale} d={d} />
        ))}
      </div>
    </Stage>
  );
}

// 4. Análise: dashboards, números e ferramentas.
export function AnalysisSection({ locale, d }: Props) {
  const t = tr(locale);
  const dashboards = projectsByStage("analysis")[0];
  const metrics = projects.flatMap((p) => (p.metric ? [{ ...p.metric, project: p.title }] : []));
  const systemsCount = projects.filter((p) => p.stage !== "analysis").length;

  return (
    <Stage id="analysis" index={4} name={d.nav.analysis} title={t(analysisCopy.title)} intro={t(analysisCopy.intro)}>
      {dashboards?.links && (
        <ul className="grid gap-6 md:grid-cols-2">
          {dashboards.links.map((link) => (
            <li key={link.href} data-fade>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-grid bg-surface/80 p-6 transition-colors hover:border-cobalt"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-wide text-[length:var(--step-1)] font-bold">{t(link.label)}</span>
                  <ArrowUpRight className="size-5 text-cobalt transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
                <span className="mt-2 block text-sm text-ink-muted">{d.actions.openDashboard} · Power BI</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <div data-fade className="mt-20">
        <h3 className="mb-6 text-sm font-semibold text-ink-muted">{t(analysisCopy.numbersTitle)}</h3>
        <dl className="grid border-t border-grid sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.value} className="flex flex-col border-b border-grid py-6 sm:pr-6">
              <dt className="text-sm text-ink-muted">
                {t(m.project)}: {t(m.label)}
                {m.estimated && ` (${d.estimated})`}
              </dt>
              <dd data-count className="order-first mb-2 font-mono text-[length:var(--step-3)] leading-none text-cobalt">{m.value}</dd>
            </div>
          ))}
          <div className="flex flex-col border-b border-grid py-6 sm:pr-6">
            <dt className="text-sm text-ink-muted">{t(analysisCopy.systemsBuilt)}</dt>
            <dd data-count className="order-first mb-2 font-mono text-[length:var(--step-3)] leading-none text-cobalt">{systemsCount}</dd>
          </div>
          <div className="flex flex-col border-b border-grid py-6">
            <dt className="text-sm text-ink-muted">{t(analysisCopy.publicDashboards)}</dt>
            <dd data-count className="order-first mb-2 font-mono text-[length:var(--step-3)] leading-none text-cobalt">
              {dashboards?.links?.length ?? 0}
            </dd>
          </div>
        </dl>
      </div>

      <div data-fade className="mt-20">
        <h3 className="mb-6 text-sm font-semibold text-ink-muted">{t(analysisCopy.skillsTitle)}</h3>
        <div className="grid gap-8 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title.pt}>
              <p className="font-wide font-bold">{t(group.title)}</p>
              <p className="mt-2 text-ink-muted">{group.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

// 5. Deploy: a chamada final.
export function DeploySection({ locale, d }: Props) {
  const t = tr(locale);
  const mailto = `mailto:${contacts.email}?subject=${encodeURIComponent(t(contacts.emailSubject))}`;
  return (
    <section id="deploy" aria-labelledby="deploy-title" className="relative scroll-mt-24 py-24 md:py-32">
      <StageNode index={5} />
      <div className="rounded-3xl border border-cobalt/40 bg-surface/80 p-8 backdrop-blur-sm md:p-14">
        <p data-print className="inline-flex items-center gap-2 rounded-md border border-valid/50 px-3 py-1 font-mono text-xs text-valid">
          <span aria-hidden className="size-1.5 rounded-full bg-valid" />
          {t(deployCopy.label)}
        </p>
        <h2
          id="deploy-title"
          data-split
          className="font-wide mt-6 max-w-[18ch] text-[length:var(--step-4)] leading-[1.02] font-extrabold tracking-tight"
        >
          {t(deployCopy.title)}
        </h2>
        <p data-deploy-item className="mt-6 max-w-[56ch] text-ink-muted">{t(deployCopy.body)}</p>
        <div data-deploy-item className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={mailto}
            className="inline-flex items-center gap-2 rounded-full bg-cobalt px-7 py-4 text-lg font-semibold text-cobalt-ink transition-transform hover:-translate-y-0.5"
          >
            <Mail className="size-5" aria-hidden />
            {t(deployCopy.talk)}
          </a>
          <a
            href={d.resume.file}
            download
            className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-7 py-4 text-lg font-semibold transition-colors hover:border-cobalt hover:text-cobalt"
          >
            <Download className="size-5" aria-hidden />
            {d.actions.downloadResume}
          </a>
        </div>
        <p data-deploy-item className="mt-10 text-sm text-ink-muted">
          {t(deployCopy.others)}{" "}
          <a className="text-ink underline underline-offset-4 hover:text-cobalt" href={contacts.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          ,{" "}
          <a className="text-ink underline underline-offset-4 hover:text-cobalt" href={contacts.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          {locale === "pt" ? "e" : "and"}{" "}
          <a className="text-ink underline underline-offset-4 hover:text-cobalt" href={contacts.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
        <p className="mt-2 font-mono text-sm text-ink-muted">{contacts.email}</p>
      </div>
    </section>
  );
}

export function Footer({ locale }: Props) {
  const t = tr(locale);
  return (
    <footer className="border-t border-grid">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-ink-muted md:pl-24">
        <p>© {new Date().getFullYear()} Iuran Freire · Manaus</p>
        <a href={contacts.siteSource} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
          {t(footerCopy.source)}
        </a>
      </div>
    </footer>
  );
}
