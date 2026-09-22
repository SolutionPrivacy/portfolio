import { motion, useReducedMotion } from "motion/react";
import { formatPrice, type Dish } from "@/data/menu";
import { itemVariants, silk } from "./Reveal";

type DishRowProps = {
  dish: Dish;
  showAllergens?: boolean;
  /** Kliknięcie plusika — otwiera okno z dodatkami. */
  onAdd?: (dish: Dish) => void;
};

export function DishRow({ dish, showAllergens, onAdd }: DishRowProps) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      variants={reduce ? undefined : itemVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative"
    >
      <div className="flex items-center gap-4 py-5">
        <motion.div
          variants={reduce ? undefined : { rest: { x: 0 }, hover: { x: 7 } }}
          transition={{ duration: 0.55, ease: silk }}
          className="flex min-w-0 flex-1 items-baseline gap-5"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display text-[1.3rem] font-light leading-snug text-krem">
                {dish.name}
              </h3>
              {dish.note && (
                <span className="text-[0.68rem] tracking-wide2 text-zar/85">
                  {dish.note}
                </span>
              )}
            </div>

            {dish.description && (
              <p className="mt-1.5 max-w-reading text-[0.9rem] font-light leading-relaxed text-krem/65">
                {dish.description}
              </p>
            )}

            {showAllergens && dish.allergens && dish.allergens.length > 0 && (
              <p className="mt-2 text-[0.68rem] tracking-wide2 text-popiol/70">
                {dish.allergens.join(" · ")}
              </p>
            )}
          </div>

          <span
            aria-hidden
            className="hidden h-px flex-1 self-center bg-gradient-to-r from-zloto/20 to-zloto/5 sm:block"
          />

          <span className="whitespace-nowrap font-display text-lg font-light text-zloto">
            {formatPrice(dish.price)}
          </span>
        </motion.div>

        {onAdd && (
          <motion.button
            type="button"
            onClick={() => onAdd(dish)}
            aria-label={`Dodaj: ${dish.name}`}
            whileHover={reduce ? undefined : { scale: 1.12 }}
            whileTap={reduce ? undefined : { scale: 0.94 }}
            transition={{ duration: 0.3, ease: silk }}
            className="grid h-10 w-10 shrink-0 place-items-center border border-zar/50 text-xl leading-none text-zar transition-colors duration-350 hover:bg-zar hover:text-krem"
          >
            +
          </motion.button>
        )}
      </div>

      <motion.span
        aria-hidden
        variants={reduce ? undefined : { rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.65, ease: silk }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-zar/60"
      />
      <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-krem/10" />
    </motion.li>
  );
}
