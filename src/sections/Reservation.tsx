import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal, RevealItem, Stagger, silk } from "@/components/Reveal";
import { site } from "@/data/site";

type Form = {
  name: string;
  date: string;
  time: string;
  guests: string;
  phone: string;
  notes: string;
};

const empty: Form = {
  name: "",
  date: "",
  time: "19:00",
  guests: "2",
  phone: "",
  notes: "",
};

type Status = "idle" | "sending" | "sent" | "error";

export function Reservation() {
  const [form, setForm] = useState<Form>(empty);
  const [status, setStatus] = useState<Status>("idle");
  const reduce = useReducedMotion();

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      // TODO: podepnij własny endpoint (np. /api/rezerwacja, Formspree, Resend).
      const response = await fetch("/api/rezerwacja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm(empty);
    } catch {
      // Dopóki nie ma backendu, formularz nie gubi rezerwacji —
      // kieruje gościa do telefonu.
      setStatus("error");
    }
  }

  return (
    <section id="rezerwacja" className="relative py-8 sm:py-12">
      <div className="shell">
        <div className="glass grid gap-14 px-6 py-12 sm:px-12 sm:py-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[0.7rem] tracking-wide3 text-zar">Rezerwacja</p>
              <h2 className="mt-7 font-display text-[clamp(2.4rem,6vw,4rem)] font-light leading-tight text-krem">
                Zostaw nam stolik
                <span className="block italic text-zloto">do przygotowania</span>
              </h2>
              <div className="mt-10 h-px w-16 bg-zloto/50" />
              <p className="mt-10 max-w-reading text-[0.98rem] font-light leading-[1.85] text-krem/78">
                Wystarczy kilka danych. Potwierdzamy telefonicznie tego samego
                dnia. Większe grupy i imprezy okolicznościowe prosimy zgłaszać
                z co najmniej dwudniowym wyprzedzeniem.
              </p>
              <a
                href={site.phoneHref}
                className="mt-8 inline-block font-display text-2xl font-light text-zloto underline decoration-zloto/30 underline-offset-8 transition-colors duration-700 hover:decoration-zloto"
              >
                {site.phone}
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: silk }}
                  className="flex min-h-[420px] flex-col items-start justify-center border border-zloto/25 p-10 sm:p-14"
                >
                  <h3 className="font-display text-3xl font-light text-krem">
                    Mamy zgłoszenie
                  </h3>
                  <p className="mt-5 max-w-reading text-[0.98rem] font-light leading-relaxed text-krem/78">
                    Oddzwonimy, żeby potwierdzić godzinę. Jeśli coś się zmieni,
                    wystarczy telefon pod {site.phone}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-10 text-[0.78rem] tracking-wide2 text-zloto underline decoration-zloto/40 underline-offset-8"
                  >
                    Zarezerwuj kolejny stolik
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: silk }}
                  noValidate
                >
                  <Stagger className="grid gap-x-8 gap-y-2 sm:grid-cols-2" step={0.08}>
                    <RevealItem className="sm:col-span-2">
                      <Field
                        id="name"
                        label="Imię i nazwisko"
                        value={form.name}
                        onChange={(v) => set("name", v)}
                        required
                        autoComplete="name"
                      />
                    </RevealItem>

                    <RevealItem>
                      <Field
                        id="date"
                        label="Data"
                        type="date"
                        min={today}
                        value={form.date}
                        onChange={(v) => set("date", v)}
                        required
                      />
                    </RevealItem>

                    <RevealItem>
                      <Field
                        id="time"
                        label="Godzina"
                        type="time"
                        min="10:00"
                        max="21:30"
                        value={form.time}
                        onChange={(v) => set("time", v)}
                        required
                      />
                    </RevealItem>

                    <RevealItem>
                      <SelectField
                        id="guests"
                        label="Liczba osób"
                        value={form.guests}
                        onChange={(v) => set("guests", v)}
                      />
                    </RevealItem>

                    <RevealItem>
                      <Field
                        id="phone"
                        label="Telefon"
                        type="tel"
                        inputMode="tel"
                        placeholder="600 000 000"
                        value={form.phone}
                        onChange={(v) => set("phone", v)}
                        required
                        autoComplete="tel"
                      />
                    </RevealItem>

                    <RevealItem className="sm:col-span-2">
                      <Field
                        id="notes"
                        label="Uwagi"
                        placeholder="Alergie, krzesełko dla dziecka, stolik przy oknie…"
                        value={form.notes}
                        onChange={(v) => set("notes", v)}
                        textarea
                      />
                    </RevealItem>

                    <RevealItem className="mt-10 sm:col-span-2">
                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        whileHover={reduce ? undefined : { y: -2 }}
                        whileTap={reduce ? undefined : { y: 0, scale: 0.99 }}
                        transition={{ duration: 0.4, ease: silk }}
                        className="w-full btn-primary px-10 py-5 text-[0.8rem] tracking-wide2 text-krem disabled:opacity-50 sm:w-auto"
                      >
                        {status === "sending" ? "Wysyłamy…" : "Wyślij rezerwację"}
                      </motion.button>
                    </RevealItem>
                  </Stagger>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: silk }}
                        className="mt-8 border-l border-zloto/50 pl-5 text-[0.9rem] font-light leading-relaxed text-krem/85"
                      >
                        Nie udało się wysłać formularza. Zadzwoń pod{" "}
                        <a
                          href={site.phoneHref}
                          className="text-zloto underline underline-offset-4"
                        >
                          {site.phone}
                        </a>{" "}
                        — zapiszemy rezerwację od ręki.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- pola formularza ---------- */

const fieldBase =
  "w-full border-0 border-b border-krem/20 bg-transparent px-0 py-4 text-[1.02rem] font-light text-krem placeholder:text-krem/45 focus:border-zloto focus:outline-none focus:ring-0";

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  min?: string;
  max?: string;
  inputMode?: "tel" | "text" | "numeric";
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  textarea,
  min,
  max,
  inputMode,
  autoComplete,
}: FieldProps) {
  return (
    <div className="py-4">
      <label
        htmlFor={id}
        className="block text-[0.72rem] tracking-wide2 text-popiol/88"
      >
        {label}
        {required && <span className="ml-1 text-zloto/70">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldBase} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          min={min}
          max={max}
          required={required}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldBase} [color-scheme:dark]`}
        />
      )}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="py-4">
      <label
        htmlFor={id}
        className="block text-[0.72rem] tracking-wide2 text-popiol/88"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldBase} appearance-none`}
      >
        {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
          <option key={n} value={n} className="bg-ziemia">
            {n} {Number(n) === 1 ? "osoba" : Number(n) < 5 ? "osoby" : "osób"}
          </option>
        ))}
        <option value="10+" className="bg-ziemia">
          Więcej niż 10 osób
        </option>
      </select>
    </div>
  );
}
