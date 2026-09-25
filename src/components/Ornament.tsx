import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const silk = [0.16, 1, 0.3, 1] as const;

/**
 * Złota ozdobna przekładka (dzielnik sekcji).
 *
 * Rysuje się od środka na boki, gdy wejdzie w ekran: najpierw środek
 * z rombem i zawijasami, potem cienkie linie zbiegające się do punktu.
 * Lewa strona jest odbiciem prawej (<use>), więc kształt jest idealnie symetryczny.
 */
export function Ornament({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Obserwujemy kontener (nie <g>): element przycięty clip-path'em nigdy nie "wchodzi" w ekran.
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div ref={ref} className={`flex justify-center px-6 ${className}`} aria-hidden>
      <svg viewBox="0 0 640 90" className="h-auto w-full max-w-[640px] overflow-visible">
        <defs>
          <linearGradient id="ornGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8A5B0E" stopOpacity="0" />
            <stop offset="18%" stopColor="#C9901F" />
            <stop offset="55%" stopColor="#F3D27A" />
            <stop offset="100%" stopColor="#D9A441" />
          </linearGradient>
          <linearGradient id="ornGoldV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDECA8" />
            <stop offset="55%" stopColor="#E0AE45" />
            <stop offset="100%" stopColor="#9A6A12" />
          </linearGradient>
          <filter id="ornGlow" x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Prawa połowa: cienka linia zbiegająca się w szpic, kulka i zawijas. */}
          <g id="ornHalf">
            <path
              d="M336,50 C372,58 410,60 446,52 C486,43 528,36 634,45 C540,50 492,56 448,62 C408,68 366,66 336,56 Z"
              fill="url(#ornGold)"
            />
            <circle cx="484" cy="47" r="4.6" fill="url(#ornGoldV)" />
            <path
              d="M337,54 C352,54 360,44 354,35 C348,27 336,30 338,38 C339,43 346,44 347,39"
              fill="none"
              stroke="url(#ornGoldV)"
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            <path
              d="M340,60 C356,66 372,64 382,58"
              fill="none"
              stroke="url(#ornGoldV)"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>
        </defs>

        <motion.g
          filter="url(#ornGlow)"
          initial={reduce ? false : { clipPath: "inset(0 50% 0 50%)", opacity: 0 }}
          animate={
            reduce || inView
              ? { clipPath: "inset(0 0% 0 0%)", opacity: 1 }
              : { clipPath: "inset(0 50% 0 50%)", opacity: 0 }
          }
          transition={{ duration: 1.8, ease: silk }}
        >
          <use href="#ornHalf" />
          <g transform="translate(640,0) scale(-1,1)">
            <use href="#ornHalf" />
          </g>

          {/* Środek: romb i listek nad zawijasami */}
          <path d="M320,10 L329,26 L320,44 L311,26 Z" fill="url(#ornGoldV)" />
          <path d="M320,16 L325,26 L320,37 L315,26 Z" fill="#FFF3C2" opacity="0.75" />
          <path
            d="M296,52 C302,42 312,44 320,54 C328,44 338,42 344,52 C336,50 326,56 320,66 C314,56 304,50 296,52 Z"
            fill="url(#ornGoldV)"
          />
          <circle cx="320" cy="72" r="2.6" fill="#F3D27A" />
        </motion.g>
      </svg>
    </div>
  );
}
