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
};

export const backgrounds: readonly BackgroundLayer[] = [
  { src: "/zdjecia/lokal.jpg", alt: "Pizzeria Bona od ulicy Jana Pawła II", focus: "center 60%" },
  { src: "/zdjecia/sala-1.jpg", alt: "Sala restauracji — widok na bar", focus: "center" },
  { src: "/zdjecia/sala-2.jpg", alt: "Sala restauracji — strefa relaksu", focus: "center" },
] as const;

/** Zdjęcie używane jako duży kadr w sekcji o nas. */
export const heroPhoto = "/zdjecia/lokal.jpg";
