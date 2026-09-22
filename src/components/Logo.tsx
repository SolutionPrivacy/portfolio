import { motion, type MotionValue } from "motion/react";

/**
 * Logo Bony przerysowane od zera.
 *
 * Oryginał to skan starej wywieszki — niska rozdzielczość, postrzępione
 * krawędzie. Tutaj korona jest narysowana jako wektor, a napis złożony
 * prawdziwym krojem, więc logo jest ostre na każdym ekranie.
 *
 * Głębia bierze się z warstw: cień pod spodem, jasna faza przesunięta
 * o kilka pikseli w górę, lico z gradientem i przesuwający się refleks.
 * Zachowane zostały kolory oryginału — złota korona, czerwone litery —
 * tylko ocieplone pod paletę strony.
 */

type LogoProps = {
  className?: string;
  opacity?: MotionValue<number>;
  scale?: MotionValue<number>;
  y?: MotionValue<number>;
  /** Wyłącza przesuwający się refleks (np. w nagłówku). */
  still?: boolean;
};

export function Logo({ className, opacity, scale, y, still }: LogoProps) {
  return (
    <motion.svg
      viewBox="0 0 520 330"
      className={className}
      style={{ opacity, scale, y }}
      role="img"
      aria-label="Bona"
    >
      <defs>
        <linearGradient id="bonaGoldFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDECA8" />
          <stop offset="34%" stopColor="#EFC24C" />
          <stop offset="72%" stopColor="#C9901F" />
          <stop offset="100%" stopColor="#8A5B0E" />
        </linearGradient>

        <linearGradient id="bonaGoldEdge" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#FFF8D8" />
          <stop offset="55%" stopColor="#E3B152" />
          <stop offset="100%" stopColor="#6B4507" />
        </linearGradient>

        <linearGradient id="bonaRedFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EE3B2C" />
          <stop offset="50%" stopColor="#CC1A1C" />
          <stop offset="100%" stopColor="#870B11" />
        </linearGradient>

        <linearGradient id="bonaSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="48%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <filter id="bonaDrop" x="-35%" y="-35%" width="170%" height="180%">
          <feDropShadow dx="0" dy="7" stdDeviation="10" floodColor="#000" floodOpacity="0.6" />
        </filter>

        <filter id="bonaGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      {/* Ciepła łuna — światło pieca za logo */}
      <ellipse cx="260" cy="170" rx="215" ry="125" fill="#C8531B" opacity="0.2" filter="url(#bonaGlow)" />

      <g filter="url(#bonaDrop)">
        {/* --- KORONA --- */}
        <path d={CROWN} transform="translate(0,8)" fill="#000" opacity="0.45" />
        <path d={CROWN} transform="translate(-3.5,-4)" fill="url(#bonaGoldEdge)" />
        <path
          d={CROWN}
          fill="url(#bonaGoldFace)"
          stroke="#24150A"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Światło na grzbietach zębów */}
        <path
          d="M84,130 L106,62 L130,100 L166,42 L196,100 L228,48 L260,100 L292,48 L324,100 L354,42 L390,100 L414,62 L436,130"
          fill="none"
          stroke="#FFF6CE"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
        />

        {/* Kamień centralny */}
        <path d="M260,92 L277,124 L243,124 Z" fill="#8A5B0E" stroke="#24150A" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M260,102 L269,120 L251,120 Z" fill="#FDECA8" opacity="0.9" />

        {/* --- NAPIS --- */}
        <g
          fontFamily="Fraunces, Georgia, serif"
          fontSize="132"
          fontWeight="500"
          textAnchor="middle"
          letterSpacing="2"
        >
          <text x="260" y="292" fill="#000" opacity="0.5" transform="translate(0,7)">
            Bona
          </text>
          <text x="260" y="292" fill="#F4725C" opacity="0.95" transform="translate(-3,-3.5)">
            Bona
          </text>
          <text
            x="260"
            y="292"
            fill="url(#bonaRedFace)"
            stroke="#40060A"
            strokeWidth="4"
            paintOrder="stroke"
            strokeLinejoin="round"
          >
            Bona
          </text>

          {/* Refleks — jedyny ruch w logo */}
          {!still && (
            <>
              <mask id="bonaWordMask">
                <rect width="520" height="330" fill="black" />
                <text x="260" y="292" fill="white">
                  Bona
                </text>
              </mask>
              <g mask="url(#bonaWordMask)">
                <motion.rect
                  width="140"
                  height="170"
                  y="170"
                  fill="url(#bonaSheen)"
                  initial={{ x: -170 }}
                  animate={{ x: 560 }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut",
                  }}
                />
              </g>
            </>
          )}
        </g>
      </g>
    </motion.svg>
  );
}

/** Pięć zębów z fazowaną podstawą — kształt z oryginalnej wywieszki. */
const CROWN = `
M64,134
Q60,148 76,148
L444,148
Q460,148 456,134
L426,46
Q420,30 406,40
L390,96
L360,34
Q352,20 340,32
L312,92
L284,30
Q276,16 264,24
L260,28
L256,24
Q244,16 236,30
L208,92
L180,32
Q168,20 160,34
L130,96
L114,40
Q100,30 94,46
Z
`;
