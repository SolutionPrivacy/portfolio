import { motion, type MotionValue } from "motion/react";

/**
 * Logo Bony — przerysowane na podstawie starej wywieszki, ale dopracowane.
 *
 * Z oryginału zostało to, co go wyróżnia:
 *  — złota korona z zawijasami po bokach, lekko przechylona,
 *  — napis „BoNA”: duże B i A, mniejsze „ON” pośrodku, czerwone litery.
 *
 * Dodane: metaliczne złoto z fazą, rubin i perły w koronie, złota obwódka
 * liter, głęboki cień i dwa refleksy (na koronie i na napisie).
 * Wszystko to wektor — ostre na każdym ekranie.
 */

type LogoProps = {
  className?: string;
  opacity?: MotionValue<number>;
  scale?: MotionValue<number>;
  y?: MotionValue<number>;
  /** Wyłącza przesuwające się refleksy i łunę (np. na telefonie). */
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
      <Defs id="lg" />

      {/* Ciepła łuna — światło pieca za logo */}
      {still ? (
        <ellipse cx="260" cy="170" rx="215" ry="125" fill="#C8531B" opacity="0.2" filter="url(#lgGlow)" />
      ) : (
        <motion.ellipse
          cx="260"
          cy="170"
          rx="215"
          ry="125"
          fill="#C8531B"
          filter="url(#lgGlow)"
          animate={{ opacity: [0.16, 0.3, 0.16] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <g filter="url(#lgDrop)">
        <g transform="translate(0,-6) rotate(-4 260 120)">
          <CrownArt id="lg" still={still} />
        </g>
        <Lettering id="lg" x={260} y={296} size={150} still={still} />
      </g>
    </motion.svg>
  );
}

/** Sam napis „BoNA” w stylu logo — do nagłówka. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 100" className={className} role="img" aria-label="Bona">
      <Defs id="wm" />
      <g filter="url(#wmDrop)">
        <Lettering id="wm" x={150} y={82} size={88} still />
      </g>
    </svg>
  );
}

/** Sama korona — do ozdób (np. wstążka w rogu karty). */
export function CrownMark({ className, id = "cm" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="40 0 440 220" className={className} aria-hidden>
      <Defs id={id} />
      <g filter={`url(#${id}Drop)`}>
        <CrownArt id={id} still />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}GoldFace`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF0B8" />
        <stop offset="30%" stopColor="#F2C651" />
        <stop offset="68%" stopColor="#CC9422" />
        <stop offset="100%" stopColor="#8A5B0E" />
      </linearGradient>
      <linearGradient id={`${id}GoldEdge`} x1="0" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#FFFBE0" />
        <stop offset="55%" stopColor="#E8B856" />
        <stop offset="100%" stopColor="#6B4507" />
      </linearGradient>
      <linearGradient id={`${id}RedFace`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F04A38" />
        <stop offset="48%" stopColor="#CB1B1E" />
        <stop offset="100%" stopColor="#7E0A10" />
      </linearGradient>
      <radialGradient id={`${id}Pearl`} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="45%" stopColor="#F6E6B4" />
        <stop offset="100%" stopColor="#B98A2C" />
      </radialGradient>
      <radialGradient id={`${id}Ruby`} cx="0.35" cy="0.3" r="0.85">
        <stop offset="0%" stopColor="#FF8A78" />
        <stop offset="40%" stopColor="#D01A26" />
        <stop offset="100%" stopColor="#5A050C" />
      </radialGradient>
      <linearGradient id={`${id}Sheen`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="48%" stopColor="#FFFFFF" stopOpacity="0.65" />
        <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <filter id={`${id}Drop`} x="-35%" y="-35%" width="170%" height="180%">
        <feDropShadow dx="0" dy="7" stdDeviation="9" floodColor="#000" floodOpacity="0.6" />
      </filter>
      <filter id={`${id}Glow`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="22" />
      </filter>
    </defs>
  );
}

/** Korona: pięć zębów, zawijasy po bokach, opaska z rubinem i perłami. */
function CrownArt({ id, still }: { id: string; still?: boolean }) {
  return (
    <g>
      <clipPath id={`${id}CrownClip`}>
        <path d={CROWN_BODY} />
        <path d={CROWN_BAND} />
      </clipPath>

      {/* Cień pod spodem i jasna faza przesunięta w górę-lewo */}
      <path d={CROWN_BODY} transform="translate(0,8)" fill="#000" opacity="0.4" />
      <path d={CROWN_BODY} transform="translate(-3.5,-4)" fill={`url(#${id}GoldEdge)`} />

      {/* Zawijasy po bokach opaski (jak na starej wywieszce) */}
      <g
        fill="none"
        stroke={`url(#${id}GoldEdge)`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={CURL_LEFT} />
        <path d={CURL_RIGHT} />
      </g>

      {/* Korpus */}
      <path
        d={CROWN_BODY}
        fill={`url(#${id}GoldFace)`}
        stroke="#2A1707"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Filigran wewnątrz zębów */}
      <g fill="none" stroke="#7A4E0B" strokeWidth="3.2" strokeLinecap="round" opacity="0.85">
        <path d="M150,158 C138,140 150,120 168,126 C182,131 178,148 165,145" />
        <path d="M370,158 C382,140 370,120 352,126 C338,131 342,148 355,145" />
        <path d="M205,158 C208,140 222,128 236,138" />
        <path d="M315,158 C312,140 298,128 284,138" />
        <path d="M260,60 C246,82 248,112 260,138 C272,112 274,82 260,60 Z" fill="#B47A14" stroke="#7A4E0B" />
      </g>
      <path
        d="M260,72 C254,88 255,106 260,122"
        fill="none"
        stroke="#FFF3C4"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Światło na grzbietach zębów */}
      <path
        d="M78,80 L96,92 M168,52 L182,74 M260,26 L270,52 M352,52 L338,74 M442,80 L424,92"
        fill="none"
        stroke="#FFF8D8"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Opaska */}
      <path
        d={CROWN_BAND}
        fill={`url(#${id}GoldFace)`}
        stroke="#2A1707"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M92,162 Q260,190 428,162" fill="none" stroke="#FFF3C4" strokeWidth="2.6" opacity="0.6" />

      {/* Perły na zębach */}
      {(
        [
          [74, 72],
          [168, 42],
          [260, 14],
          [352, 42],
          [446, 72],
        ] as const
      ).map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="8" fill={`url(#${id}Pearl)`} stroke="#5A3A08" strokeWidth="1.8" />
      ))}

      {/* Rubin pośrodku i perły na opasce */}
      <path
        d="M260,166 L274,184 L260,204 L246,184 Z"
        fill={`url(#${id}Ruby)`}
        stroke="#2A1707"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M256,176 L262,172 L266,180 Z" fill="#FFD0C8" opacity="0.8" />
      {([152, 208, 312, 368] as const).map((cx, i) => (
        <circle
          key={cx}
          cx={cx}
          cy={i === 1 || i === 2 ? 186 : 180}
          r="5.5"
          fill={`url(#${id}Pearl)`}
          stroke="#5A3A08"
          strokeWidth="1.4"
        />
      ))}

      {/* Refleks przebiegający przez koronę */}
      {!still && (
        <g clipPath={`url(#${id}CrownClip)`}>
          <motion.rect
            width="120"
            height="230"
            y="0"
            fill={`url(#${id}Sheen)`}
            initial={{ x: -160 }}
            animate={{ x: 560 }}
            transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 6.5, ease: "easeInOut" }}
          />
        </g>
      )}
    </g>
  );
}

/** „BoNA”: duże B i A, małe ON, złota obwódka pod czerwonym licem. */
function Lettering({
  id,
  x,
  y,
  size,
  still,
}: {
  id: string;
  x: number;
  y: number;
  size: number;
  still?: boolean;
}) {
  const small = size * 0.66;
  const common = {
    x,
    y,
    textAnchor: "middle" as const,
    fontFamily: "Fraunces, Georgia, serif",
    fontWeight: 600,
    letterSpacing: size * 0.02,
  };
  const word = (
    <>
      <tspan fontSize={size}>B</tspan>
      <tspan fontSize={small}>ON</tspan>
      <tspan fontSize={size}>A</tspan>
    </>
  );

  return (
    <g>
      {/* cień */}
      <text {...common} fill="#000" opacity="0.5" transform={`translate(0,${size * 0.05})`}>
        {word}
      </text>
      {/* złota obwódka */}
      <text
        {...common}
        fill={`url(#${id}GoldEdge)`}
        stroke={`url(#${id}GoldEdge)`}
        strokeWidth={size * 0.075}
        strokeLinejoin="round"
      >
        {word}
      </text>
      {/* jasna faza */}
      <text {...common} fill="#F4725C" opacity="0.9" transform={`translate(${-size * 0.02},${-size * 0.025})`}>
        {word}
      </text>
      {/* czerwone lico */}
      <text
        {...common}
        fill={`url(#${id}RedFace)`}
        stroke="#40060A"
        strokeWidth={size * 0.026}
        paintOrder="stroke"
        strokeLinejoin="round"
      >
        {word}
      </text>

      {/* refleks na napisie */}
      {!still && (
        <>
          <mask id={`${id}WordMask`}>
            <rect width="520" height="330" fill="black" />
            <text {...common} fill="white">
              {word}
            </text>
          </mask>
          <g mask={`url(#${id}WordMask)`}>
            <motion.rect
              width="140"
              height="170"
              y={y - size}
              fill={`url(#${id}Sheen)`}
              initial={{ x: -170 }}
              animate={{ x: 560 }}
              transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
            />
          </g>
        </>
      )}
    </g>
  );
}

/* Kształty korony we współrzędnych viewBox 520 × 330. */
const CROWN_BODY =
  "M96,170 C88,142 80,110 74,72 C92,84 112,100 124,118 C134,96 150,68 168,42 C186,70 202,92 214,110 C226,84 244,46 260,14 C276,46 294,84 306,110 C318,92 334,70 352,42 C370,68 386,96 396,118 C408,100 428,84 446,72 C440,110 432,142 424,170 Z";
const CROWN_BAND = "M90,150 Q260,180 430,150 L440,188 Q260,222 80,188 Z";
const CURL_LEFT = "M86,176 C58,178 44,152 58,138 C70,127 88,140 80,152";
const CURL_RIGHT = "M434,176 C462,178 476,152 462,138 C450,127 432,140 440,152";
