export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Escolhe o texto do idioma atual a partir de um par { pt, en }.
export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
