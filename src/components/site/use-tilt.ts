"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/*
  Inclinação 3D seguindo o mouse, com as variáveis --mx/--my para a luz interna.
  Só em telas com mouse e sem "reduzir movimento". Usado na vitrine e no contato.
*/
export function useTilt(strength = 7) {
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!enabled.current) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    gsap.to(el, {
      rotateY: (px - 0.5) * strength,
      rotateX: (0.5 - py) * strength,
      y: -6,
      transformPerspective: 1000,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (!enabled.current) return;
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
      overwrite: "auto",
    });
  };

  return { onPointerMove, onPointerLeave };
}

// Luz vermelha que segue o cursor dentro de um cartão (usa --mx/--my).
export const spotlightStyle: React.CSSProperties = {
  background:
    "radial-gradient(24rem circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--signal) 14%, transparent), transparent 60%)",
};
