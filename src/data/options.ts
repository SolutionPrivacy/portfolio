/**
 * Dodatki wybierane przy zamawianiu — odwzorowane z systemu zamówień Bony.
 *
 * Reguła: pizza ma do wyboru spód, wszystko ciepłe ma sosy,
 * każde zamówienie ma opakowanie. Jeśli w kuchni jest inaczej,
 * zmień `optionsForCategory` na dole pliku.
 */

export type Option = { id: string; label: string; price: number };

export type OptionGroup = {
  id: string;
  title: string;
  required: boolean;
  /** `single` = wybierasz jedno, `multi` = ile chcesz. */
  mode: "single" | "multi";
  options: Option[];
};

const spod: OptionGroup = {
  id: "spod",
  title: "Spód",
  required: true,
  mode: "single",
  options: [
    { id: "puszysty", label: "Puszysty", price: 0 },
    { id: "cienki", label: "Cienki", price: 0 },
  ],
};

const sosy: OptionGroup = {
  id: "sos",
  title: "Sos",
  required: false,
  mode: "multi",
  options: [
    { id: "pomidorowy", label: "Pomidorowy", price: 3 },
    { id: "czosnkowo-koperkowy", label: "Czosnkowo-koperkowy", price: 3 },
    { id: "majonezowy-a", label: "Majonezowy (alergeny 3, 10)", price: 3 },
    { id: "arabski-lagodny", label: "Arabski łagodny", price: 3 },
    { id: "arabski-ostry", label: "Arabski ostry", price: 3 },
    { id: "meksykanski", label: "Meksykański", price: 3 },
    { id: "1000wysp", label: "1000 wysp", price: 3 },
    { id: "ketchup", label: "Ketchup", price: 3 },
    { id: "majonezowy", label: "Majonezowy", price: 3 },
  ],
};

const opakowanie: OptionGroup = {
  id: "opakowanie",
  title: "Opakowanie",
  required: true,
  mode: "single",
  options: [{ id: "opakowanie", label: "Opakowanie", price: 2 }],
};

/** Które grupy pokazać dla danej kategorii karty. */
export function optionsForCategory(categoryId: string): OptionGroup[] {
  switch (categoryId) {
    case "pizza":
      return [spod, sosy, opakowanie];
    case "kebaby":
    case "obiady":
    case "pierogi":
      return [sosy, opakowanie];
    case "zupy":
    case "desery":
      return [opakowanie];
    case "napoje":
      return [];
    default:
      return [opakowanie];
  }
}

export const deliveryMinutes = 60;
export const pickupMinutes = 30;

/** Kody rabatowe — dopisz własne albo skasuj, żeby wyłączyć. */
export const discountCodes: Record<string, { label: string; percent: number }> = {
  BONA10: { label: "Rabat 10%", percent: 10 },
  SIERPC5: { label: "Rabat 5%", percent: 5 },
};
