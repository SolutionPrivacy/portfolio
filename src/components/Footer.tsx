import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { site } from "@/data/site";

const links = [
  { label: "Karta", to: "/karta" },
  { label: "Godziny", to: "/godziny" },
  { label: "Informacje", to: "/informacje" },
  { label: "Alergeny", to: "/alergeny" },
  { label: "Regulamin", to: "/regulamin" },
  { label: "Polityka prywatności", to: "/polityka-prywatnosci" },
  { label: "Nota prawna", to: "/nota-prawna" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-wegiel/95 pb-10 pt-10 backdrop-blur-sm">
      <div className="shell">
        <div className="hairline" />

        <Reveal className="mt-14" amount={0.2}>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-4xl font-light tracking-wide2 text-krem">
                Bona
              </p>
              <p className="mt-4 max-w-xs text-[0.9rem] font-light leading-relaxed text-krem/65">
                {site.address.street}, {site.address.zip} {site.address.city}
              </p>
              <a
                href={site.phoneHref}
                className="mt-3 inline-block text-[0.9rem] text-zloto transition-colors duration-500 hover:text-zar"
              >
                {site.phone}
              </a>
            </div>

            <nav className="flex flex-wrap gap-x-8 gap-y-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-[0.8rem] tracking-wide2 text-krem/72 transition-colors duration-500 hover:text-krem"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[0.8rem] tracking-wide2 text-krem/72 transition-colors duration-500 hover:text-krem"
              >
                Facebook
              </a>
            </nav>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-3 border-t border-krem/10 pt-8 text-[0.75rem] font-light text-krem/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {year} {site.legalName} · NIP {site.nip}
          </p>
          <p>Ceny zawierają podatek VAT.</p>
        </div>
      </div>
    </footer>
  );
}
