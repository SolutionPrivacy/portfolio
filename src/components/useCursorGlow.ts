import { useEffect } from "react";

const SELECTOR = "a[href], button:not(:disabled)";
const SIZE = 150;

/**
 * Biała poświata podążająca za kursorem, gdy jest nad linkiem lub przyciskiem.
 * Jedna wspólna warstwa `fixed` (nie przycinana przez element), sterowana
 * bezpośrednio z DOM — bez rerenderów Reacta. Tylko dla myszy.
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
      transition: "opacity 300ms ease",
      background:
        "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.16) 40%, rgba(255,255,255,0) 70%)",
      willChange: "transform, opacity",
    });
    document.body.appendChild(glow);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest(SELECTOR);
      const active = !!el && !el.hasAttribute("data-no-glow");
      glow.style.opacity = active ? "1" : "0";
      if (active) {
        glow.style.transform = `translate(${e.clientX - SIZE / 2}px, ${e.clientY - SIZE / 2}px)`;
      }
    };
    const hide = () => {
      glow.style.opacity = "0";
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onMove, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onMove);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      glow.remove();
    };
  }, []);
}
