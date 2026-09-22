export type Dish = {
  name: string;
  description?: string;
  price: number;
  /** Gramatura, pojemność, liczba sztuk. */
  note?: string;
  /** Alergeny wg oznaczeń z karty online. */
  allergens?: string[];
};

export type MenuCategory = {
  id: string;
  title: string;
  intro: string;
  dishes: Dish[];
};

/**
 * ŹRÓDŁO: karta online Pizzerii Bona (pizzeriabona.order.app.hd.digital).
 * Ceny i składy przepisane 1:1.
 *
 * ŻEBY ZMIENIĆ CENĘ — znajdź danie i popraw liczbę przy `price`.
 * ŻEBY DODAĆ DANIE — skopiuj jedną linijkę { name: ..., price: ... } i zmień.
 * ŻEBY USUNĄĆ — skasuj całą linijkę razem z nawiasami { }.
 *
 * NIE MA JESZCZE (dopisz, jeśli chcesz):
 * dania z drobiu, dania z wieprzowiny, dania mieszane,
 * kubły z kurczakiem, dania z kurczaka, surówki, dodatki, sosy.
 */
export const menu: readonly MenuCategory[] = [
  {
    id: "pizza",
    title: "Pizza",
    intro: "Ciasto wyrabiane na miejscu każdego ranka, wypiekane do zamówienia.",
    dishes: [
      { name: "Placek z serem", price: 25.5, allergens: ["Laktoza"] },
      { name: "Margheritta", description: "Ser mozzarella, pieczarki, oregano", price: 29.5, allergens: ["Laktoza"] },
      { name: "Fryttela", description: "Ser mozzarella, frytki, przyprawa", price: 31.5, allergens: ["Laktoza"] },
      { name: "Junior", description: "Ser mozzarella, szynka", price: 31.5, allergens: ["Laktoza", "Soja"] },
      { name: "Piccolo", description: "Ser mozzarella, kukurydza, polędwica drobiowa", price: 32.5, allergens: ["Gluten", "Laktoza", "Soja", "Seler"] },
      { name: "Alzacka", description: "Sos majonezowy, ser mozzarella, cebula, boczek", price: 32.5, allergens: ["Laktoza", "Jaja", "Gorczyca"] },
      { name: "Bambino", description: "Ser mozzarella, groszek, szynka", price: 33.5, allergens: ["Laktoza", "Soja"] },
      { name: "Wegetariańska", description: "Ser mozzarella, groszek, cebula, kukurydza, pieczarki", price: 33.5, note: "wege", allergens: ["Laktoza"] },
      { name: "Włoska", description: "Ser mozzarella, pieczarki, salami, czosnek", price: 33.5, allergens: ["Gluten", "Laktoza"] },
      { name: "Peperoni", description: "Ser mozzarella, pieczarki, peperoni, oregano", price: 33.5, allergens: ["Gluten", "Laktoza"] },
      { name: "Hawajska", description: "Ser mozzarella, szynka, ananas", price: 33.5, allergens: ["Laktoza", "Soja"] },
      { name: "Bona", description: "Ser mozzarella, pieczarki, szynka", price: 33.5, note: "nasza", allergens: ["Laktoza", "Soja"] },
      { name: "Sierpecka", description: "Ser mozzarella, pieczarki, szynka, cebula, oregano", price: 34.5, allergens: ["Laktoza", "Soja"] },
      { name: "Swojska", description: "Ser mozzarella, pieczarki, cebula, kiełbasa wiejska, ostra papryka", price: 34.5, allergens: ["Gluten", "Laktoza", "Soja"] },
      { name: "Verona", description: "Ser mozzarella, pieczarki, salami, cebula, oregano", price: 34.5, allergens: ["Gluten", "Laktoza"] },
      { name: "Chłopska", description: "Ser mozzarella, pieczarki, cebula, ogórek konserwowy, peperoni", price: 34.5, allergens: ["Gluten", "Laktoza"] },
      { name: "Mexicana", description: "Ser mozzarella, groszek, papryka, pomidor", price: 34.5, allergens: ["Laktoza"] },
      { name: "Preria", description: "Ser mozzarella, pieczarki, boczek, cebula, ostra papryka", price: 34.5, allergens: ["Laktoza"] },
      { name: "Strong", description: "Ser mozzarella, pieczarki, cebula, salami, polędwica drobiowa, ostra papryka", price: 34.5, allergens: ["Gluten", "Laktoza", "Soja", "Seler"] },
      { name: "Diabelska", description: "Ser mozzarella, pieczarki, salami, papryczki jalapeño", price: 35.5, allergens: ["Gluten", "Laktoza"] },
      { name: "Bosmańska", description: "Ser mozzarella, szynka, tuńczyk, pomidor, oregano", price: 35.5, allergens: ["Laktoza", "Soja", "Ryba"] },
      { name: "Wiejska", description: "Ser mozzarella, polędwica drobiowa, papryka, pieczarki", price: 35.5, allergens: ["Gluten", "Laktoza", "Soja", "Seler"] },
      { name: "Nova", description: "Ser mozzarella, zawijane brzegi z serem, pieczarki, kiełbasa swojska", price: 36.5, allergens: ["Gluten", "Laktoza", "Soja"] },
      { name: "Capri", description: "Ser mozzarella, pieczarki, oliwki, papryka, pomidor, polędwica drobiowa", price: 36.5, allergens: ["Gluten", "Laktoza", "Soja", "Seler"] },
      { name: "Korona", description: "Ser mozzarella, pieczarki, salami, papryka, kulki mozzarelli", price: 36.5, allergens: ["Gluten", "Laktoza"] },
      { name: "Pigal", description: "Ser mozzarella, pieczarki, salami, cebula, polędwica drobiowa, pomidor, oregano", price: 36.5, allergens: ["Gluten", "Laktoza", "Soja", "Seler"] },
      { name: "Tornado", description: "Ser mozzarella, pieczarki, groszek, cebula, mięso mielone, pomidor, czosnek", price: 36.5, allergens: ["Laktoza"] },
      { name: "Sorento", description: "Ser mozzarella, pieczarki, cebula, salami, mięso mielone, ostra papryka", price: 36.5, allergens: ["Gluten", "Laktoza"] },
      { name: "Fiesta", description: "Ser mozzarella, pieczarki, cebula, pomidory koktajlowe, rukola, feta", price: 36.5, allergens: ["Laktoza"] },
      { name: "Rajskie podniebienie", description: "Ser mozzarella, szynka wieprzowa, salami, papryka, szynka drobiowa, oliwki, pieczarki", price: 37.5, allergens: ["Gluten", "Laktoza", "Soja", "Seler"] },
      { name: "Pesto", description: "Ser mozzarella, salami, pomidory suszone z bazylią, cebula", price: 37.5, allergens: ["Gluten", "Laktoza"] },
      { name: "Parma", description: "Ser mozzarella, rukola, szynka dojrzewająca, pomidor koktajlowy", price: 37.5, allergens: ["Laktoza", "Soja"] },
      { name: "Sevilla", description: "Ser mozzarella, kurczak grillowany, pieczarki", price: 37.5, allergens: ["Gluten", "Laktoza", "Soja", "Siarczyny"] },
      { name: "Fantasia", description: "Ser mozzarella, kurczak grillowany, czerwona cebula, oliwki, pomidor suszony z bazylią, oregano", price: 40.5, allergens: ["Gluten", "Laktoza", "Soja", "Siarczyny"] },
      { name: "Kompozycja własna", description: "Składniki wybierasz przy zamówieniu", price: 41.5 },
    ],
  },
  {
    id: "obiady",
    title: "Zestawy obiadowe",
    intro: "Pełny obiad z naszej kuchni — mięso, dodatek i surówka na jednym talerzu.",
    dishes: [
      { name: "Kurczak z warzywami, żółty ryż, surówka", price: 33, note: "500 g", allergens: ["Seler"] },
      { name: "Kurczak z warzywami, frytki, surówka", price: 33, note: "500 g", allergens: ["Seler"] },
      { name: "Ryż zapiekany z serem, warzywami i mięsem, surówka", price: 33, note: "450 g", allergens: ["Laktoza"] },
      { name: "Kurczak w sosie słodko-kwaśnym, ryż, surówka", price: 33, note: "500 g", allergens: ["Soja"] },
      { name: "Kotlet schabowy, kapusta zasmażana, ziemniaki", price: 34, note: "450 g", allergens: ["Gluten", "Jaja", "Seler"] },
      { name: "Kotlet schabowy, kapusta zasmażana, frytki", price: 34, note: "450 g", allergens: ["Gluten", "Jaja", "Seler"] },
      { name: "Filet w bułce tartej, frytki, surówka", price: 34, note: "500 g", allergens: ["Gluten", "Jaja"] },
      { name: "Kotlet de volaille, frytki, surówka", price: 35, note: "500 g", allergens: ["Gluten", "Jaja"] },
      { name: "Filet z jajkiem sadzonym, frytki, surówka", price: 35, note: "500 g", allergens: ["Gluten", "Jaja", "Ryba"] },
      { name: "Gyros drobiowy, frytki, surówka, sos meksykański i majonezowy", price: 35, note: "500 g", allergens: ["Gluten", "Laktoza", "Soja", "Siarczyny"] },
      { name: "Kotlet schabowy z serem i pieczarkami, frytki, surówka", price: 36, note: "500 g", allergens: ["Gluten", "Laktoza", "Jaja"] },
      { name: "Filet z serem i pieczarkami, frytki, surówka", price: 36, note: "500 g", allergens: ["Gluten", "Laktoza", "Jaja"] },
      { name: "Zraz wołowy, kluski śląskie, surówka", price: 39, note: "500 g", allergens: ["Gluten"] },
    ],
  },
  {
    id: "kebaby",
    title: "Kebaby i tortille",
    intro: "Mięso z pionowego rożna, krojone na bieżąco.",
    dishes: [
      { name: "Kebab drobiowy w bułce — mały", price: 16, allergens: ["Gluten", "Laktoza", "Soja", "Siarczyny"] },
      { name: "Tortilla vega", description: "Wegetariańska", price: 19, note: "wege", allergens: ["Gluten"] },
      { name: "Tortilla z gyrosem", price: 19, allergens: ["Gluten", "Laktoza", "Soja", "Siarczyny"] },
      { name: "Tortilla grecka", description: "Z fetą", price: 20, allergens: ["Gluten", "Laktoza"] },
      { name: "Tortilla cheese", description: "Z żółtym serem", price: 20, allergens: ["Gluten", "Laktoza"] },
      { name: "Kebab drobiowy w bułce — duży", price: 21, allergens: ["Gluten", "Laktoza", "Soja", "Siarczyny"] },
      { name: "Kebab drobiowy na frytkach", price: 24, note: "700 g", allergens: ["Gluten", "Laktoza", "Soja", "Siarczyny"] },
      { name: "Kebab drobiowy w bułce — mega", price: 25, allergens: ["Gluten", "Laktoza", "Soja", "Siarczyny"] },
    ],
  },
  {
    id: "pierogi",
    title: "Pierogi",
    intro: "Po sześć sztuk na porcję.",
    dishes: [
      { name: "Pierogi z mięsem", description: "Z okrasą", price: 18, note: "6 szt.", allergens: ["Gluten", "Jaja"] },
      { name: "Pierogi ruskie", description: "Z okrasą", price: 20, note: "6 szt.", allergens: ["Gluten", "Laktoza", "Jaja"] },
      { name: "Pierogi z twarogiem", description: "Ze śmietaną", price: 20, note: "6 szt.", allergens: ["Gluten", "Jaja"] },
      { name: "Pierogi z kapustą i grzybami", description: "Z okrasą", price: 20, note: "6 szt.", allergens: ["Gluten", "Jaja"] },
      { name: "Pierogi ze szpinakiem", price: 20, note: "6 szt.", allergens: ["Gluten", "Jaja"] },
      { name: "Pierogi z soczewicą i warzywami", price: 20, note: "6 szt.", allergens: ["Gluten", "Jaja"] },
      { name: "Pierogi z babką ziemniaczaną", description: "Z okrasą", price: 20, note: "6 szt.", allergens: ["Gluten", "Jaja"] },
    ],
  },
  {
    id: "zupy",
    title: "Zupy i sałatki",
    intro: "Gotowane codziennie od rana. Sałatki składane na zamówienie.",
    dishes: [
      { name: "Strogonow", description: "Z pieczywem", price: 17, note: "350 ml", allergens: ["Gluten"] },
      { name: "Czernina", price: 19, note: "350 ml", allergens: ["Gluten"] },
      { name: "Sałatka grecka", description: "Sałata lodowa, ogórek, pomidor, czerwona cebula, oliwki, feta, sos", price: 24.5, allergens: ["Laktoza"] },
      { name: "Sałatka z kurczakiem", description: "Sałata lodowa, ogórek, pomidor, cebula, kurczak, sos", price: 24.5, allergens: ["Gluten", "Laktoza", "Jaja", "Soja", "Gorczyca", "Siarczyny"] },
      { name: "Sałatka z kurczakiem i ananasem", description: "Sałata lodowa, ogórek, pomidor, ananas, kukurydza, kurczak, sos", price: 24.5, allergens: ["Gluten", "Laktoza", "Jaja", "Soja", "Gorczyca", "Siarczyny"] },
      { name: "Sałatka z tuńczykiem", description: "Sałata lodowa, ogórek, pomidor, jajko, tuńczyk, cebula, sos", price: 24.5, allergens: ["Gluten", "Laktoza", "Jaja", "Soja", "Gorczyca"] },
    ],
  },
  {
    id: "desery",
    title: "Desery",
    intro: "Krótko i na słodko.",
    dishes: [
      { name: "Szarlotka na gorąco", description: "Bez dodatków", price: 13 },
    ],
  },
  {
    id: "napoje",
    title: "Napoje",
    intro: "Wszystko zimne, prosto z lodówki.",
    dishes: [
      { name: "Sok Tymbark", price: 6.5, note: "0,25 l" },
      { name: "Coca-Cola", price: 7.5, note: "0,25 l" },
      { name: "Kropla Beskidu", price: 7.5, note: "0,5 l" },
      { name: "Cappy", price: 8, note: "0,33 l" },
      { name: "Coca-Cola", price: 9.5, note: "0,5 l" },
      { name: "Coca-Cola bez cukru", price: 9.5, note: "0,5 l" },
      { name: "Fanta", price: 9.5, note: "0,5 l" },
      { name: "Sprite", price: 9.5, note: "0,5 l" },
      { name: "Fuzetea", price: 9.5, note: "0,5 l" },
      { name: "Burn", description: "Napój energetyzujący", price: 10, note: "0,25 l" },
    ],
  },
] as const;

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
