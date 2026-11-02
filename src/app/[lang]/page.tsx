import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";

// Página provisória: as seções do pipeline entram na tarefa 4.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);

  return (
    <main id="conteudo" className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="font-wide text-[length:var(--step-5)] leading-[1.02] font-extrabold tracking-tight">
        Iuran Freire
      </h1>
      <p className="mt-6 max-w-[60ch] text-ink-muted">{d.meta.description}</p>
      <p className="mt-6 font-mono text-cobalt">~90%</p>
    </main>
  );
}
