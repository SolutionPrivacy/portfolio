import { CrownMark } from "./Logo";

/**
 * Wstążka w prawym górnym rogu karty: przechylona o 45°, z koroną i napisem.
 * Delikatnie się kołysze, a po niej przebiega refleks (style: index.css → .ribbon-*).
 * Karta-rodzic musi mieć `relative overflow-hidden`.
 */
export function CornerRibbon({ label }: { label: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 top-0 h-32 w-32 overflow-hidden sm:h-44 sm:w-44"
    >
      <div className="ribbon-sway absolute right-[-48px] top-[24px] w-[190px] sm:right-[-60px] sm:top-[34px] sm:w-[250px]">
        <div className="ribbon-band relative flex items-center justify-center gap-2 overflow-hidden py-1.5 sm:gap-3 sm:py-2.5">
          <CrownMark id="rb" className="h-5 w-auto sm:h-7" />
          <span className="font-title text-[0.7rem] font-semibold tracking-[0.22em] text-[#FFF0B8] sm:text-[0.9rem]">
            {label}
          </span>
          <span className="ribbon-sheen absolute inset-y-0 left-0 w-1/3" />
        </div>
      </div>
    </div>
  );
}
