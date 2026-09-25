import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { silk } from "@/components/Reveal";
import { formatPrice, type Dish } from "@/data/menu";
import { optionsForCategory } from "@/data/options";

export type PendingDish = { dish: Dish; categoryId: string };

type Props = {
  pending: PendingDish | null;
  onClose: () => void;
  onAdd: (dish: Dish, extras: { label: string; price: number }[]) => void;
};

export function ProductModal({ pending, onClose, onAdd }: Props) {
  const groups = useMemo(
    () => (pending ? optionsForCategory(pending.categoryId) : []),
    [pending],
  );
  const [picked, setPicked] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!pending) return;
    // Opakowanie jest wymagane i jest tylko jedno — zaznaczamy od razu.
    const start: Record<string, string[]> = {};
    for (const g of groups) {
      if (g.required && g.options.length === 1) start[g.id] = [g.options[0].id];
    }
    setPicked(start);
  }, [pending, groups]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function toggle(groupId: string, optionId: string, mode: "single" | "multi") {
    setPicked((prev) => {
      const current = prev[groupId] ?? [];
      if (mode === "single") {
        return { ...prev, [groupId]: current[0] === optionId ? [] : [optionId] };
      }
      return {
        ...prev,
        [groupId]: current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  }

  const extras = useMemo(() => {
    const list: { label: string; price: number }[] = [];
    for (const g of groups) {
      for (const id of picked[g.id] ?? []) {
        const opt = g.options.find((o) => o.id === id);
        if (opt) list.push({ label: opt.label, price: opt.price });
      }
    }
    return list;
  }, [groups, picked]);

  const ready = groups
    .filter((g) => g.required)
    .every((g) => (picked[g.id] ?? []).length > 0);

  const total = pending
    ? pending.dish.price + extras.reduce((s, e) => s + e.price, 0)
    : 0;


  // Blokada scrolla strony pod otwartym okienkiem.
  useEffect(() => {
    if (!pending) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [pending]);
  return createPortal(
    <AnimatePresence>
      {pending && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-wegiel/85 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: silk }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Dodatki — ${pending.dish.name}`}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: silk }}
            className="flex max-h-[92svh] w-full flex-col border-t border-zloto/20 bg-sadza sm:max-w-lg sm:border"
          >
            <div className="border-b border-krem/10 px-6 py-7 sm:px-10">
              <h2 className="font-display text-2xl font-light text-krem">
                {pending.dish.name}
              </h2>
              {pending.dish.description && (
                <p className="mt-2 text-[0.9rem] font-light leading-relaxed text-krem/65">
                  {pending.dish.description}
                </p>
              )}
              <p className="mt-3 font-display text-lg text-zloto">
                {formatPrice(pending.dish.price)}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-10">
              {groups.length === 0 && (
                <p className="text-[0.95rem] font-light text-krem/68">
                  Ta pozycja nie ma dodatków do wyboru.
                </p>
              )}

              <div className="space-y-9">
                {groups.map((g) => (
                  <div key={g.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg font-light text-krem">
                        {g.title}
                      </h3>
                      {g.required && (
                        <span className="text-[0.7rem] tracking-wide2 text-zar">
                          Wymagane
                        </span>
                      )}
                    </div>

                    <ul className="mt-4 space-y-1.5">
                      {g.options.map((o) => {
                        const active = (picked[g.id] ?? []).includes(o.id);
                        return (
                          <li key={o.id}>
                            <button
                              type="button"
                              onClick={() => toggle(g.id, o.id, g.mode)}
                              aria-pressed={active}
                              className={`flex w-full items-center justify-between gap-4 border px-4 py-3 text-left transition-colors duration-350 ${
                                active
                                  ? "border-zar bg-zar/10"
                                  : "border-krem/12 hover:border-krem/30"
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <span
                                  className={`grid h-4 w-4 shrink-0 place-items-center border transition-colors duration-300 ${
                                    g.mode === "single" ? "rounded-full" : ""
                                  } ${active ? "border-zar" : "border-krem/30"}`}
                                >
                                  {active && (
                                    <span
                                      className={`h-2 w-2 bg-zar ${
                                        g.mode === "single" ? "rounded-full" : ""
                                      }`}
                                    />
                                  )}
                                </span>
                                <span className="text-[0.95rem] font-light text-krem/92">
                                  {o.label}
                                </span>
                              </span>
                              <span className="text-[0.85rem] text-krem/65">
                                {formatPrice(o.price)}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-krem/10 px-6 py-6 sm:px-10">
              <button
                type="button"
                disabled={!ready}
                onClick={() => {
                  onAdd(pending.dish, extras);
                  onClose();
                }}
                className="flex w-full items-center justify-between gap-4 btn-primary px-7 py-4 text-[0.82rem] tracking-wide2 text-krem disabled:cursor-not-allowed disabled:bg-krem/10 disabled:text-krem/50"
              >
                <span>Dodaj do koszyka</span>
                <span className="font-display text-base">{formatPrice(total)}</span>
              </button>
              {!ready && (
                <p className="mt-3 text-center text-[0.78rem] text-krem/55">
                  Wybierz wymagane opcje, żeby kontynuować
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
