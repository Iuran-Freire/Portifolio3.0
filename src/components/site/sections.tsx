import type React from "react";
import Image from "next/image";
import { Download, Mail, MessageCircle } from "lucide-react";
import { pick, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { contacts, timeline } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { contactCopy, deployCopy, footerCopy, journeyCopy, projectsCopy, sourceCopy } from "@/content/copy";
import { ProjectGallery } from "./project-gallery";
import { ContactChannels } from "./contact-channels";
import { Stage } from "./stages";

type Props = { locale: Locale; d: Dictionary };

const photoAlt = { pt: "Foto de Iuran Freire", en: "Photo of Iuran Freire" };

const tr = (locale: Locale) => <T,>(v: { pt: T; en: T }) => pick(v, locale);

// 01. Início: quem é o Iuran e o que ele procura.
export function HomeSection({ locale, d }: Props) {
  const t = tr(locale);
  return (
    <section id="home" aria-labelledby="home-title" className="relative scroll-mt-24 pt-12 pb-24 md:pt-20 md:pb-32">
      <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
      <div>
      {/* No celular, um retrato pequeno abre a página */}
      <Image
        src="/iuran-freire-sm.webp"
        alt={t(photoAlt)}
        width={240}
        height={300}
        priority
        data-intro-item
        className="mb-8 size-20 rounded-full object-cover object-top ring-2 ring-signal/60 lg:hidden"
      />
      <h1
        id="home-title"
        data-intro-title
        className="font-display max-w-[16ch] text-[clamp(3rem,6vw,6.25rem)] leading-[0.95]"
      >
        {t(sourceCopy.title)}{" "}
        <span className="text-signal">{t(sourceCopy.titleAccent)}</span>
      </h1>
      <p
        data-intro-lead
        className="mt-8 max-w-[62ch] text-[length:var(--step-1)] leading-relaxed text-ink-muted"
      >
        {t(sourceCopy.lead)}
      </p>
      <p
        data-intro-item
        className="mt-4 max-w-[62ch] text-[length:var(--step-1)] font-medium"
      >
        {t(sourceCopy.seeking)}
      </p>

      <div
        data-intro-item
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <a
          href="#projects"
          data-magnetic
              className="rounded-full bg-signal px-6 py-3 font-semibold text-signal-ink transition-transform hover:-translate-y-0.5"
        >
          {d.actions.seeProjects}
        </a>
        <a
          href={d.resume.file}
          download
          data-magnetic
              className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-6 py-3 font-semibold transition-colors hover:border-signal hover:text-signal"
        >
          <Download className="size-4" aria-hidden />
          {d.actions.downloadResume}
        </a>
      </div>
      </div>

      {/* No desktop, o retrato se funde ao fundo com um brilho vermelho atrás */}
      <figure data-intro-photo className="relative hidden lg:block">
        <div aria-hidden className="absolute inset-x-[10%] top-[18%] bottom-[8%] rounded-full bg-signal/25 blur-3xl" />
        <Image
          src="/iuran-freire.webp"
          alt={t(photoAlt)}
          width={900}
          height={1125}
          priority
          sizes="(min-width: 1024px) 30vw, 0px"
          className="relative w-full [mask-image:linear-gradient(to_bottom,black_78%,transparent)] grayscale-[15%] contrast-[1.05]"
        />
      </figure>
      </div>
    </section>
  );
}

// 02. Projetos: os oito, no mesmo formato, empilhando ao rolar.
export function ProjectsSection({ locale, d }: Props) {
  const t = tr(locale);
  return (
    <Stage id="projects" index={2} name={d.nav.projects} title={t(projectsCopy.title)} intro={t(projectsCopy.intro)}>
      <ProjectGallery projects={projects} locale={locale} d={d} />
    </Stage>
  );
}

// 03. Trajetória: de onde veio e com o que trabalha.
export function JourneySection({ locale, d }: Props) {
  const t = tr(locale);
  return (
    <Stage id="journey" index={3} name={d.nav.journey} title={t(journeyCopy.title)} intro={t(journeyCopy.intro)}>
      <ol className="relative max-w-3xl">
        <span aria-hidden className="absolute top-2 bottom-2 left-[0.3125rem] w-px bg-grid" />
        {timeline.map((item, i) => (
          <li key={item.period.pt} data-fade className="relative pb-10 pl-10 last:pb-0">
            <span
              aria-hidden
              className={`absolute top-1.5 left-0 size-[0.6875rem] rounded-full border-2 ${
                i === timeline.length - 1 ? "border-signal bg-signal" : "border-signal bg-paper"
              }`}
            />
            <p className="label-mono text-signal">{t(item.period)}</p>
            <h3 className="font-display mt-2 text-[length:var(--step-2)] leading-tight">{t(item.title)}</h3>
            <p className="mt-2 max-w-[60ch] text-ink-muted">{t(item.text)}</p>
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
        {/* Acesso rápido: as três ações mais comuns de um recrutador */}
        <div data-deploy-item className="mt-10">
          <h3 className="label-mono mb-4 text-ink-muted">{t(contactCopy.quickTitle)}</h3>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={mailto}
              data-magnetic
              className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 font-semibold text-signal-ink transition-transform hover:-translate-y-0.5"
            >
              <Mail className="size-5" aria-hidden />
              {t(deployCopy.talk)}
            </a>
            <a
              href={contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-6 py-3.5 font-semibold transition-colors hover:border-signal hover:text-signal"
            >
              <MessageCircle className="size-5" aria-hidden />
              {t(contactCopy.whatsappButton)}
            </a>
            <a
              href={d.resume.file}
              download
              data-magnetic
              className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-6 py-3.5 font-semibold transition-colors hover:border-signal hover:text-signal"
            >
              <Download className="size-5" aria-hidden />
              {d.actions.downloadResume}
            </a>
          </div>
        </div>

        {/* Os quatro canais, cada um no seu cartão */}
        <div className="mt-12">
          <h3 data-deploy-item className="label-mono mb-4 text-ink-muted">{t(contactCopy.channelsTitle)}</h3>
          <ContactChannels locale={locale} />
        </div>
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
