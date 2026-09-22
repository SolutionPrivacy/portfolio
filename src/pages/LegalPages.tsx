import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import {
  legalSources,
  noticeData,
  privacySections,
  termsSections,
  type LegalSection,
} from "@/data/legal";

/**
 * Trzy strony prawne dzielą ten sam układ, więc powstają z jednego komponentu.
 * Animacja jest tu celowo oszczędna: jedno wejście na cały blok treści.
 */

function Sections({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <Reveal delay={0.15} duration={1.5} amount={0.05} className="mt-14 space-y-12">
      {sections.map((s) => (
        <section key={s.heading}>
          <h2 className="font-display text-xl font-light text-krem">{s.heading}</h2>
          <div className="mt-4 space-y-4">
            {s.body.map((p) => (
              <p
                key={p.slice(0, 30)}
                className="max-w-reading text-[0.95rem] font-light leading-[1.85] text-krem/78"
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}
    </Reveal>
  );
}

function SourceNote({ href }: { href: string }) {
  return (
    <Reveal delay={0.2} duration={1.5} amount={0.05} className="mt-16">
      <div className="border-l border-zar/60 pl-6">
        <p className="max-w-reading text-[0.9rem] font-light leading-relaxed text-krem/72">
          Powyższe streszcza najważniejsze zasady. Wersja wiążąca, obowiązująca przy
          zamówieniach składanych przez system online, dostępna jest u operatora
          systemu.
        </p>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-[0.82rem] tracking-wide2 text-zloto underline decoration-zloto/30 underline-offset-8 transition-colors duration-500 hover:decoration-zloto"
        >
          Otwórz pełny dokument
        </a>
      </div>
    </Reveal>
  );
}

export function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Dane osobowe"
      title="Polityka prywatności"
      lead="Co zbieramy, po co, jak długo trzymamy i co możesz z tym zrobić."
    >
      <Sections sections={privacySections} />
      <SourceNote href={legalSources.privacy} />
    </PageShell>
  );
}

export function TermsPage() {
  return (
    <PageShell
      eyebrow="Zasady"
      title="Regulamin"
      lead="Warunki składania zamówień, dostawy, płatności i reklamacji."
    >
      <Sections sections={termsSections} />
      <SourceNote href={legalSources.terms} />
    </PageShell>
  );
}

export function NoticePage() {
  const rows = [
    { label: "Firma", value: noticeData.company },
    { label: "Reprezentant", value: noticeData.representative },
    { label: "Adres", value: noticeData.address },
    { label: "Telefon", value: noticeData.phone },
    { label: "E-mail", value: noticeData.email },
    { label: "NIP", value: noticeData.vat },
    { label: "REGON", value: noticeData.regon },
  ];

  return (
    <PageShell
      eyebrow="Dane rejestrowe"
      title="Nota prawna"
      lead="Informacje o podmiocie prowadzącym Pizzerię Bona."
    >
      <Reveal delay={0.15} duration={1.5} amount={0.05} className="mt-14">
        <dl>
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex flex-col gap-1 border-b border-krem/10 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <dt className="text-[0.72rem] tracking-wide2 text-popiol/88">{r.label}</dt>
              <dd className="text-[0.98rem] font-light text-krem/90 sm:text-right">
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={0.2} duration={1.5} amount={0.05} className="mt-14">
        <div className="border-l border-zar/60 pl-6">
          <p className="max-w-reading text-[0.9rem] font-light leading-relaxed text-krem/72">
            Europejska platforma internetowego rozstrzygania sporów konsumenckich:
          </p>
          <a
            href={legalSources.odr}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block break-all text-[0.82rem] text-zloto underline decoration-zloto/30 underline-offset-8 hover:decoration-zloto"
          >
            ec.europa.eu/consumers/odr
          </a>
        </div>
      </Reveal>
    </PageShell>
  );
}
