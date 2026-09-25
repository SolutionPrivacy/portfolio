import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Logo } from "@/components/Logo";
import { backgrounds } from "@/data/images";
import { site } from "@/data/site";

const silk = [0.16, 1, 0.3, 1] as const;
const AUTOPLAY_MS = 6500;

/**
 * Sekcja otwierająca: pokaz slajdów na całą wysokość ekranu.
 *
 * — zdjęcia przesuwają się poziomo (strzałki, kropki, przeciągnięcie, autoodtwarzanie),
 * — na slajdzie: logo, slogan i przyciski „Zamów online” / „Zarezerwuj stolik”,
 * — po przewinięciu w dół pokaz odjeżdża (zdjęcia wolniej niż strona — paralaksa),
 *   a pod nim zaczyna się ciemne tło z resztą strony.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const count = backgrounds.length;

  const [[index, dir], setPage] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback(
    (d: number) => setPage(([i]) => [(i + d + count) % count, d]),
    [count],
  );
  const goTo = useCallback(
    (target: number) => setPage(([i]) => [target, target > i ? 1 : -1]),
    [],
  );

  // Autoodtwarzanie; ręczna zmiana slajdu (zmiana `index`) zeruje odliczanie.
  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setTimeout(() => paginate(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, reduce, paginate]);

  // Pozostałe zdjęcia doładowują się z wyprzedzeniem, żeby slajd nie mrugał.
  useEffect(() => {
    backgrounds.slice(1).forEach((b) => {
      const img = new Image();
      img.src = b.src;
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Paralaksa zdjęć: przesuwają się w dół wolniej niż reszta strony.
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "13%"]);
  // Zawartość odjeżdża i gaśnie: logo najpóźniej, przyciski jako ostatnie.
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const leadOpacity = useTransform(scrollYProgress, [0.05, 0.5], [1, 0]);
  const leadY = useTransform(scrollYProgress, [0.05, 0.5], [0, -40]);
  const ctaOpacity = useTransform(scrollYProgress, [0.25, 0.62], [1, 0]);
  const ctaY = useTransform(scrollYProgress, [0.25, 0.62], [0, -24]);

  const enter = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: silk } },
  };

  return (
    <section
      ref={ref}
      id="poczatek"
      className="relative h-[100svh] overflow-hidden bg-wegiel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* --- ZDJĘCIA --- */}
      <motion.div
        style={reduce ? undefined : { y: photoY }}
        className="absolute inset-x-0 -top-[15%] h-[115%] will-change-transform"
        onPanEnd={(_, info) => {
          if (info.offset.x < -60) paginate(1);
          else if (info.offset.x > 60) paginate(-1);
        }}
      >
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%" }),
              center: { x: 0 },
              exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%" }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0 : 1.1, ease: silk }}
            className="absolute inset-0"
          >
            <motion.img
              src={backgrounds[index].src}
              alt={backgrounds[index].alt}
              draggable={false}
              fetchPriority={index === 0 ? "high" : "auto"}
              initial={{ scale: reduce ? 1 : 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7.5, ease: "easeOut" }}
              style={{ objectPosition: backgrounds[index].focus ?? "center" }}
              className="h-full w-full select-none object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Przyciemnienie: góra pod menu, dół pod kropki i tekst. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-wegiel/45"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,9,8,0.65), rgba(11,9,8,0) 35%), linear-gradient(0deg, rgba(11,9,8,0.85), rgba(11,9,8,0) 45%)",
        }}
      />

      {/* --- ZAWARTOŚĆ SLAJDU --- */}
      <div className="pointer-events-none relative z-[2] flex h-full flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.7, ease: silk, delay: 0.15 }}
          style={reduce ? undefined : { y: logoY }}
          className="w-[min(82vw,34rem)]"
        >
          <Logo className="h-auto w-full" />
        </motion.div>

        <motion.div
          style={reduce ? undefined : { opacity: leadOpacity, y: leadY }}
          className="mt-4 text-center"
        >
          <motion.p
            initial="hidden"
            animate="show"
            variants={{
              ...enter,
              show: { ...enter.show, transition: { duration: 1.4, ease: silk, delay: 0.6 } },
            }}
            className="mx-auto max-w-md font-display text-[clamp(1rem,2.2vw,1.35rem)] font-light italic leading-relaxed text-krem/90"
          >
            {site.tagline}
          </motion.p>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { opacity: ctaOpacity, y: ctaY }}
          className="pointer-events-auto mt-10"
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              ...enter,
              show: { ...enter.show, transition: { duration: 1.4, ease: silk, delay: 0.85 } },
            }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/karta" className="btn-primary px-9 py-4 text-[0.78rem] tracking-wide2 text-krem">
              Zamów online
            </Link>
            <a href="#rezerwacja" className="btn-ghost px-9 py-4 text-[0.78rem] tracking-wide2 text-zloto">
              Zarezerwuj stolik
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* --- STRZAŁKI --- */}
      {(
        [
          { d: -1, side: "left-3 sm:left-[4%]", label: "Poprzedni slajd", path: "M15 5l-7 7 7 7" },
          { d: 1, side: "right-3 sm:right-[4%]", label: "Następny slajd", path: "M9 5l7 7-7 7" },
        ] as const
      ).map((a) => (
        <button
          key={a.d}
          type="button"
          aria-label={a.label}
          data-no-glow
          onClick={() => paginate(a.d)}
          className={`absolute top-1/2 z-[3] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-krem/25 bg-wegiel/55 text-krem backdrop-blur-sm transition-[background-color,border-color,transform] duration-300 hover:scale-110 hover:border-zloto hover:bg-zar sm:h-14 sm:w-14 ${a.side}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={a.path} />
          </svg>
        </button>
      ))}

      {/* --- WSKAŹNIK PRZEWIJANIA I KROPKI --- */}
      {!reduce && (
        <motion.div
          style={{ opacity: ctaOpacity }}
          className="pointer-events-none absolute bottom-16 left-1/2 z-[2] -translate-x-1/2 text-center"
        >
          <p className="mb-3 text-[0.68rem] tracking-wide3 text-krem/55">przewiń</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto h-8 w-px bg-gradient-to-b from-zloto/60 to-transparent"
          />
        </motion.div>
      )}

      <div className="absolute inset-x-0 bottom-6 z-[3] flex items-center justify-center gap-2.5">
        {backgrounds.map((b, i) => (
          <button
            key={b.src}
            type="button"
            aria-label={`Slajd ${i + 1}`}
            aria-current={i === index}
            data-no-glow
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full border border-krem/50 transition-all duration-500 ${
              i === index ? "w-7 border-zloto bg-zloto" : "w-2.5 bg-transparent hover:bg-krem/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
