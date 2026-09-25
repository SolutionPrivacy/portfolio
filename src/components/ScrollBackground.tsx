import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { backgrounds } from "@/data/images";

/**
 * Zdjęcie w tle CAŁEJ strony.
 * Przy przewijaniu jedno zdjęcie przenika w kolejne, bardzo powoli.
 * Warstwa jest `fixed`, więc treść sunie po nieruchomym tle.
 */
export function ScrollBackground() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-wegiel" aria-hidden>
      {backgrounds.map((layer, index) => (
        <Layer
          key={layer.src}
          layer={layer}
          index={index}
          total={backgrounds.length}
          progress={scrollYProgress}
          reduce={!!reduce}
        />
      ))}

      {/* Przyciemnienie — bez tego tekst byłby nieczytelny. */}
      <div className="absolute inset-0 bg-wegiel/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-wegiel/95 via-wegiel/45 to-wegiel/90" />
    </div>
  );
}

type LayerProps = {
  layer: (typeof backgrounds)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
};

function Layer({ layer, index, total, progress, reduce }: LayerProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Każde zdjęcie ma swoje "okno" na osi przewijania i przenika na brzegach.
  const step = 1 / total;
  const start = index * step;

  // Wartości muszą być rosnące (monotonically non-decreasing).
  const fadeIn = Math.max(0, start - step * 0.4);
  const fadeOut = Math.min(1, start + step);
  const inputRange =
    index === 0
      ? [0, fadeOut * 0.6, fadeOut]
      : [fadeIn, start, Math.min(1, start + step * 0.7), fadeOut];
  const outputRange = index === 0 ? [1, 1, 0] : [0, 1, 1, 0];

  const opacity = useTransform(progress, inputRange, outputRange);
  const visibility = useTransform(opacity, (o) => (o < 0.01 ? "hidden" : "visible"));
  const scale = useTransform(
    progress,
    [start - step, start + step],
    reduce ? [1, 1] : [1.1, 1],
  );

  // Paralaksa: tło dryfuje wolniej niż treść (warstwa jest większa niż ekran).
  const y = useTransform(progress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  useEffect(() => {
    const img = new Image();
    img.src = layer.src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setFailed(true);
  }, [layer.src]);

  if (failed || !loaded) return null;

  return (
    <motion.div
      style={{
        opacity: reduce && index > 0 ? 0 : opacity,
        scale,
        y,
        visibility,
        willChange: "transform, opacity",
        backgroundImage: `url(${layer.src})`,
        backgroundPosition: layer.focus ?? "center",
      }}
      className="absolute -inset-y-[8%] inset-x-0 bg-cover bg-no-repeat"
    />
  );
}
