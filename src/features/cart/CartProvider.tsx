"use client";

import {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import type { MenuItem } from "@/types/menu";

import { CartItem, INITIAL_CART_STATE } from "./cart.types";

import { cartReducer } from "./cart.reducer";

import { loadCart, saveCart } from "./cart.storage";

import {
  getSubtotal,
  getTaxAmount,
  getGrandTotal,
  getTotalItems,
} from "./cart.selectors";

import {
  addItemAction,
  incrementItemAction,
  removeItemAction,
  decrementItemAction,
  setQuantityAction,
  clearCartAction,
} from "./cart.actions";

export type CartContextType = {
  items: readonly CartItem[];

  subtotal: number;
  taxAmount: number;
  grandTotal: number;
  totalItems: number;

  addItem: (item: MenuItem) => void;

  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;

  removeItem: (id: string) => void;

  setQuantity: (id: string, quantity: number) => void;

  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    INITIAL_CART_STATE,
    loadCart,
  );

  useEffect(() => {
    saveCart(state);
  }, [state]);

  const subtotal = useMemo(() => getSubtotal(state), [state]);

  const taxAmount = useMemo(() => getTaxAmount(state), [state]);

  const grandTotal = useMemo(() => getGrandTotal(state), [state]);

  const totalItems = useMemo(() => getTotalItems(state), [state]);

  const value = useMemo<CartContextType>(
    () => ({
      items: state.items,

      subtotal,
      taxAmount,
      grandTotal,
      totalItems,

      addItem: (item) => addItemAction(dispatch, item),

      incrementItem: (id) => incrementItemAction(dispatch, id),

      decrementItem: (id) => decrementItemAction(dispatch, id),

      removeItem: (id) => removeItemAction(dispatch, id),

      setQuantity: (id, quantity) => setQuantityAction(dispatch, id, quantity),

      clearCart: () => clearCartAction(dispatch),
    }),
    [state.items, subtotal, taxAmount, grandTotal, totalItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
