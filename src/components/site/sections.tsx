import type React from "react";
import { Download, Mail } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { contacts, timeline } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { deployCopy, footerCopy, journeyCopy, projectsCopy, sourceCopy } from "@/content/copy";
import { ProjectCard } from "./project-case";
import { Stage } from "./stages";

type Props = { locale: Locale; d: Dictionary };

const tr = (locale: Locale) => <T,>(v: { pt: T; en: T }) => pick(v, locale);

// 01. Início: quem é o Iuran e o que ele procura.
export function HomeSection({ locale, d }: Props) {
  const t = tr(locale);
  return (
    <section id="home" aria-labelledby="home-title" className="relative scroll-mt-24 pt-16 pb-24 md:pt-28 md:pb-32">
      <h1
        id="home-title"
        data-reveal
        className="font-display max-w-[16ch] text-[clamp(3rem,7.4vw,7rem)] leading-[0.95]"
      >
        {t(sourceCopy.title)}{" "}
        <span className="text-signal">{t(sourceCopy.titleAccent)}</span>
      </h1>
      <p
        data-reveal
        style={{ "--reveal-order": 1 } as React.CSSProperties}
        className="mt-8 max-w-[62ch] text-[length:var(--step-1)] leading-relaxed text-ink-muted"
      >
        {t(sourceCopy.lead)}
      </p>
      <p
        data-reveal
        style={{ "--reveal-order": 2 } as React.CSSProperties}
        className="mt-4 max-w-[62ch] text-[length:var(--step-1)] font-medium"
      >
        {t(sourceCopy.seeking)}
      </p>

      <div
        data-reveal
        style={{ "--reveal-order": 3 } as React.CSSProperties}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <a
          href="#projects"
          className="rounded-full bg-signal px-6 py-3 font-semibold text-signal-ink transition-transform hover:-translate-y-0.5"
        >
          {d.actions.seeProjects}
        </a>
        <a
          href={d.resume.file}
          download
          className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-6 py-3 font-semibold transition-colors hover:border-signal hover:text-signal"
        >
          <Download className="size-4" aria-hidden />
          {d.actions.downloadResume}
        </a>
      </div>
    </section>
  );
}

// 02. Projetos: os oito, no mesmo formato, empilhando ao rolar.
export function ProjectsSection({ locale, d }: Props) {
  const t = tr(locale);
  return (
    <Stage id="projects" index={2} name={d.nav.projects} title={t(projectsCopy.title)} intro={t(projectsCopy.intro)}>
      <div data-stack-group className="space-y-10">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i + 1}
            total={projects.length}
            locale={locale}
            d={d}
          />
        ))}
      </div>
    </Stage>
  );
}

// 03. Trajetória: de onde veio e com o que trabalha.
export function JourneySection({ locale, d }: Props) {
  const t = tr(locale);
  return (
    <Stage id="journey" index={3} name={d.nav.journey} title={t(journeyCopy.title)} intro={t(journeyCopy.intro)}>
      <ol className="grid max-w-4xl gap-x-12 gap-y-8 sm:grid-cols-2">
        {timeline.map((item) => (
          <li key={item.period.pt} data-fade className="border-l border-grid pl-5">
            <p className="label-mono text-signal">{t(item.period)}</p>
            <p className="mt-2">{t(item.text)}</p>
          </li>
        ))}
      </ol>

      <div data-fade className="mt-20">
        <h3 className="label-mono mb-6 text-ink-muted">{t(journeyCopy.toolsTitle)}</h3>
        <div className="grid gap-8 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title.pt}>
              <p className="font-display text-[length:var(--step-2)]">{t(group.title)}</p>
              <p className="mt-2 text-ink-muted">{group.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

// 04. Contato: a chamada final.
export function ContactSection({ locale, d }: Props) {
  const t = tr(locale);
  const mailto = `mailto:${contacts.email}?subject=${encodeURIComponent(t(contacts.emailSubject))}`;
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="rounded-3xl border border-signal/40 bg-surface/80 p-8 backdrop-blur-sm md:p-14">
        <p
          data-print
          className="label-mono inline-flex items-center gap-2 rounded-md border border-signal/60 px-3 py-1.5 text-signal"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-signal" />
          {t(deployCopy.label)}
        </p>
        <h2
          id="contact-title"
          data-split
          className="font-display mt-6 max-w-[18ch] text-[length:var(--step-4)] leading-[1.02] tracking-tight"
        >
          {t(deployCopy.title)}
        </h2>
        <p data-deploy-item className="mt-6 max-w-[56ch] text-ink-muted">
          {t(deployCopy.body)}
        </p>
        <div data-deploy-item className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={mailto}
            className="inline-flex items-center gap-2 rounded-full bg-signal px-7 py-4 text-lg font-semibold text-signal-ink transition-transform hover:-translate-y-0.5"
          >
            <Mail className="size-5" aria-hidden />
            {t(deployCopy.talk)}
          </a>
          <a
            href={d.resume.file}
            download
            className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-7 py-4 text-lg font-semibold transition-colors hover:border-signal hover:text-signal"
          >
            <Download className="size-5" aria-hidden />
            {d.actions.downloadResume}
          </a>
        </div>
        <p data-deploy-item className="mt-10 text-sm text-ink-muted">
          {t(deployCopy.others)}{" "}
          <a className="text-ink underline underline-offset-4 hover:text-signal" href={contacts.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          ,{" "}
          <a className="text-ink underline underline-offset-4 hover:text-signal" href={contacts.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          {locale === "pt" ? "e" : "and"}{" "}
          <a className="text-ink underline underline-offset-4 hover:text-signal" href={contacts.whatsapp} target="_blank" rel="noopener noreferrer">
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
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-ink-muted md:px-10">
        <p>© {new Date().getFullYear()} Iuran Freire · Manaus</p>
        <a href={contacts.siteSource} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
          {t(footerCopy.source)}
        </a>
      </div>
    </footer>
  );
}
