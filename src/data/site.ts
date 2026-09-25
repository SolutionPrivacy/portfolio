/**
 * WSZYSTKIE DANE RESTAURACJI W JEDNYM PLIKU.
 * Zmieniasz tu — zmienia się na całej stronie.
 */

export const site = {
  name: "Bona",
  legalName: 'Pizzeria "Bona" Agnieszka Nahkami',
  tagline: "Ciasto wyrabiamy co rano. Resztę robi piec.",
  city: "Sierpc",
  address: { street: "Jana Pawła II 1A", zip: "09-200", city: "Sierpc" },
  phone: "24 275 71 00",
  phoneHref: "tel:+48242757100",
  email: "r.nahkami@hotmail.com",
  nip: "1132243993",
  orderUrl: "https://pizzeriabona.order.app.hd.digital/menus",
  facebookUrl: "https://www.facebook.com/p/Pizzeria-Bona-Sierpc-100087435266183/",
  /** Rok założenia restauracji — uzupełnij, a pojawi się w sekcji „O nas”. */
  founded: undefined as number | undefined,
  coords: { lat: 52.852115, lng: 19.6647425 },
} as const;

/* ---------- GODZINY ---------- */

export const hours = [
  { days: "Poniedziałek — Piątek", time: "10:00 — 22:00" },
  { days: "Sobota — Niedziela", time: "12:00 — 22:00" },
] as const;

export const orderHours = [
  { label: "Zamówienia lokalne", time: "12:00 — 22:00" },
  { label: "Zamówienia internetowe (dostawa)", time: "12:00 — 21:30" },
  { label: "Zamówienia internetowe (odbiór osobisty)", time: "12:00 — 22:00" },
] as const;

/* ---------- INFORMACJE ---------- */

export const services = [
  "Dostawa",
  "Na wynos",
  "Miejsce na sali",
  "Ogródek — miejsca na zewnątrz",
  "Parking przy lokalu",
  "Klimatyzacja",
  "Bezpłatne Wi-Fi",
  "Dostęp dla wózków",
] as const;

export const payments = [
  "Gotówka",
  "Karta przy odbiorze",
  "Karta w restauracji",
  "Płatność zbliżeniowa",
  "Visa, Mastercard, Maestro",
] as const;

/* ---------- ALERGENY ---------- */

export const allergenList = [
  { name: "Gluten", desc: "Zboża zawierające gluten i produkty pochodne — ciasto do pizzy, bułki, tortille, pierogi, panierka." },
  { name: "Laktoza", desc: "Mleko i produkty mleczne — mozzarella, feta, śmietana, sosy na bazie mleka." },
  { name: "Jaja", desc: "Jaja i produkty pochodne — panierka, majonez, ciasto pierogowe." },
  { name: "Soja", desc: "Soja i produkty pochodne — wędliny, marynaty, sosy." },
  { name: "Seler", desc: "Seler i produkty pochodne — przyprawy, buliony, marynaty do mięs." },
  { name: "Gorczyca", desc: "Gorczyca i produkty pochodne — musztarda, sosy majonezowe." },
  { name: "Ryba", desc: "Ryby i produkty pochodne — tuńczyk, sosy rybne." },
  { name: "Siarczyny", desc: "Dwutlenek siarki i siarczyny powyżej 10 mg/kg — marynaty, produkty konserwowane." },
] as const;

export const allergenNote =
  "Dania przygotowujemy we wspólnej kuchni, więc nie możemy wykluczyć śladowych ilości innych alergenów. " +
  "Jeśli masz alergię, powiedz o tym przy zamówieniu — sprawdzimy skład konkretnego dania.";

/* ---------- MAPA ---------- */

export const mapEmbedSrc =
  `https://www.openstreetmap.org/export/embed.html?bbox=` +
  `${site.coords.lng - 0.006}%2C${site.coords.lat - 0.003}%2C` +
  `${site.coords.lng + 0.006}%2C${site.coords.lat + 0.003}` +
  `&layer=mapnik&marker=${site.coords.lat}%2C${site.coords.lng}`;

export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=Jana+Paw%C5%82a+II+1A,+09-200+Sierpc`;

/* ---------- NAWIGACJA ---------- */

export type NavItem = { label: string; href: string };

export const navItems: readonly NavItem[] = [
  { label: "O nas", href: "/#historia" },
  { label: "Karta", href: "/karta" },
  { label: "Godziny", href: "/godziny" },
  { label: "Informacje", href: "/informacje" },
  { label: "Alergeny", href: "/alergeny" },
  { label: "Rezerwacja", href: "/#rezerwacja" },
] as const;
