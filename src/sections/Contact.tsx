import { Link } from "react-router-dom";
import { Reveal, RevealItem, Stagger } from "@/components/Reveal";
import { hours, mapEmbedSrc, mapLinkUrl, site } from "@/data/site";

export function Contact() {
  return (
    <section id="kontakt" className="relative py-28 sm:py-40">
      <div className="shell">
        <div className="glass px-6 py-16 sm:px-12 sm:py-20">
          <Reveal className="max-w-xl">
            <p className="text-[0.7rem] tracking-wide3 text-zar">Kontakt</p>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,5.5vw,3.8rem)] font-light leading-tight text-krem">
              Znajdziesz nas w centrum
            </h2>
            <div className="mt-9 h-px w-16 bg-zloto/50" />
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Stagger className="space-y-11 lg:col-span-5" step={0.1}>
              <RevealItem>
                <h3 className="text-[0.72rem] tracking-wide2 text-popiol/88">Adres</h3>
                <p className="mt-4 font-display text-2xl font-light leading-snug text-krem">
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </p>
                <a
                  href={mapLinkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-[0.8rem] tracking-wide2 text-zloto underline decoration-zloto/30 underline-offset-8 transition-colors duration-500 hover:decoration-zloto"
                >
                  Wyznacz trasę
                </a>
              </RevealItem>

              <RevealItem>
                <h3 className="text-[0.72rem] tracking-wide2 text-popiol/88">Godziny</h3>
                <dl className="mt-4 space-y-3">
                  {hours.map((h) => (
                    <div
                      key={h.days}
                      className="flex justify-between gap-6 border-b border-krem/10 pb-3"
                    >
                      <dt className="text-[0.95rem] font-light text-krem/85">{h.days}</dt>
                      <dd className="font-display text-lg font-light text-krem">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  to="/godziny"
                  className="mt-4 inline-block text-[0.8rem] tracking-wide2 text-zloto underline decoration-zloto/30 underline-offset-8 hover:decoration-zloto"
                >
                  Godziny zamówień online
                </Link>
              </RevealItem>

              <RevealItem>
                <h3 className="text-[0.72rem] tracking-wide2 text-popiol/88">
                  Rezerwacje i zamówienia
                </h3>
                <div className="mt-4 space-y-2">
                  <a
                    href={site.phoneHref}
                    className="block font-display text-2xl font-light text-krem transition-colors duration-500 hover:text-zloto"
                  >
                    {site.phone}
                  </a>
                  <Link
                    to="/karta"
                    className="block text-[0.95rem] font-light text-krem/78 transition-colors duration-500 hover:text-krem"
                  >
                    Zamów z dostawą lub na odbiór
                  </Link>
                  <a
                    href={site.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-[0.95rem] font-light text-krem/78 transition-colors duration-500 hover:text-krem"
                  >
                    Facebook
                  </a>
                </div>
              </RevealItem>
            </Stagger>

            <Reveal direction="right" duration={1.2} className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-krem/10 lg:aspect-[16/12]">
                <iframe
                  title={`Mapa — ${site.legalName}`}
                  src={mapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full grayscale-[0.35] contrast-[1.05] invert-[0.92] hue-rotate-180"
                />
              </div>
              <p className="mt-4 text-[0.78rem] font-light text-krem/60">
                Parking przy Jana Pawła II, kilkadziesiąt metrów od wejścia. Lokal
                dostępny dla wózków.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
