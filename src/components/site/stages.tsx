import type { ReactNode } from "react";

// As cinco etapas do pipeline, na ordem em que o recrutador as percorre.
export const stageIds = ["source", "ingestion", "processing", "analysis", "deploy"] as const;

export type StageId = (typeof stageIds)[number];

export function Stage({
  id,
  index,
  name,
  title,
  intro,
  children,
}: {
  id: StageId;
  index: number;
  name: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative scroll-mt-24 py-24 md:py-32">
      <p className="label-mono mb-5 flex items-center gap-3 text-ink-muted">
        <span className="text-signal">{String(index).padStart(2, "0")}</span>
        <span aria-hidden className="h-px w-10 bg-grid" />
        {name}
      </p>
      <h2
        id={`${id}-title`}
        data-split
        className="font-display max-w-[22ch] text-[length:var(--step-4)] leading-[0.98] md:text-[length:var(--step-5)]"
      >
        {title}
      </h2>
      {intro && <p data-fade className="mt-6 max-w-[62ch] text-ink-muted">{intro}</p>}
      <div className="mt-14">{children}</div>
    </section>
  );
}
