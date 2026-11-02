import type Lenis from "lenis";

// Instância da rolagem suave, para pausar enquanto um painel está aberto.
export const lenisStore: { current: Lenis | null } = { current: null };
