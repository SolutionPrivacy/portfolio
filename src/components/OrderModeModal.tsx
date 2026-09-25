import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { silk } from "@/components/Reveal";
import { deliveryMinutes, pickupMinutes } from "@/data/options";
import type { OrderMode, OrderSetup, Timing } from "@/cart/CartContext";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (setup: OrderSetup) => void;
};

/** Data dzisiejsza w formacie, jakiego chce <input type="date">, w czasie lokalnym. */
function todayISO(): string {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60_000).toISOString().slice(0, 10);
}

/** Godziny co 5 minut, najwcześniej 30 minut od teraz (tylko dla dzisiaj). */
function useTimeSlots(date: string): string[] {
  return useMemo(() => {
    const slots: string[] = [];
    const isToday = date === todayISO();

    const earliest = new Date();
    earliest.setMinutes(earliest.getMinutes() + 30);
    earliest.setSeconds(0, 0);
    earliest.setMinutes(Math.ceil(earliest.getMinutes() / 5) * 5);

    for (let h = 10; h <= 21; h++) {
      for (let m = 0; m < 60; m += 5) {
        if (h === 21 && m > 30) break;
        if (isToday) {
          const candidate = new Date();
          candidate.setHours(h, m, 0, 0);
          if (candidate < earliest) continue;
        }
        slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
    }
    return slots;
  }, [date]);
}

export function OrderModeModal({ open, onClose, onConfirm }: Props) {
  const [mode, setMode] = useState<OrderMode | null>(null);
  const [address, setAddress] = useState("");
  const [timing, setTiming] = useState<Timing | null>(null);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");

  const slots = useTimeSlots(date);

  useEffect(() => {
    if (!open) return;
    setMode(null);
    setAddress("");
    setTiming(null);
    setDate(todayISO());
    setTime("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Przycisk odblokowuje się dopiero, gdy wszystko potrzebne jest wybrane.
  const ready =
    mode === "dostawa"
      ? address.trim().length > 4
      : mode === "odbior"
        ? timing === "teraz" || (timing === "zaplanuj" && !!date && !!time)
        : false;

  function confirm() {
    if (!ready || !mode) return;
    onConfirm(
      mode === "dostawa"
        ? { mode, address: address.trim() }
        : { mode, timing: timing ?? "teraz", date, time },
    );
  }


  // Blokada scrolla strony pod otwartym okienkiem.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-wegiel/85 p-0 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: silk }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Sposób odbioru zamówienia"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: silk }}
            layout
            className="max-h-[92svh] w-full overflow-y-auto border-t border-zloto/20 bg-sadza px-6 py-5 sm:max-w-lg sm:border sm:px-10 sm:py-7"
          >
            <h2 className="font-display text-2xl font-light leading-snug text-krem">
              Zanim rozpoczniesz zakupy, daj nam znać, jak chcesz otrzymać swoje
              zamówienie?
            </h2>

            <div className="mt-8 space-y-3">
              <Choice
                active={mode === "dostawa"}
                onClick={() => {
                  setMode("dostawa");
                  setTiming(null);
                }}
                title="Dostawa"
                meta={`za ${deliveryMinutes} minut`}
              />

              <AnimatePresence initial={false}>
                {mode === "dostawa" && (
                  <motion.div
                    key="addr"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease: silk }}
                    className="overflow-hidden"
                  >
                    <div className="pt-5">
                      <label
                        htmlFor="addr"
                        className="block text-[0.78rem] tracking-wide2 text-popiol/92"
                      >
                        Jaki jest Twój adres dostawy?
                      </label>
                      <input
                        id="addr"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Wpisz miasto, kod pocztowy, nazwę ulicy, numer domu"
                        className="mt-3 w-full border-0 border-b border-krem/20 bg-transparent px-0 py-3 text-[0.98rem] font-light text-krem placeholder:text-krem/45 focus:border-zar focus:outline-none"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Choice
                active={mode === "odbior"}
                onClick={() => setMode("odbior")}
                title="Odbiór"
                meta={`za ${pickupMinutes} minut`}
              />

              <AnimatePresence initial={false}>
                {mode === "odbior" && (
                  <motion.div
                    key="pickup"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease: silk }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 pt-5">
                      <Choice
                        small
                        active={timing === "teraz"}
                        onClick={() => setTiming("teraz")}
                        title="Natychmiast"
                      />
                      <Choice
                        small
                        active={timing === "zaplanuj"}
                        onClick={() => setTiming("zaplanuj")}
                        title="Zaplanuj na później"
                      />

                      <AnimatePresence initial={false}>
                        {timing === "zaplanuj" && (
                          <motion.div
                            key="plan"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.45, ease: silk }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4">
                              <p className="font-display text-lg font-light text-krem">
                                Zaplanuj swoje zamówienie
                              </p>

                              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                <div>
                                  <label
                                    htmlFor="date"
                                    className="block text-[0.74rem] tracking-wide2 text-popiol/92"
                                  >
                                    Data
                                  </label>
                                  <input
                                    id="date"
                                    type="date"
                                    min={todayISO()}
                                    value={date}
                                    onChange={(e) => {
                                      setDate(e.target.value);
                                      setTime("");
                                    }}
                                    className="mt-2 w-full border-0 border-b border-krem/20 bg-transparent px-0 py-3 text-[0.98rem] font-light text-krem [color-scheme:dark] focus:border-zar focus:outline-none"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="time"
                                    className="block text-[0.74rem] tracking-wide2 text-popiol/92"
                                  >
                                    Godzina
                                  </label>
                                  <select
                                    id="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="mt-2 w-full appearance-none border-0 border-b border-krem/20 bg-transparent px-0 py-3 text-[0.98rem] font-light text-krem focus:border-zar focus:outline-none"
                                  >
                                    <option value="" className="bg-sadza">
                                      Wybierz godzinę
                                    </option>
                                    {slots.map((s) => (
                                      <option key={s} value={s} className="bg-sadza">
                                        {s}
                                      </option>
                                    ))}
                                  </select>
                                  {slots.length === 0 && (
                                    <p className="mt-2 text-[0.78rem] text-zar">
                                      Na dziś nie ma już wolnych godzin. Wybierz
                                      kolejny dzień.
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-9 flex items-center gap-4">
              <button
                type="button"
                disabled={!ready}
                onClick={confirm}
                className="flex-1 btn-primary px-8 py-4 text-[0.8rem] tracking-wide2 text-krem disabled:cursor-not-allowed disabled:bg-krem/10 disabled:text-krem/50"
              >
                Kontynuuj
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-4 text-[0.78rem] tracking-wide2 text-krem/65 hover:text-krem"
              >
                Anuluj
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Choice({
  active,
  onClick,
  title,
  meta,
  small,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  meta?: string;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center justify-between gap-4 border px-5 text-left transition-colors duration-400 ${
        small ? "py-3.5" : "py-4.5"
      } ${
        active
          ? "border-zar bg-zar/10"
          : "border-krem/15 hover:border-krem/35"
      }`}
      style={small ? undefined : { paddingTop: "1.1rem", paddingBottom: "1.1rem" }}
    >
      <span className="flex items-center gap-3">
        <span
          className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
            active ? "border-zar" : "border-krem/30"
          }`}
        >
          {active && <span className="h-2 w-2 rounded-full bg-zar" />}
        </span>
        <span className={`font-light text-krem ${small ? "text-[0.95rem]" : "text-[1.05rem]"}`}>
          {title}
        </span>
      </span>
      {meta && <span className="text-[0.8rem] text-krem/65">{meta}</span>}
    </button>
  );
}
