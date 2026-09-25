import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useIsMobile } from "./useIsMobile";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Ile pikseli element przesuwa się względem treści (dodatnie = wolniej niż scroll). */
  distance?: number;
};

/**
 * Paralaksa: element porusza się z inną prędkością niż reszta strony.
 * Przy `prefers-reduced-motion` stoi w miejscu.
 */
export function Parallax({ children, className, distance = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mobile = useIsMobile();
  const reduce = reduceMotion || mobile;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
