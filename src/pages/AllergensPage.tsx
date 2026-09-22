import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { allergenList, allergenNote, site } from "@/data/site";

export default function AllergensPage() {
  return (
    <PageShell
      eyebrow="Alergeny"
      title="Co jest w daniu"
      lead="Przy każdej pozycji w pełnej karcie widnieją skróty alergenów. Tutaj znajdziesz ich znaczenie."
    >
      <Reveal delay={0.15} duration={1.6} amount={0.05} className="mt-14">
        {allergenList.map((a) => (
                      <div className="border-b border-krem/10 py-6">
              <h2 className="font-display text-xl font-light text-krem">{a.name}</h2>
              <p className="mt-2 max-w-reading text-[0.92rem] font-light leading-relaxed text-krem/68">
                {a.desc}
              </p>
            </div>
        ))}
      </Reveal>

      <Reveal delay={0.2} duration={1.6} amount={0.05} className="mt-14">
        <div className="border-l border-zar/60 pl-6">
          <p className="max-w-reading text-[0.95rem] font-light leading-relaxed text-krem/82">
            {allergenNote}
          </p>
          <a
            href={site.phoneHref}
            className="mt-4 inline-block text-[0.85rem] tracking-wide2 text-zloto underline decoration-zloto/30 underline-offset-8 hover:decoration-zloto"
          >
            {site.phone}
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.25} duration={1.6} amount={0.05} className="mt-12">
        <Link
          to="/karta"
          className="inline-block border border-zloto/45 px-9 py-4 text-[0.78rem] tracking-wide2 text-zloto transition-colors duration-500 hover:border-zloto hover:bg-zloto/10"
        >
          Zobacz pełną kartę
        </Link>
      </Reveal>
    </PageShell>
  );
}
