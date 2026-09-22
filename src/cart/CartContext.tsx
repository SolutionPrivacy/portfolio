import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Dish } from "@/data/menu";

export type OrderMode = "dostawa" | "odbior";
export type Timing = "teraz" | "zaplanuj";

export type OrderSetup = {
  mode: OrderMode;
  address?: string;
  timing?: Timing;
  date?: string;
  time?: string;
};

export type CartLine = {
  /** Unikalny klucz pozycji — to samo danie z innymi dodatkami to osobna pozycja. */
  key: string;
  name: string;
  basePrice: number;
  extras: { label: string; price: number }[];
  quantity: number;
};

type State = {
  setup: OrderSetup | null;
  lines: CartLine[];
  discount: { code: string; percent: number } | null;
};

type Action =
  | { type: "setup"; setup: OrderSetup }
  | { type: "clearSetup" }
  | { type: "add"; line: Omit<CartLine, "quantity"> }
  | { type: "inc"; key: string }
  | { type: "dec"; key: string }
  | { type: "remove"; key: string }
  | { type: "discount"; discount: State["discount"] }
  | { type: "reset" };

const initial: State = { setup: null, lines: [], discount: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setup":
      return { ...state, setup: action.setup };
    case "clearSetup":
      return { ...state, setup: null };
    case "add": {
      const existing = state.lines.find((l) => l.key === action.line.key);
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            l.key === action.line.key ? { ...l, quantity: l.quantity + 1 } : l,
          ),
        };
      }
      return { ...state, lines: [...state.lines, { ...action.line, quantity: 1 }] };
    }
    case "inc":
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.key === action.key ? { ...l, quantity: l.quantity + 1 } : l,
        ),
      };
    case "dec":
      return {
        ...state,
        lines: state.lines
          .map((l) => (l.key === action.key ? { ...l, quantity: l.quantity - 1 } : l))
          .filter((l) => l.quantity > 0),
      };
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.key !== action.key) };
    case "discount":
      return { ...state, discount: action.discount };
    case "reset":
      return initial;
    default:
      return state;
  }
}

export function linePrice(line: CartLine): number {
  const extras = line.extras.reduce((sum, e) => sum + e.price, 0);
  return (line.basePrice + extras) * line.quantity;
}

type CartValue = {
  setup: OrderSetup | null;
  lines: CartLine[];
  discount: State["discount"];
  count: number;
  subtotal: number;
  total: number;
  setSetup: (setup: OrderSetup) => void;
  clearSetup: () => void;
  addLine: (dish: Dish, extras: { label: string; price: number }[]) => void;
  inc: (key: string) => void;
  dec: (key: string) => void;
  remove: (key: string) => void;
  applyDiscount: (d: State["discount"]) => void;
  reset: () => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const addLine = useCallback(
    (dish: Dish, extras: { label: string; price: number }[]) => {
      const key = `${dish.name}|${extras.map((e) => e.label).sort().join(",")}`;
      dispatch({
        type: "add",
        line: { key, name: dish.name, basePrice: dish.price, extras },
      });
    },
    [],
  );

  const value = useMemo<CartValue>(() => {
    const subtotal = state.lines.reduce((sum, l) => sum + linePrice(l), 0);
    const total = state.discount
      ? subtotal * (1 - state.discount.percent / 100)
      : subtotal;

    return {
      setup: state.setup,
      lines: state.lines,
      discount: state.discount,
      count: state.lines.reduce((n, l) => n + l.quantity, 0),
      subtotal,
      total,
      setSetup: (setup) => dispatch({ type: "setup", setup }),
      clearSetup: () => dispatch({ type: "clearSetup" }),
      addLine,
      inc: (key) => dispatch({ type: "inc", key }),
      dec: (key) => dispatch({ type: "dec", key }),
      remove: (key) => dispatch({ type: "remove", key }),
      applyDiscount: (d) => dispatch({ type: "discount", discount: d }),
      reset: () => dispatch({ type: "reset" }),
    };
  }, [state, addLine]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart musi być wewnątrz <CartProvider>");
  return ctx;
}
