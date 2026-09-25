import { useId } from "react";
import { site } from "@/data/site";

const STAR = "M12 2.4l2.9 6.1 6.7.9-4.9 4.6 1.2 6.6L12 17.4l-5.9 3.2 1.2-6.6L2.4 9.4l6.7-.9L12 2.4z";

type RatingLinkProps = {
  /** Wersja skrócona: jedna gwiazdka i sama ocena (wąskie paski). */
  compact?: boolean;
  className?: string;
};

/**
 * Ocena z Google w rogu paska. Kliknięcie otwiera opinie o Bonie w Google.
 * Ułamkowe gwiazdki (4,1 = cztery pełne i 10% piątej).
 * Zwykły <a>, więc dostaje też podświetlenie pod kursorem jak inne przyciski.
 */
export function RatingLink({ compact, className = "" }: RatingLinkProps) {
  const uid = useId().replace(/:/g, "");
  const { value, count } = site.rating;
  const text = value.toFixed(1).replace(".", ",");

  return (
    <a
      href={site.googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ocena ${text} na 5 w Google (ponad ${count} opinii) — zobacz opinie`}
      title="Zobacz opinie w Google"
      className={`rating items-center gap-2.5 rounded-md px-3 py-1.5 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-0 w-0" aria-hidden>
        <defs>
          <linearGradient id={`${uid}g`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE38A" />
            <stop offset="100%" stopColor="#D9A441" />
          </linearGradient>
        </defs>
      </svg>

      <span className="flex items-center gap-0.5" aria-hidden>
        {(compact ? [0] : [0, 1, 2, 3, 4]).map((i) => {
          const fill = compact ? 1 : Math.min(1, Math.max(0, value - i));
          return (
            <svg key={i} viewBox="0 0 24 24" className="star h-[15px] w-[15px]" style={{ ["--i" as string]: i }}>
              <clipPath id={`${uid}c${i}`}>
                <rect width={24 * fill} height="24" />
              </clipPath>
              <path d={STAR} fill="none" stroke="#D9A441" strokeOpacity="0.55" strokeWidth="1.4" strokeLinejoin="round" />
              <path d={STAR} fill={`url(#${uid}g)`} clipPath={`url(#${uid}c${i})`} />
            </svg>
          );
        })}
      </span>

      <span className="font-display text-[1rem] font-normal leading-none text-zloto">{text}</span>
      {!compact && (
        <span className="hidden text-[0.7rem] leading-tight tracking-wide2 text-krem/75 2xl:block">
          {count}+ opinii
          <span className="block text-[0.62rem] text-popiol">w Google</span>
        </span>
      )}
    </a>
  );
}
