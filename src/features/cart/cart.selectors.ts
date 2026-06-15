import { CartState } from "./cart.types";

export const TAX_RATE = 0.1;

export const getSubtotal = (
  state: CartState,
) =>
  state.items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0,
  );

export const getTotalItems = (
  state: CartState,
) =>
  state.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

export const getTaxAmount = (
  state: CartState,
  taxRate = TAX_RATE,
) => Math.round(getSubtotal(state) * taxRate);

export const getGrandTotal = (
  state: CartState,
  taxRate = TAX_RATE,
) =>
  getSubtotal(state) +
  getTaxAmount(state, taxRate);