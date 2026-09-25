import { Parallax } from "@/components/Parallax";
import { site } from "@/data/site";
import { Reveal, RevealItem, Stagger } from "@/components/Reveal";

/** Opis pochodzi z oficjalnej strony Pizzerii Bona. */
const paragraphs = [
  "Pizzeria Bona w Sierpcu to urokliwe miejsce, które zachwyca zarówno miłośników pizzy, jak i tych, którzy poszukują smaku domowych obiadów. Nasza restauracja łączy w sobie przytulną atmosferę z wyjątkowym smakiem potraw, które przygotowujemy z pasją i starannością.",
  "W ofercie Pizzerii Bona znajdziesz bogaty wybór pizzy – od klasycznych, takich jak Margherita czy Pepperoni, po unikatowe kompozycje, które zaskoczą Twoje kubki smakowe. Nasze ciasto jest przygotowywane na miejscu, co gwarantuje świeżość i doskonałą jakość.",
  "Oprócz tego, w menu znajdziesz również pyszne obiady domowe, które przypomną Ci smaki dzieciństwa. Oferujemy szeroki wybór dań mięsnych, wegetariańskich oraz opcje dla dzieci, dzięki czemu każdy znajdzie coś dla siebie.",
  "Pizzeria Bona to idealne miejsce na rodzinny obiad, spotkanie z przyjaciółmi czy romantyczną kolację. Dodatkowo, oferujemy możliwość zamówienia potraw na wynos, dzięki czemu możesz cieszyć się naszymi smakołykami w zaciszu własnego domu.",
  "Serdecznie zapraszamy do Pizzerii Bona w Sierpcu – tutaj smak i jakość idą w parze!",
];

export function Story() {
  return (
    <section id="historia" className="relative py-28 sm:py-40">
      <div className="shell">
        <Parallax distance={40}>
        <div className="glass mx-auto max-w-4xl px-7 py-16 sm:px-14 sm:py-20">
          <Reveal>
            <p className="text-[0.7rem] tracking-wide3 text-zar">O nas</p>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,5.5vw,3.8rem)] font-light leading-[1.05] text-krem">
              Pizzeria Bona
              <span className="block italic text-zloto">w Sierpcu</span>
            </h2>
            <div className="mt-9 h-px w-16 bg-zloto/50" />
          </Reveal>

          <Stagger className="mt-11 space-y-6" step={0.12}>
            {paragraphs.map((text) => (
              <RevealItem key={text.slice(0, 22)}>
                <p className="max-w-reading text-[1rem] font-light leading-[1.85] text-krem/85">
                  {text}
                </p>
              </RevealItem>
            ))}
          </Stagger>

          <Reveal delay={0.15} className="mt-14">
            <div className="flex flex-wrap gap-x-14 gap-y-8 border-t border-krem/10 pt-10">
              {site.founded && <Stat value={String(site.founded)} label="Rok założenia" />}
              <Stat value="4,1 / 5" label="Średnia ocena w Google" />
              <Stat value="900+" label="Opinii w sieci" />
            </div>
          </Reveal>
        </div>
        </Parallax>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-light text-zloto">{value}</p>
      <p className="mt-2 text-[0.72rem] tracking-wide2 text-popiol/88">{label}</p>
    </div>
  );
}
