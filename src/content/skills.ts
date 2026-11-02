import type { Localized } from "@/i18n/config";

// Stack agrupada pelas duas frentes. Sem barras de porcentagem.
export const skillGroups: { title: Localized; items: string[] }[] = [
  {
    title: { pt: "Dados", en: "Data" },
    items: ["Power BI", "DAX", "Power Query", "SQL", "Excel"],
  },
  {
    title: { pt: "Desenvolvimento", en: "Development" },
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Vue 3",
      "Node.js",
      "Express",
      "Python",
      "PostgreSQL",
      "Cloudflare Workers",
    ],
  },
];
