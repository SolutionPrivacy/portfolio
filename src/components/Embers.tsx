import { useEffect, useRef } from "react";

type Ember = {
  x0: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  freq: number;
  phase: number;
  age: number;
  life: number;
};

/**
 * Iskry unoszące się znad pieca — canvas na całą sekcję.
 *
 * Oszczędny w użyciu: jeden sprite rysowany `drawImage`, DPR ograniczony do 1.5,
 * mniej cząsteczek na telefonie, pętla stoi, gdy sekcja jest poza ekranem albo
 * karta w tle, a przy `prefers-reduced-motion` nie startuje wcale.
 */
export function Embers({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Jeden gotowy "żarzący się punkt" — potem tylko skalujemy i przezroczystość.
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const sctx = sprite.getContext("2d");
    if (!sctx) return;
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,236,190,1)");
    grad.addColorStop(0.18, "rgba(255,168,64,0.95)");
    grad.addColorStop(0.5, "rgba(214,84,22,0.35)");
    grad.addColorStop(1, "rgba(200,60,10,0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 64, 64);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let onScreen = true;
    let embers: Ember[] = [];

    const make = (initial: boolean): Ember => ({
      x0: Math.random() * w,
      y: initial ? Math.random() * h : h + 20,
      size: 5 + Math.random() * 13,
      speed: 16 + Math.random() * 40,
      sway: 8 + Math.random() * 26,
      freq: 0.35 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      age: initial ? Math.random() * 6 : 0,
      life: 6 + Math.random() * 7,
    });

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 640 ? 20 : 42;
      embers = Array.from({ length: count }, () => make(true));
    };

    const frame = (t: number) => {
      raf = 0;
      if (!onScreen || document.hidden) return;
      const dt = Math.min((t - (last || t)) / 1000, 0.05);
      last = t;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.age += dt;
        e.y -= e.speed * dt;
        if (e.age > e.life || e.y < -20) {
          embers[i] = make(false);
          continue;
        }
        const x = e.x0 + Math.sin(e.age * e.freq + e.phase) * e.sway;
        const p = e.age / e.life;
        // Wolne pojawienie się i zgaśnięcie + delikatne migotanie.
        const alpha =
          Math.min(1, e.age / 0.8) * (1 - p) * (0.75 + 0.25 * Math.sin(e.age * 9 + e.phase));
        ctx.globalAlpha = Math.max(0, alpha) * 0.85;
        const s = e.size * (1 - p * 0.4);
        ctx.drawImage(sprite, x - s / 2, e.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf && onScreen && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    start();

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
