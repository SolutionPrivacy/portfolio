/**
 * ZDJĘCIA TŁA — przewijają się przez całą stronę.
 * Pliki leżą w folderze `public/zdjecia/`.
 *
 * ŻEBY DODAĆ WŁASNE: wrzuć plik do public/zdjecia/ i dopisz tu linijkę.
 * Kolejność = kolejność pojawiania się przy przewijaniu.
 */

export type BackgroundLayer = {
  src: string;
  alt: string;
  focus?: string;
  /** Mnożnik jasności zdjęcia (1 = bez zmian, 0.7 = o 30% ciemniejsze). */
  brightness?: number;
  /** Siła ciemnej winiety dookoła kadru (0–1). */
  vignette?: number;
};

export const backgrounds: readonly BackgroundLayer[] = [
  { src: "/zdjecia/sala-2.jpg", alt: "Sala restauracji — strefa relaksu", focus: "center" },
  {
    src: "/zdjecia/lokal.jpg",
    alt: "Pizzeria Bona od ulicy Jana Pawła II",
    focus: "center 60%",
    brightness: 0.7,
    vignette: 0.85,
  },
  { src: "/zdjecia/sala-1.jpg", alt: "Sala restauracji — widok na bar", focus: "center" },
] as const;

/** Zdjęcie używane jako duży kadr w sekcji o nas. */
export const heroPhoto = "/zdjecia/lokal.jpg";
