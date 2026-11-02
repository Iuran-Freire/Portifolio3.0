"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { stageIds } from "./stages";

export function Header({ locale, d }: { locale: Locale; d: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // O ícone segue o tema pelo CSS; assim não há estado para sincronizar.
  function toggleTheme() {
    const next = document.documentElement.dataset.theme !== "light";
    if (next) document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {}
  }

  const other: Locale = locale === "pt" ? "en" : "pt";

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-grid bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#source" className="font-wide text-lg font-extrabold tracking-tight">
          Iuran Freire
        </a>

        <nav aria-label={d.nav.label} className="hidden lg:block">
          <ol className="flex items-center gap-1 text-sm text-ink-muted">
            {stageIds.map((id, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="rounded-md px-3 py-2 transition-colors hover:text-ink"
                >
                  <span className="mr-1.5 font-mono text-xs text-cobalt">{i + 1}</span>
                  {d.nav[id]}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`/${other}`}
            hrefLang={other === "pt" ? "pt-BR" : "en"}
            className="rounded-md px-3 py-2 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            {d.language.switchTo}
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={d.theme.toggle}
            className="grid size-10 place-items-center rounded-md text-ink-muted transition-colors hover:text-ink"
          >
            <Sun className="size-4 light:hidden" aria-hidden />
            <Moon className="hidden size-4 light:block" aria-hidden />
          </button>
          <a
            href={d.resume.file}
            download
            className="hidden rounded-full border border-ink/30 px-4 py-2 text-sm font-medium transition-colors hover:border-cobalt hover:text-cobalt sm:inline-block"
          >
            {d.actions.downloadResume}
          </a>
        </div>
      </div>
    </header>
  );
}
