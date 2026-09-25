import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CountUpProps = {
  to: number;
  from?: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
};

/** Liczba, która "nabiega" od `from` do `to`, gdy wejdzie w ekran. Polski zapis: 4,1. */
export function CountUp({ to, from = 0, decimals = 0, suffix = "", duration = 2.2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : from);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration]);

  const text = value.toFixed(decimals).replace(".", ",");
  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}
