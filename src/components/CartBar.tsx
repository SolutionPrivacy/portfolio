import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { silk } from "@/components/Reveal";
import { formatPrice } from "@/data/menu";
import { discountCodes } from "@/data/options";
import { linePrice, useCart } from "@/cart/CartContext";

/** Pasek koszyka — widoczny zawsze, gdy coś jest w koszyku. */
export function CartBar() {
  const cart = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  function applyCode() {
    const found = discountCodes[code.trim().toUpperCase()];
    if (!found) {
      setCodeError("Nie znamy takiego kodu.");
      cart.applyDiscount(null);
      return;
    }
    setCodeError("");
    cart.applyDiscount({ code: code.trim().toUpperCase(), percent: found.percent });
  }

  if (cart.count === 0) return null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-wegiel/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: silk }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: silk }}
              className="ml-auto flex h-full w-full max-w-md flex-col border-l border-zloto/20 bg-sadza"
              aria-label="Koszyk"
            >
              <div className="flex items-center justify-between border-b border-krem/10 px-7 py-6">
                <h2 className="font-display text-2xl font-light text-krem">Koszyk</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-[0.78rem] tracking-wide2 text-krem/65 hover:text-krem"
                >
                  Zamknij
                </button>
              </div>

              {cart.setup && (
                <div className="border-b border-krem/10 px-7 py-4">
                  <p className="text-[0.78rem] tracking-wide2 text-popiol/88">
                    {cart.setup.mode === "dostawa" ? "Dostawa" : "Odbiór osobisty"}
                  </p>
                  <p className="mt-1 text-[0.9rem] font-light text-krem/85">
                    {cart.setup.mode === "dostawa"
                      ? cart.setup.address
                      : cart.setup.timing === "zaplanuj"
                        ? `${cart.setup.date} o ${cart.setup.time}`
                        : "Najszybciej jak się da"}
                  </p>
                  <button
                    type="button"
                    onClick={cart.clearSetup}
                    className="mt-2 text-[0.75rem] text-zloto underline underline-offset-4"
                  >
                    Zmień
                  </button>
                </div>
              )}

              <ul className="flex-1 overflow-y-auto px-7 py-5">
                {cart.lines.map((line) => (
                  <li key={line.key} className="border-b border-krem/10 py-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg font-light text-krem">
                          {line.name}
                        </p>
                        {line.extras.length > 0 && (
                          <p className="mt-1 text-[0.78rem] font-light leading-relaxed text-krem/60">
                            {line.extras.map((e) => e.label).join(", ")}
                          </p>
                        )}
                      </div>
                      <span className="whitespace-nowrap font-display text-base text-zloto">
                        {formatPrice(linePrice(line))}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <Stepper
                        onMinus={() => cart.dec(line.key)}
                        onPlus={() => cart.inc(line.key)}
                        value={line.quantity}
                      />
                      <button
                        type="button"
                        onClick={() => cart.remove(line.key)}
                        className="text-[0.75rem] text-krem/55 underline underline-offset-4 hover:text-krem/85"
                      >
                        Usuń
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-krem/10 px-7 py-6">
                <div className="flex gap-3">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Kod rabatowy"
                    className="min-w-0 flex-1 border-0 border-b border-krem/20 bg-transparent px-0 py-2.5 text-[0.9rem] font-light text-krem placeholder:text-krem/45 focus:border-zar focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={applyCode}
                    className="border border-zloto/40 px-4 py-2.5 text-[0.75rem] tracking-wide2 text-zloto transition-colors duration-400 hover:bg-zloto/10"
                  >
                    Użyj
                  </button>
                </div>
                {codeError && (
                  <p className="mt-2 text-[0.78rem] text-zar">{codeError}</p>
                )}
                {cart.discount && (
                  <p className="mt-2 text-[0.78rem] text-zloto">
                    Kod {cart.discount.code} — {cart.discount.percent}% taniej
                  </p>
                )}

                <div className="mt-5 flex items-baseline justify-between">
                  <span className="text-[0.85rem] tracking-wide2 text-krem/68">
                    Razem
                  </span>
                  <span className="font-display text-2xl font-light text-krem">
                    {formatPrice(cart.total)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    navigate("/kasa");
                  }}
                  className="mt-5 w-full bg-zar px-7 py-4 text-[0.82rem] tracking-wide2 text-krem transition-colors duration-400 hover:bg-zar/85"
                >
                  Przejdź do kasy
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pływający przycisk */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: silk }}
        className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-5 bg-zar px-7 py-4 text-krem shadow-[0_18px_50px_rgba(0,0,0,0.55)] transition-colors duration-400 hover:bg-zar/88"
        style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-krem/20 text-[0.75rem]">
          {cart.count}
        </span>
        <span className="text-[0.82rem] tracking-wide2">Przejdź do kasy</span>
        <span className="font-display text-base">{formatPrice(cart.total)}</span>
      </motion.button>
    </>
  );
}

function Stepper({
  value,
  onMinus,
  onPlus,
}: {
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div className="flex items-center border border-krem/15">
      <button
        type="button"
        onClick={onMinus}
        aria-label="Mniej"
        className="px-3 py-1.5 text-krem/78 transition-colors duration-300 hover:text-krem"
      >
        −
      </button>
      <span className="min-w-8 text-center text-[0.9rem] text-krem">{value}</span>
      <button
        type="button"
        onClick={onPlus}
        aria-label="Więcej"
        className="px-3 py-1.5 text-krem/78 transition-colors duration-300 hover:text-krem"
      >
        +
      </button>
    </div>
  );
}
