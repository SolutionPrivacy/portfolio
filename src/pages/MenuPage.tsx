import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { DishRow } from "@/components/DishRow";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { menu } from "@/data/menu";
import { useAddToCart } from "@/cart/useAddToCart";
import { OrderModeModal } from "@/components/OrderModeModal";
import { ProductModal } from "@/components/ProductModal";
import { site } from "@/data/site";

export default function MenuPage() {
  const flow = useAddToCart();

  return (
    <PageShell
      wide
      eyebrow="Pełna karta"
      title="Karta Bony"
      lead="Ciasto wyrabiamy rano, obiady gotujemy na bieżąco. Ceny takie same na miejscu, na wynos i z dostawą."
    >
      <Reveal delay={0.12} className="mt-12">
        <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3">
          {menu.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                className="text-[0.78rem] tracking-wide2 text-krem/65 underline decoration-transparent underline-offset-8 transition-colors duration-500 hover:text-krem hover:decoration-zar"
              >
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mx-auto mt-20 max-w-3xl space-y-24">
        {menu.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-32">
            <Reveal>
              <h2 className="font-display text-[clamp(1.8rem,4vw,2.7rem)] font-light text-krem">
                {category.title}
              </h2>
              <p className="mt-3 font-display text-lg font-light italic text-krem/65">
                {category.intro}
              </p>
              <div className="mt-7 h-px w-14 bg-zloto/40" />
            </Reveal>

            <motion.ul
              className="mt-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            >
              {category.dishes.map((dish) => (
                <DishRow
                  key={dish.name + dish.price}
                  dish={dish}
                  showAllergens
                  onAdd={(d) => flow.requestAdd(d, category.id)}
                />
              ))}
            </motion.ul>
          </section>
        ))}
      </div>

      <Reveal className="mx-auto mt-20 max-w-2xl text-center">
        <p className="text-[0.95rem] font-light leading-relaxed text-krem/72">
          Skróty przy daniach to alergeny — ich pełny opis znajdziesz{" "}
          <Link to="/alergeny" className="text-zloto underline underline-offset-4">
            tutaj
          </Link>
          . Rezerwacje przyjmujemy pod{" "}
          <a
            href={site.phoneHref}
            className="text-zloto underline decoration-zloto/30 underline-offset-4"
          >
            {site.phone}
          </a>
          .
        </p>

        <p className="mt-8 text-[0.85rem] font-light text-krem/60">
          Klikaj plusik przy daniu, żeby dodać je do koszyka.
        </p>
      </Reveal>
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
    </PageShell>
  );
}
