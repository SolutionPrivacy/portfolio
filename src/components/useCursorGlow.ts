import { useEffect } from "react";

const SELECTOR = "a[href], button:not(:disabled), [role='button']";
const SIZE = 240;

/**
 * Biała poświata podążająca za kursorem, gdy jest nad linkiem lub przyciskiem.
 * Jedna wspólna warstwa `fixed` (nie przycinana przez element), płynnie
 * doganiająca kursor i wyskakująca z lekkim powiększeniem.
 * Sterowana bezpośrednio z DOM — bez rerenderów Reacta. Tylko dla myszy.
 */
export function useCursorGlow() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const glow = document.createElement("div");
    glow.setAttribute("aria-hidden", "true");
    Object.assign(glow.style, {
      position: "fixed",
      left: "0",
      top: "0",
      width: `${SIZE}px`,
      height: `${SIZE}px`,
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "9999",
      opacity: "0",
      transition: "opacity 350ms ease",
      background:
        "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.28) 30%, rgba(255,255,255,0.08) 55%, rgba(255,255,255,0) 70%)",
      willChange: "transform, opacity",
    });
    document.body.appendChild(glow);

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let scale = 0.5;
    let visible = false;
    let raf = 0;

    const frame = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      scale += ((visible ? 1 : 0.5) - scale) * 0.14;
      glow.style.transform = `translate(${x - SIZE / 2}px, ${y - SIZE / 2}px) scale(${scale})`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest(SELECTOR);
      const active = !!el && !el.hasAttribute("data-no-glow");
      tx = e.clientX;
      ty = e.clientY;
      if (active && !visible) {
        x = tx;
        y = ty;
      }
      visible = active;
      glow.style.opacity = active ? "1" : "0";
    };
    const hide = () => {
      visible = false;
      glow.style.opacity = "0";
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
      glow.remove();
    };
  }, []);
}
