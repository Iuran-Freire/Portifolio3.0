// Roda antes da primeira pintura: decide se a abertura vai acontecer,
// para os elementos do topo já nascerem escondidos (sem piscar).
// Fica fora do componente Intro porque o layout (servidor) precisa do texto.
export const introScript = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){var c=document.documentElement.classList;c.add("intro-pending");if(sessionStorage.getItem("intro-seen"))c.add("intro-seen")}}catch(e){}`;
