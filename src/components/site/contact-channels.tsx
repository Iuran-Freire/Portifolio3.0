"use client";

import type React from "react";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { pick, type Locale, type Localized } from "@/i18n/config";
import { contacts } from "@/content/profile";
import { contactCopy } from "@/content/copy";
import { spotlightStyle, useTilt } from "./use-tilt";

// Ícones de marca desenhados à mão (a biblioteca de ícones não traz logos).
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="currentColor">
      <path d="M20.4 20.5h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.2 2.4 4.2 5.4v6.4ZM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1ZM7.1 20.5H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}

type Channel = {
  id: string;
  icon: React.ReactNode;
  name: Localized;
  value: string;
  note: Localized;
  action: Localized;
  href: string;
  external: boolean;
  copy?: string;
};

export function ContactChannels({ locale }: { locale: Locale }) {
  const t = <T,>(v: { pt: T; en: T }) => pick(v, locale);
  const [copied, setCopied] = useState<string | null>(null);
  const tilt = useTilt(6);
  const mailto = `mailto:${contacts.email}?subject=${encodeURIComponent(t(contacts.emailSubject))}`;

  const channels: Channel[] = [
    {
      id: "whatsapp",
      icon: <WhatsAppIcon />,
      name: { pt: "WhatsApp", en: "WhatsApp" },
      value: contacts.phoneDisplay,
      note: contactCopy.notes.whatsapp,
      action: contactCopy.actions.whatsapp,
      href: contacts.whatsapp,
      external: true,
    },
    {
      id: "email",
      icon: <Mail className="size-5" aria-hidden />,
      name: { pt: "E-mail", en: "Email" },
      value: contacts.email,
      note: contactCopy.notes.email,
      action: contactCopy.actions.email,
      href: mailto,
      external: false,
      copy: contacts.email,
    },
    {
      id: "linkedin",
      icon: <LinkedInIcon />,
      name: { pt: "LinkedIn", en: "LinkedIn" },
      value: "in/iuran-freire",
      note: contactCopy.notes.linkedin,
      action: contactCopy.actions.linkedin,
      href: contacts.linkedin,
      external: true,
    },
    {
      id: "github",
      icon: <GitHubIcon />,
      name: { pt: "GitHub", en: "GitHub" },
      value: "github.com/Iuran-Freire",
      note: contactCopy.notes.github,
      action: contactCopy.actions.github,
      href: contacts.github,
      external: true,
    },
  ];

  async function copy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {channels.map((c) => (
        <li
          key={c.id}
          data-contact-card
          {...tilt}
          className="group relative flex flex-col gap-4 rounded-2xl border border-grid bg-paper/60 p-5 transition-colors [transform-style:preserve-3d] hover:border-signal/60 md:p-6"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={spotlightStyle}
          />
          <div className="relative flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-signal/12 text-signal ring-1 ring-signal/30 transition-[transform,background-color,color] duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-12 group-hover:scale-110 group-hover:bg-signal group-hover:text-signal-ink">
              {c.icon}
            </span>
            <div className="min-w-0">
              <p className="label-mono text-ink-muted">{t(c.name)}</p>
              <p className="truncate font-medium">{c.value}</p>
            </div>
          </div>
          <p className="relative text-sm text-ink-muted">{t(c.note)}</p>
          <div className="relative mt-auto flex flex-wrap items-center gap-2">
            <a
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group/link inline-flex items-center gap-2 rounded-full border border-signal/60 px-4 py-2 text-sm font-semibold text-signal transition-colors hover:bg-signal hover:text-signal-ink"
            >
              {t(c.action)}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                aria-hidden
              />
            </a>
            {c.copy && (
              <button
                type="button"
                onClick={() => copy(c.id, c.copy!)}
                className="inline-flex items-center gap-2 rounded-full border border-grid px-4 py-2 text-sm text-ink-muted transition-colors hover:border-ink/40 hover:text-ink"
              >
                {copied === c.id ? <Check className="size-4 text-valid" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                <span aria-live="polite">{copied === c.id ? t(contactCopy.copied) : t(contactCopy.copy)}</span>
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
