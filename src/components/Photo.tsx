import { useState } from "react";
import { motion } from "motion/react";
import { silk } from "./Reveal";

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  /** Klasy dla samego <img> — np. skala przy hoverze rodzica. */
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Zdjęcie, które:
 * — pojawia się miękko po wczytaniu (bez przeskoku layoutu),
 * — przy błędzie sieci pokazuje ciemną teksturę zamiast pustej ramki.
 */
export function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  priority = false,
  sizes,
}: PhotoProps) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  return (
    <div className={`relative overflow-hidden bg-ziemia ${className}`}>
      {state !== "error" && (
        <motion.img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={
            state === "ready" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }
          }
          transition={{ duration: 1.4, ease: silk }}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}

      {state === "error" && (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ziemia via-ziemia to-wegiel"
        >
          <span className="font-display text-3xl font-light tracking-wide2 text-zloto/40">
            Bona
          </span>
        </div>
      )}
    </div>
  );
}
