import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";

export default function NotFound() {
  return (
    <main className="flex min-h-[80svh] items-center pt-32">
      <div className="shell text-center">
        <Reveal>
          <p className="font-display text-[clamp(4rem,14vw,9rem)] font-light leading-none text-zloto/25">
            404
          </p>
          <h1 className="mt-6 font-display text-3xl font-light text-krem">
            Tej strony u nas nie ma
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[0.95rem] font-light leading-relaxed text-krem/72">
            Adres mógł się zmienić. Wróć na stronę główną albo zajrzyj prosto do
            karty.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              to="/"
              className="btn-ghost px-9 py-4 text-[0.78rem] tracking-wide2 text-zloto"
            >
              Strona główna
            </Link>
            <Link
              to="/karta"
              className="px-2 py-4 text-[0.78rem] tracking-wide2 text-krem/78 underline decoration-zloto/30 underline-offset-8 hover:text-krem"
            >
              Karta
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
