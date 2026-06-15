import {
  CartState,
  INITIAL_CART_STATE,
} from "./cart.types";

const STORAGE_KEY = "cart";

export function loadCart(): CartState {
  if (typeof window === "undefined") {
    return INITIAL_CART_STATE;
  }

  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    return stored
      ? JSON.parse(stored)
      : INITIAL_CART_STATE;
  } catch {
    return INITIAL_CART_STATE;
  }
}

export function saveCart(
  state: CartState,
): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state),
    );
  } catch {}
}