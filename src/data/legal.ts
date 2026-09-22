/**
 * DANE DO STRON PRAWNYCH.
 *
 * WAŻNE: pełna Polityka prywatności i Regulamin obowiązujące przy zamówieniach
 * online to dokumenty prawne przygotowane przez operatora systemu zamówień.
 * Nie przepisuję ich tutaj słowo w słowo — poniżej jest streszczenie
 * najważniejszych punktów plus odnośnik do wersji wiążącej.
 *
 * Zanim strona pójdzie na produkcję, daj te teksty do sprawdzenia prawnikowi
 * albo wklej tu własne dokumenty.
 */

export const legalSources = {
  privacy: "https://pizzeriabona.order.app.hd.digital/privacy-policy",
  terms: "https://pizzeriabona.order.app.hd.digital/terms-and-conditions",
  notice: "https://pizzeriabona.order.app.hd.digital/legal-notice-pl",
  odr: "https://ec.europa.eu/consumers/odr/main/index.cfm",
} as const;

export type LegalSection = { heading: string; body: string[] };

export const privacySections: readonly LegalSection[] = [
  {
    heading: "Kto odpowiada za Twoje dane",
    body: [
      "Administratorem danych podanych przy zamówieniu i rezerwacji jest Agnieszka Nahkami, prowadząca Pizzerię „Bona” przy Jana Pawła II 1A w Sierpcu. Kontakt w sprawach danych: r.nahkami@hotmail.com lub 24 275 71 00.",
    ],
  },
  {
    heading: "Jakie dane zbieramy",
    body: [
      "Przy zamówieniu: imię, nazwisko, numer telefonu, adres e-mail, a przy dostawie również adres. Do tego treść zamówienia i ewentualny komentarz, który sam wpiszesz.",
      "Przy rezerwacji stolika: imię, telefon, data, godzina, liczba osób i uwagi.",
      "Technicznie: adres IP oraz podstawowe informacje o przeglądarce — zapisywane po to, żeby strona działała i żeby ograniczyć nadużycia.",
    ],
  },
  {
    heading: "Po co ich używamy",
    body: [
      "Żeby przyjąć i zrealizować zamówienie lub rezerwację — to jest wykonanie umowy, o którą sam prosisz.",
      "Żeby skontaktować się z Tobą, gdy coś wymaga potwierdzenia lub gdy pojawi się problem z zamówieniem.",
      "Żeby wypełnić obowiązki księgowe i podatkowe, jeżeli takie powstaną.",
    ],
  },
  {
    heading: "Jak długo je trzymamy",
    body: [
      "Dane zamówienia — przez czas potrzebny do jego realizacji i rozpatrzenia ewentualnej reklamacji. Dokumenty księgowe — przez okres wymagany przepisami podatkowymi.",
      "Dane rezerwacji usuwamy po wizycie, o ile nie są potrzebne do rozliczenia.",
    ],
  },
  {
    heading: "Komu je przekazujemy",
    body: [
      "Dostawcy systemu zamówień online i hostingu — w zakresie niezbędnym do działania usługi. Nie sprzedajemy danych i nie przekazujemy ich do celów marketingowych osobom trzecim.",
    ],
  },
  {
    heading: "Twoje prawa",
    body: [
      "Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia oraz sprzeciwu wobec przetwarzania. Możesz też wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych.",
      "Żeby skorzystać z któregokolwiek z tych praw, wystarczy napisać lub zadzwonić.",
    ],
  },
  {
    heading: "Pliki cookie",
    body: [
      "Strona używa plików cookie niezbędnych do jej działania — między innymi do zapamiętania zawartości koszyka. Bez nich zamówienie nie zadziała.",
      "Nie używamy na tej stronie cookies marketingowych ani śledzących.",
    ],
  },
];

export const termsSections: readonly LegalSection[] = [
  {
    heading: "Kogo dotyczy ten regulamin",
    body: [
      "Regulamin określa zasady składania zamówień na dania z Pizzerii „Bona” — na miejscu, na wynos i z dostawą — oraz rezerwacji stolików.",
      "Sprzedawcą jest Agnieszka Nahkami, Pizzeria „Bona”, Jana Pawła II 1A, 09-200 Sierpc, NIP 1132243993.",
    ],
  },
  {
    heading: "Składanie zamówienia",
    body: [
      "Zamówienie składasz wybierając dania, sposób odbioru i godzinę. Zamówienie jest wiążące w chwili jego potwierdzenia przez restaurację — telefonicznie lub w systemie.",
      "Ceny podane w karcie są cenami brutto i zawierają podatek VAT. Cena opakowania doliczana jest osobno i widoczna przy zamówieniu.",
    ],
  },
  {
    heading: "Dostawa i odbiór",
    body: [
      "Orientacyjny czas dostawy to około 60 minut, a odbioru osobistego około 30 minut, licząc od potwierdzenia zamówienia. Są to czasy szacunkowe — przy dużym ruchu mogą się wydłużyć.",
      "Dostawa realizowana jest na terenie Sierpca i okolic. Przy zamówieniu z dostawą podajesz pełny adres.",
    ],
  },
  {
    heading: "Płatność",
    body: [
      "Płatność następuje przy odbiorze — gotówką albo kartą. Nie przyjmujemy płatności z góry przez stronę.",
    ],
  },
  {
    heading: "Odstąpienie od umowy",
    body: [
      "Zgodnie z przepisami o prawach konsumenta, prawo odstąpienia od umowy nie przysługuje przy dostawie żywności szybko psującej się oraz przygotowanej na indywidualne zamówienie. Dotyczy to dań przygotowywanych na bieżąco.",
      "Zamówienie można anulować telefonicznie, zanim przygotowanie zostanie rozpoczęte.",
    ],
  },
  {
    heading: "Reklamacje",
    body: [
      "Reklamacje zgłaszaj jak najszybciej — telefonicznie pod 24 275 71 00 albo mailem. Rozpatrzymy je w ciągu 14 dni.",
      "Konsument może skorzystać z pozasądowego rozstrzygania sporów przez europejską platformę ODR.",
    ],
  },
  {
    heading: "Alergeny",
    body: [
      "Alergeny przy każdym daniu oznaczamy w karcie. Dania przygotowujemy we wspólnej kuchni, więc nie możemy wykluczyć śladowych ilości innych alergenów. Przy alergii poinformuj nas przy składaniu zamówienia.",
    ],
  },
];

export const noticeData = {
  company: 'AGNIESZKA NAHKAMI PIZZERIA "BONA"',
  representative: "Rachid Nahkami",
  address: "Jana Pawła II 1A, 09-200 Sierpc, Polska",
  phone: "+48 24 275 71 00",
  email: "r.nahkami@hotmail.com",
  vat: "1132243993",
  regon: "1132243993",
} as const;
