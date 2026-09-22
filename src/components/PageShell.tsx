import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

type PageShellProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
  /** Szerokość panelu — karta jest szersza niż strona z informacjami. */
  wide?: boolean;
};

/** Wspólny układ podstron, żeby wszystkie wyglądały tak samo. */
export function PageShell({ eyebrow, title, lead, children, wide }: PageShellProps) {
  return (
    <main className="pb-24 pt-32 sm:pt-40">
      <div className="shell">
        <div
          className={`glass mx-auto px-6 py-14 sm:px-12 sm:py-20 ${
            wide ? "max-w-5xl" : "max-w-3xl"
          }`}
        >
          <Reveal className="text-center">
            <p className="text-[0.7rem] tracking-wide3 text-zar">{eyebrow}</p>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,6.5vw,4.4rem)] font-light leading-none text-krem">
              {title}
            </h1>
            {lead && (
              <p className="mx-auto mt-7 max-w-reading text-[0.98rem] font-light leading-[1.85] text-krem/72">
                {lead}
              </p>
            )}
            <div className="mx-auto mt-9 h-px w-16 bg-zloto/50" />
          </Reveal>

          {children}

          <Reveal className="mt-20 text-center">
            <div className="hairline" />
            <Link
              to="/"
              className="mt-10 inline-block text-[0.78rem] tracking-wide2 text-krem/72 underline decoration-zloto/30 underline-offset-8 transition-colors duration-500 hover:text-krem hover:decoration-zloto"
            >
              Wróć na stronę główną
            </Link>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
