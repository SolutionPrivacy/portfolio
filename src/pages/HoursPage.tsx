import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { hours, orderHours, site } from "@/data/site";

export default function HoursPage() {
  return (
    <PageShell
      eyebrow="Godziny"
      title="Godziny otwarcia"
      lead="Kuchnia pracuje przez cały czas otwarcia. Ostatnie zamówienia z dostawą przyjmujemy o 21:30."
    >
      <Reveal delay={0.15} duration={1.6} amount={0.05} className="mt-14 space-y-12">
                  <h2 className="text-[0.72rem] tracking-wide2 text-popiol/88">
            Restauracja
          </h2>
          <dl className="mt-5">
            {hours.map((h) => (
              <div
                key={h.days}
                className="flex items-baseline justify-between gap-6 border-b border-krem/10 py-4"
              >
                <dt className="text-[1rem] font-light text-krem/88">{h.days}</dt>
                <dd className="font-display text-xl font-light text-krem">{h.time}</dd>
              </div>
            ))}
          </dl>

                  <h2 className="text-[0.72rem] tracking-wide2 text-popiol/88">
            Restauracja otwarta do godz.
          </h2>
          <dl className="mt-5">
            {orderHours.map((o) => (
              <div
                key={o.label}
                className="flex items-baseline justify-between gap-6 border-b border-krem/10 py-4"
              >
                <dt className="text-[1rem] font-light text-krem/88">{o.label}</dt>
                <dd className="font-display text-xl font-light text-zloto">{o.time}</dd>
              </div>
            ))}
          </dl>

                  <div className="border-l border-zar/60 pl-6">
            <p className="text-[0.95rem] font-light leading-relaxed text-krem/78">
              W święta i dni wolne godziny mogą się zmieniać. Najszybciej sprawdzisz
              telefonicznie pod{" "}
              <a
                href={site.phoneHref}
                className="text-zloto underline decoration-zloto/30 underline-offset-4"
              >
                {site.phone}
              </a>{" "}
              albo na naszym Facebooku.
            </p>
          </div>

                  <Link
            to="/karta"
            className="inline-block btn-primary px-9 py-4 text-[0.78rem] tracking-wide2 text-krem"
          >
            Zamów online
          </Link>
      </Reveal>
    </PageShell>
  );
}
