# Bona — strona Pizzerii Bona w Sierpcu

React + TypeScript + Tailwind + Motion.

## Pierwsze uruchomienie

```bash
npm install
npm run dev      # http://localhost:5173
```

To wystarczy zrobić raz. Potem — tylko:

```bash
npm run dev
```

Żeby zatrzymać: `Ctrl + C` w oknie terminala.

## Co gdzie zmieniasz

| Chcę zmienić | Plik |
|---|---|
| Cenę dania, opis, alergeny | `src/data/menu.ts` |
| Spód, sosy, opakowanie — ceny dodatków | `src/data/options.ts` |
| Adres, telefon, godziny, usługi, płatności | `src/data/site.ts` |
| Zdjęcia w tle | `src/data/images.ts` + pliki w `public/zdjecia/` |
| Regulamin / politykę prywatności | `src/data/legal.ts` |

### Przykład: zmiana ceny
Otwórz `src/data/menu.ts`, znajdź danie, popraw liczbę przy `price`.

### Przykład: nowe zdjęcie w tle
1. Wrzuć plik do `public/zdjecia/`
2. Dopisz linijkę w `src/data/images.ts`

## Struktura projektu

```
src/
  components/   – powtarzalne kawałki UI (nawigacja, stopka, koszyk, modale)
  sections/     – bloki strony głównej (Hero, Menu, Rezerwacja, Kontakt)
  pages/        – osobne podstrony (Karta, Godziny, Informacje, Alergeny, Kasa)
  data/         – WSZYSTKIE dane strony — to tu wchodzisz najczęściej
  cart/         – logika koszyka
```

## Ścieżka zamówienia

1. Klient klika **+** przy daniu w karcie
2. Wybiera dostawę (adres) albo odbiór (teraz / zaplanuj na później)
3. Wybiera spód, sosy, opakowanie — zależnie od dania
4. Pasek koszyka widoczny cały czas na dole
5. Kasa: dane kontaktowe, metoda płatności, kod rabatowy, zgoda na regulamin

**Zamówienie nigdzie nie jest wysyłane** — to front, nie ma backendu.
Żeby zamówienia realnie trafiały do restauracji, trzeba podpiąć system
zamówień albo prosty serwer wysyłający maila. Płatność jest przy
odbiorze, więc bramka płatnicza niepotrzebna.

## Podstrony

`/` · `/karta` · `/godziny` · `/informacje` · `/alergeny` · `/kasa` ·
`/regulamin` · `/polityka-prywatnosci` · `/nota-prawna`

## Design

Paleta: `wegiel` #0B0908 (tło) · `ziemia` #241B16 · `zar` #C8531B (akcent) ·
`zloto` #D9A441 · `krem` #F4EAD9 (tekst) · `popiol` #9A8B7A (tekst wyciszony)

Kroje: **Fraunces** (nagłówki) + **Jost** (reszta). Ustawienia w `tailwind.config.js`.

## Wdrożenie (Vercel)

1. Wrzuć folder na GitHub
2. W [vercel.com](https://vercel.com) → "Add New Project" → wybierz repo
3. Framework: Vite, Build: `npm run build`, Output: `dist`
4. Deploy

`vercel.json` już jest skonfigurowany pod routing SPA.

## Do zrobienia przed uruchomieniem produkcyjnym

- [ ] Regulamin i Politykę prywatności (`src/data/legal.ts`) dać do
      sprawdzenia prawnikowi — są napisane własnymi słowami, nie są
      kopią żadnego gotowego dokumentu
- [ ] Podpiąć realne wysyłanie zamówień (obecnie front bez backendu)
- [ ] Sprawdzić brakujące kategorie w karcie (dania z drobiu, z wieprzowiny,
      mieszane, kubły z kurczakiem, surówki, dodatki) — nie były dostępne
      w źródle podczas budowy karty
