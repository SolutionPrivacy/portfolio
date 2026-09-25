import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { PageShell } from "@/components/PageShell";
import { Reveal, silk } from "@/components/Reveal";
import { formatPrice } from "@/data/menu";
import { linePrice, useCart } from "@/cart/CartContext";
import { site } from "@/data/site";

type Payment = "karta" | "gotowka";

export default function CheckoutPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comment: "",
  });
  const [payment, setPayment] = useState<Payment | null>(null);
  const [terms, setTerms] = useState(false);

  const set = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const ready =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.includes("@") &&
    form.phone.trim().length >= 9 &&
    payment &&
    terms;

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!ready) return;
    // Bez bramki płatności — zamówienie potwierdzamy telefonicznie.
    setDone(true);
    cart.reset();
    window.scrollTo(0, 0);
  }

  if (done) {
    return (
      <PageShell eyebrow="Zamówienie" title="Przyjęliśmy zamówienie">
        <Reveal className="mt-10 text-center">
          <p className="mx-auto max-w-reading text-[1rem] font-light leading-[1.85] text-krem/82">
            Oddzwonimy, żeby potwierdzić szczegóły. Płacisz przy odbiorze — kartą
            albo gotówką, tak jak wybrałeś.
          </p>
          <a
            href={site.phoneHref}
            className="mt-7 inline-block font-display text-2xl font-light text-zloto"
          >
            {site.phone}
          </a>
          <div className="mt-10">
            <Link
              to="/karta"
              className="inline-block btn-primary px-9 py-4 text-[0.8rem] tracking-wide2 text-krem"
            >
              Zamów coś jeszcze
            </Link>
          </div>
        </Reveal>
      </PageShell>
    );
  }

  if (cart.lines.length === 0) {
    return (
      <PageShell eyebrow="Kasa" title="Koszyk jest pusty">
        <Reveal className="mt-10 text-center">
          <p className="text-[0.98rem] font-light text-krem/72">
            Dodaj coś z karty, a wrócimy tutaj razem.
          </p>
          <button
            type="button"
            onClick={() => navigate("/karta")}
            className="mt-8 btn-primary px-9 py-4 text-[0.8rem] tracking-wide2 text-krem"
          >
            Otwórz kartę
          </button>
        </Reveal>
      </PageShell>
    );
  }

  return (
    <PageShell wide eyebrow="Kasa" title="Dane do zamówienia">
      <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
        <form onSubmit={submit} className="lg:col-span-7">
          <div className="grid gap-x-8 sm:grid-cols-2">
            <Field
              id="firstName"
              label="Imię"
              value={form.firstName}
              onChange={(v) => set("firstName", v)}
              autoComplete="given-name"
            />
            <Field
              id="lastName"
              label="Nazwisko"
              value={form.lastName}
              onChange={(v) => set("lastName", v)}
              autoComplete="family-name"
            />
            <Field
              id="email"
              label="E-mail"
              type="email"
              value={form.email}
              onChange={(v) => set("email", v)}
              autoComplete="email"
            />
            <Field
              id="phone"
              label="Telefon"
              type="tel"
              value={form.phone}
              onChange={(v) => set("phone", v)}
              autoComplete="tel"
            />
          </div>

          <div className="mt-10">
            <h2 className="text-[0.78rem] tracking-wide2 text-popiol/92">
              Metoda płatności
            </h2>
            <div className="mt-4 space-y-2.5">
              <PayChoice
                active={payment === "karta"}
                onClick={() => setPayment("karta")}
                label="Płatność kartą w restauracji"
              />
              <PayChoice
                active={payment === "gotowka"}
                onClick={() => setPayment("gotowka")}
                label="Płatność gotówką"
              />
            </div>
          </div>

          <div className="mt-10">
            <label
              htmlFor="comment"
              className="block text-[0.78rem] tracking-wide2 text-popiol/92"
            >
              Komentarz do zamówienia
            </label>
            <textarea
              id="comment"
              rows={3}
              value={form.comment}
              onChange={(e) => set("comment", e.target.value)}
              placeholder="Piętro, kod do domofonu, bez cebuli…"
              className="mt-3 w-full resize-none border-0 border-b border-krem/20 bg-transparent px-0 py-3 text-[0.98rem] font-light text-krem placeholder:text-krem/45 focus:border-zar focus:outline-none"
            />
          </div>

          <label className="mt-10 flex cursor-pointer items-start gap-4">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="sr-only"
            />
            <span
              aria-hidden
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border transition-colors duration-300 ${
                terms ? "border-zar bg-zar/15" : "border-krem/30"
              }`}
            >
              {terms && <span className="h-2.5 w-2.5 bg-zar" />}
            </span>
            <span className="text-[0.88rem] font-light leading-relaxed text-krem/78">
              Klikając opcję „Potwierdź", wyrażasz zgodę na{" "}
              <a
                href="/regulamin"
                className="text-zloto underline underline-offset-4"
              >
                Regulamin
              </a>{" "}
              i{" "}
              <a
                href="/polityka-prywatnosci"
                className="text-zloto underline underline-offset-4"
              >
                Politykę ochrony prywatności
              </a>{" "}
              dla tej strony.
            </span>
          </label>

          <motion.button
            type="submit"
            disabled={!ready}
            whileHover={ready ? { y: -2 } : undefined}
            transition={{ duration: 0.35, ease: silk }}
            className="mt-10 w-full btn-primary px-9 py-5 text-[0.82rem] tracking-wide2 text-krem disabled:cursor-not-allowed disabled:bg-krem/10 disabled:text-krem/50"
          >
            Potwierdź
          </motion.button>
        </form>

        {/* Podsumowanie */}
        <aside className="lg:col-span-5">
          <div className="border border-krem/12 px-6 py-7">
            <h2 className="font-display text-xl font-light text-krem">
              Twoje zamówienie
            </h2>

            {cart.setup && (
              <p className="mt-3 text-[0.85rem] font-light text-krem/68">
                {cart.setup.mode === "dostawa"
                  ? `Dostawa — ${cart.setup.address}`
                  : cart.setup.timing === "zaplanuj"
                    ? `Odbiór — ${cart.setup.date} o ${cart.setup.time}`
                    : "Odbiór — najszybciej jak się da"}
              </p>
            )}

            <ul className="mt-6 space-y-4">
              <AnimatePresence initial={false}>
                {cart.lines.map((line) => (
                  <motion.li
                    key={line.key}
                    layout
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start justify-between gap-4 border-b border-krem/10 pb-4"
                  >
                    <div className="min-w-0">
                      <p className="text-[0.95rem] font-light text-krem/92">
                        {line.quantity}× {line.name}
                      </p>
                      {line.extras.length > 0 && (
                        <p className="mt-1 text-[0.76rem] font-light leading-relaxed text-krem/55">
                          {line.extras.map((e) => e.label).join(", ")}
                        </p>
                      )}
                    </div>
                    <span className="whitespace-nowrap text-[0.9rem] text-zloto">
                      {formatPrice(linePrice(line))}
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {cart.discount && (
              <div className="mt-5 flex justify-between text-[0.88rem] text-zloto">
                <span>Kod {cart.discount.code}</span>
                <span>−{cart.discount.percent}%</span>
              </div>
            )}

            <div className="mt-6 flex items-baseline justify-between border-t border-krem/15 pt-5">
              <span className="text-[0.85rem] tracking-wide2 text-krem/68">Razem</span>
              <span className="font-display text-2xl font-light text-krem">
                {formatPrice(cart.total)}
              </span>
            </div>

            <p className="mt-5 text-[0.78rem] font-light leading-relaxed text-krem/55">
              Płatność odbywa się przy odbiorze. Nie pobieramy żadnych danych karty
              na tej stronie.
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="py-4">
      <label htmlFor={id} className="block text-[0.74rem] tracking-wide2 text-popiol/92">
        {label}
        <span className="ml-1 text-zar">*</span>
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-0 border-b border-krem/20 bg-transparent px-0 py-3 text-[1rem] font-light text-krem focus:border-zar focus:outline-none"
      />
    </div>
  );
}

function PayChoice({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center gap-3 border px-5 py-4 text-left transition-colors duration-350 ${
        active ? "border-zar bg-zar/10" : "border-krem/15 hover:border-krem/35"
      }`}
    >
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
          active ? "border-zar" : "border-krem/30"
        }`}
      >
        {active && <span className="h-2 w-2 rounded-full bg-zar" />}
      </span>
      <span className="text-[0.95rem] font-light text-krem/92">{label}</span>
    </button>
  );
}
