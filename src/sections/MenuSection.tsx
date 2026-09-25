import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DishRow } from "@/components/DishRow";
import { Reveal, silk } from "@/components/Reveal";
import { menu } from "@/data/menu";
import { useAddToCart } from "@/cart/useAddToCart";
import { OrderModeModal } from "@/components/OrderModeModal";
import { ProductModal } from "@/components/ProductModal";

export function MenuSection() {
  const [activeId, setActiveId] = useState(menu[0].id);
  const active = menu.find((c) => c.id === activeId) ?? menu[0];
  const reduce = useReducedMotion();
  const flow = useAddToCart();

  // Na stronie głównej pokazujemy skrót — pełna lista jest na /karta.
  const preview = active.dishes.slice(0, 8);
  const hidden = active.dishes.length - preview.length;

  return (
    <section id="karta" className="relative py-28 sm:py-40">
      <div className="shell">
        <div className="glass px-6 py-16 sm:px-12 sm:py-20">
          <Reveal className="text-center">
            <p className="text-[0.7rem] tracking-wide3 text-zar">Karta</p>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,5.5vw,3.8rem)] font-light leading-tight text-krem">
              Co wychodzi z kuchni
            </h2>
            <div className="mx-auto mt-9 h-px w-16 bg-zloto/50" />
          </Reveal>

          <Reveal delay={0.12} className="mt-14">
            <div
              role="tablist"
              aria-label="Kategorie karty"
              className="-mx-6 flex snap-x gap-1 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
            >
              {menu.map((category) => {
                const isActive = category.id === activeId;
                return (
                  <button
                    key={category.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(category.id)}
                    className={`relative shrink-0 snap-start px-5 py-3 text-[0.8rem] tracking-wide2 transition-colors duration-500 ${
                      isActive ? "text-krem" : "text-krem/60 hover:text-krem/85"
                    }`}
                  >
                    {category.title}
                    {isActive && (
                      <motion.span
                        layoutId="menu-tab"
                        className="absolute inset-x-3 bottom-1 h-px bg-zar"
                        transition={{ duration: 0.55, ease: silk }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="mx-auto mt-12 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: silk }}
              >
                <p className="mb-9 text-center font-display text-lg font-light italic text-krem/68">
                  {active.intro}
                </p>

                <motion.ul
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: reduce ? 0 : 0.055,
                        delayChildren: 0.08,
                      },
                    },
                  }}
                >
                  {preview.map((dish) => (
                    <DishRow
                      key={dish.name + dish.price}
                      dish={dish}
                      onAdd={(d) => flow.requestAdd(d, active.id)}
                    />
                  ))}
                </motion.ul>

                {hidden > 0 && (
                  <p className="mt-8 text-center text-[0.85rem] font-light text-krem/60">
                    …i jeszcze {hidden} {hidden === 1 ? "pozycja" : "pozycji"} w tej
                    kategorii
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <Reveal delay={0.1} className="mt-14 text-center">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/karta"
                className="btn-ghost px-9 py-4 text-[0.78rem] tracking-wide2 text-zloto"
              >
                Pełna karta
              </Link>
              <Link
                to="/karta"
                className="btn-primary px-9 py-4 text-[0.78rem] tracking-wide2 text-krem"
              >
                Zobacz wszystko i zamów
              </Link>
            </div>
            <p className="mt-7 text-[0.8rem] font-light text-krem/55">
              Alergeny w każdym daniu znajdziesz{" "}
              <Link to="/alergeny" className="text-zloto/80 underline underline-offset-4">
                na osobnej stronie
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </div>

      <OrderModeModal
        open={flow.askMode}
        onClose={flow.closeMode}
        onConfirm={flow.confirmMode}
      />
      <ProductModal
        pending={flow.pending}
        onClose={flow.closeProduct}
        onAdd={flow.addLine}
      />
    </section>
  );
}
