import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Logo } from "@/components/Logo";
import { site } from "@/data/site";

const silk = [0.16, 1, 0.3, 1] as const;

/**
 * Sekcja otwierająca: logo na środku, pod nim slogan i przyciski.
 *
 * Przy przewijaniu w dół logo i napis gasną i delikatnie odjeżdżają w górę.
 * Przyciski gasną wolniej, więc do ostatniej chwili pozostają klikalne —
 * nic nie zasłania funkcji strony.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Logo znika pierwsze i najszybciej.

  // Slogan chwilę później.
  const leadOpacity = useTransform(scrollYProgress, [0.05, 0.5], [1, 0]);
  const leadY = useTransform(scrollYProgress, [0.05, 0.5], [0, -40]);

  // Przyciski na końcu.
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
      className="relative h-[100svh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6">
                <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.7, ease: silk, delay: 0.15 }}
          style={undefined}
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
            className="mx-auto max-w-md font-display text-[clamp(1rem,2.2vw,1.35rem)] font-light italic leading-relaxed text-krem/88"
          >
            {site.tagline}
          </motion.p>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { opacity: ctaOpacity, y: ctaY }}
          className="mt-10"
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
            <Link
              to="/karta"
              className="bg-zar px-9 py-4 text-[0.78rem] tracking-wide2 text-krem transition-colors duration-500 hover:bg-zar/85"
            >
              Zamów online
            </Link>
            <a
              href="#rezerwacja"
              className="border border-zloto/45 px-9 py-4 text-[0.78rem] tracking-wide2 text-zloto transition-colors duration-500 hover:border-zloto hover:bg-zloto/10"
            >
              Zarezerwuj stolik
            </a>
          </motion.div>
        </motion.div>

        {!reduce && (
          <motion.div
            style={{ opacity: ctaOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <p className="mb-3 text-[0.68rem] tracking-wide3 text-krem/50">przewiń</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto h-10 w-px bg-gradient-to-b from-zloto/60 to-transparent"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
