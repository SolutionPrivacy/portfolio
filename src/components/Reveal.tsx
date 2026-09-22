import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

/** Powolne, miękkie wyhamowanie — używane w całym serwisie. */
const silk = [0.16, 1, 0.3, 1] as const;

type Direction = "up" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 36 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  /** Ile procent elementu musi być widoczne, zanim ruszy animacja. */
  amount?: number;
  as?: "div" | "section" | "article" | "li" | "header" | "figure";
};

/**
 * Pojedynczy element pojawiający się przy scrollu.
 * Przy `prefers-reduced-motion` renderuje się od razu, bez ruchu.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 1.1,
  direction = "up",
  amount = 0.3,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const { x, y } = offset[direction];

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: silk }}
    >
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Odstęp między kolejnymi dziećmi. */
  step?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "section";
};

/** Kontener: dzieci opakowane w <RevealItem /> pojawiają się kolejno. */
export function Stagger({
  children,
  className,
  step = 0.12,
  delay = 0,
  amount = 0.2,
  as = "div",
}: StaggerProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : step,
        delayChildren: reduce ? 0 : delay,
      },
    },
  };

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Tag>
  );
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: silk },
  },
};

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "figure";
};

/** Dziecko <Stagger />. */
export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag className={className} variants={reduce ? undefined : itemVariants}>
      {children}
    </Tag>
  );
}

export { silk };
