import { useCallback, useState } from "react";
import { useCart } from "@/cart/CartContext";
import type { PendingDish } from "@/components/ProductModal";
import type { Dish } from "@/data/menu";

/**
 * Przepływ dodawania do koszyka:
 * 1. klik w plusik → jeśli nie wiemy jak dostarczyć, pytamy o to najpierw
 * 2. potem okno z dodatkami (spód, sos, opakowanie)
 * 3. dodanie do koszyka
 */
export function useAddToCart() {
  const cart = useCart();
  const [askMode, setAskMode] = useState(false);
  const [pending, setPending] = useState<PendingDish | null>(null);
  const [queued, setQueued] = useState<PendingDish | null>(null);

  const requestAdd = useCallback(
    (dish: Dish, categoryId: string) => {
      const item = { dish, categoryId };
      if (!cart.setup) {
        setQueued(item);
        setAskMode(true);
        return;
      }
      setPending(item);
    },
    [cart.setup],
  );

  const confirmMode = useCallback(
    (setup: Parameters<typeof cart.setSetup>[0]) => {
      cart.setSetup(setup);
      setAskMode(false);
      if (queued) {
        setPending(queued);
        setQueued(null);
      }
    },
    [cart, queued],
  );

  return {
    askMode,
    pending,
    requestAdd,
    confirmMode,
    closeMode: () => {
      setAskMode(false);
      setQueued(null);
    },
    closeProduct: () => setPending(null),
    addLine: cart.addLine,
  };
}
