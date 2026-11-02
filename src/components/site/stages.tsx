import type { ReactNode } from "react";

// As cinco etapas do pipeline, na ordem em que o recrutador as percorre.
export const stageIds = ["source", "ingestion", "processing", "analysis", "deploy"] as const;

export type StageId = (typeof stageIds)[number];

// Marcador da etapa sobre o trilho do pipeline (coluna à esquerda).
export function StageNode({ index, className = "top-24 md:top-32" }: { index: number; className?: string }) {
  return (
    <span
      aria-hidden
      data-stage-node
      className={`absolute -left-[3.25rem] hidden ${className} size-7 place-items-center rounded-full border border-cobalt bg-paper font-mono text-xs text-cobalt md:grid`}
    >
      {index}
    </span>
  );
}

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
      <StageNode index={index} />
      <p className="mb-4 text-sm text-cobalt">
        <span className="font-mono">{index}</span>
        <span className="mx-2 text-ink-muted">/</span>
        {name}
      </p>
      <h2
        id={`${id}-title`}
        data-split
        className="font-wide max-w-[22ch] text-[length:var(--step-3)] leading-[1.05] font-bold tracking-tight md:text-[length:var(--step-4)]"
      >
        {title}
      </h2>
      {intro && <p data-fade className="mt-6 max-w-[62ch] text-ink-muted">{intro}</p>}
      <div className="mt-14">{children}</div>
    </section>
  );
}
