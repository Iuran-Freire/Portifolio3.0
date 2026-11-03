import type React from "react";
import { ChartColumn, Database, FileSpreadsheet, Filter, Sigma, type LucideIcon } from "lucide-react";
import {
  siCloudflareworkers,
  siExpress,
  siJavascript,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siTypescript,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";
import { pick, type Locale } from "@/i18n/config";
import { skillGroups } from "@/content/skills";

/*
  As ferramentas como cartões com logo, separados por frente.
  Os cartões entram em sequência ao rolar (motion.tsx, [data-tools]) e, ao
  passar o mouse, sobem um pouco, a borda ganha a cor da marca e o logo gira.
  Power BI, Excel, DAX, Power Query e SQL não têm logo livre no simple-icons
  (marcas da Microsoft ou linguagens sem marca): usam ícones genéricos.
*/

type Tool = { icon: SimpleIcon | LucideIcon; color: string };

const tools: Record<string, Tool> = {
  "Power BI": { icon: ChartColumn, color: "#F2C811" },
  DAX: { icon: Sigma, color: "#F2C811" },
  "Power Query": { icon: Filter, color: "#F2C811" },
  SQL: { icon: Database, color: "#4F9FE0" },
  Excel: { icon: FileSpreadsheet, color: "#33A867" },
  TypeScript: { icon: siTypescript, color: `#${siTypescript.hex}` },
  JavaScript: { icon: siJavascript, color: `#${siJavascript.hex}` },
  React: { icon: siReact, color: `#${siReact.hex}` },
  "Vue 3": { icon: siVuedotjs, color: `#${siVuedotjs.hex}` },
  "Node.js": { icon: siNodedotjs, color: `#${siNodedotjs.hex}` },
  // Marca preta some no fundo escuro: usa a cor do texto.
  Express: { icon: siExpress, color: "var(--ink)" },
  Python: { icon: siPython, color: `#${siPython.hex}` },
  PostgreSQL: { icon: siPostgresql, color: `#${siPostgresql.hex}` },
  "Cloudflare Workers": { icon: siCloudflareworkers, color: `#${siCloudflareworkers.hex}` },
};

function ToolIcon({ icon }: { icon: Tool["icon"] }) {
  if ("path" in icon) {
    return (
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
        <path d={icon.path} />
      </svg>
    );
  }
  const Icon = icon;
  return <Icon className="size-6" aria-hidden />;
}

export function ToolGrid({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,9fr)]">
      {skillGroups.map((group) => (
        <div key={group.title.pt}>
          <p className="flex items-baseline justify-between gap-4 border-b border-grid pb-3">
            <span className="font-display text-[length:var(--step-2)]">{pick(group.title, locale)}</span>
            <span className="label-mono text-ink-muted">{String(group.items.length).padStart(2, "0")}</span>
          </p>
          <ul data-tools className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-3">
            {group.items.map((name) => {
              const tool = tools[name];
              return (
                <li
                  key={name}
                  data-tool
                  className="tool-card relative flex flex-col items-start gap-5 overflow-hidden rounded-2xl border border-grid bg-surface/70 p-4"
                  style={{ "--brand": tool?.color ?? "var(--signal)" } as React.CSSProperties}
                >
                  {tool && (
                    <span className="tool-icon grid size-11 place-items-center rounded-xl">
                      <ToolIcon icon={tool.icon} />
                    </span>
                  )}
                  <span className="text-sm font-medium text-ink">{name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
