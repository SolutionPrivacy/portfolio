import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { mapLinkUrl, payments, services, site } from "@/data/site";

export default function InfoPage() {
  return (
    <PageShell
      eyebrow="Informacje"
      title="Wszystko o lokalu"
      lead="Gdzie nas znaleźć, czym płacisz i czego możesz się u nas spodziewać."
    >
      <Reveal delay={0.15} duration={1.6} amount={0.05} className="mt-14 space-y-12">
                  <h2 className="text-[0.72rem] tracking-wide2 text-popiol/88">Adres</h2>
          <p className="mt-4 font-display text-2xl font-light leading-snug text-krem">
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
          </p>
          <a
            href={mapLinkUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-[0.8rem] tracking-wide2 text-zloto underline decoration-zloto/30 underline-offset-8 hover:decoration-zloto"
          >
            Otwórz w mapach
          </a>

                  <h2 className="text-[0.72rem] tracking-wide2 text-popiol/88">Kontakt</h2>
          <div className="mt-4 space-y-2">
            <a
              href={site.phoneHref}
              className="block font-display text-2xl font-light text-krem transition-colors duration-500 hover:text-zloto"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="block text-[0.95rem] font-light text-krem/78 transition-colors duration-500 hover:text-krem"
            >
              {site.email}
            </a>
          </div>

                  <h2 className="text-[0.72rem] tracking-wide2 text-popiol/88">
            Co u nas znajdziesz
          </h2>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {services.map((s) => (
              <li
                key={s}
                className="flex items-baseline gap-3 border-b border-krem/10 pb-3 text-[0.95rem] font-light text-krem/85"
              >
                <span aria-hidden className="h-1 w-1 shrink-0 bg-zar" />
                {s}
              </li>
            ))}
          </ul>

                  <h2 className="text-[0.72rem] tracking-wide2 text-popiol/88">
            Sposoby płatności
          </h2>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {payments.map((p) => (
              <li
                key={p}
                className="flex items-baseline gap-3 border-b border-krem/10 pb-3 text-[0.95rem] font-light text-krem/85"
              >
                <span aria-hidden className="h-1 w-1 shrink-0 bg-zloto" />
                {p}
              </li>
            ))}
          </ul>

                  <h2 className="text-[0.72rem] tracking-wide2 text-popiol/88">Firma</h2>
          <p className="mt-4 text-[0.95rem] font-light leading-relaxed text-krem/78">
            {site.legalName}
            <br />
            {site.address.street}, {site.address.zip} {site.address.city}
            <br />
            NIP {site.nip}
          </p>
      </Reveal>
    </PageShell>
  );
}
