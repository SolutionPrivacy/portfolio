import { useEffect } from "react";

const SELECTOR = "a[href], button:not(:disabled), [role='button']";

type Glow = {
  el: HTMLElement;
  /** Bieżąca i docelowa intensywność (0–1) podświetlenia całego elementu. */
  gi: number;
  tgi: number;
  /** Bieżąca i docelowa pozycja jasnego punktu (px, względem elementu). */
  x: number;
  y: number;
  tx: number;
  ty: number;
};

/**
 * Podświetlenie linków i przycisków.
 *
 * Najechany element rozjaśnia się cały (płynnie), a pod kursorem jest
 * dodatkowo jaśniejszy punkt, który gładko za nim podąża — w kolejnych
 * rogach, gdy kursor jeździ po elemencie. To tylko tło elementu
 * (zmienne CSS --gx, --gy, --gi + atrybut data-glow, patrz index.css),
 * więc treść nigdy nie jest zasłaniana.
 *
 * Pętla rAF działa tylko wtedy, gdy coś się animuje. Tylko dla myszy.
 */
export function useCursorGlow() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const glows = new WeakMap<HTMLElement, Glow>();
    const running = new Set<Glow>();
    let current: Glow | null = null;
    let raf = 0;

    const frame = () => {
      for (const g of running) {
        g.x += (g.tx - g.x) * 0.22;
        g.y += (g.ty - g.y) * 0.22;
        g.gi += (g.tgi - g.gi) * 0.13;

        if (g.tgi === 0 && g.gi < 0.01) {
          g.el.removeAttribute("data-glow");
          g.el.style.removeProperty("--gx");
          g.el.style.removeProperty("--gy");
          g.el.style.removeProperty("--gi");
          running.delete(g);
          continue;
        }
        g.el.style.setProperty("--gx", `${g.x.toFixed(1)}px`);
        g.el.style.setProperty("--gy", `${g.y.toFixed(1)}px`);
        g.el.style.setProperty("--gi", g.gi.toFixed(3));
      }
      raf = running.size ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(SELECTOR) ?? null;
      const valid = el && !el.hasAttribute("data-no-glow") ? el : null;

      if (current && current.el !== valid) {
        current.tgi = 0;
        current = null;
      }
      if (!valid) return;

      const r = valid.getBoundingClientRect();
      let g = glows.get(valid);
      if (!g) {
        g = { el: valid, gi: 0, tgi: 1, x: 0, y: 0, tx: 0, ty: 0 };
        glows.set(valid, g);
      }
      g.tx = e.clientX - r.left;
      g.ty = e.clientY - r.top;
      if (g.gi < 0.01) {
        g.x = g.tx;
        g.y = g.ty;
        valid.setAttribute("data-glow", "");
      }
      g.tgi = 1;
      current = g;
      running.add(g);
      kick();
    };
    const hide = () => {
      if (current) current.tgi = 0;
      current = null;
      kick();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onMove, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onMove);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      for (const g of running) g.el.removeAttribute("data-glow");
    };
  }, []);
}
