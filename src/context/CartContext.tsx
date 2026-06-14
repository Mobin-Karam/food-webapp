'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MenuItem } from '@/data/menu';

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'DECREMENT_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(ci => ci.item.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map(ci =>
            ci.item.id === action.payload.id
              ? { ...ci, quantity: ci.quantity + 1 }
              : ci
          ),
        };
      }
      return { items: [...state.items, { item: action.payload, quantity: 1 }] };
    }
    case 'DECREMENT_ITEM': {
      const existing = state.items.find(ci => ci.item.id === action.payload);
      if (!existing) return state;
      if (existing.quantity === 1) {
        return { items: state.items.filter(ci => ci.item.id !== action.payload) };
      }
      return {
        items: state.items.map(ci =>
          ci.item.id === action.payload
            ? { ...ci, quantity: ci.quantity - 1 }
            : ci
        ),
      };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(ci => ci.item.id !== action.payload) };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

type CartContextType = {
  state: CartState;
  addItem: (item: MenuItem) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  taxAmount: number;
  grandTotal: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const TAX_RATE = 0.10; // 10%

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item: MenuItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  const decrementItem = (id: string) => dispatch({ type: 'DECREMENT_ITEM', payload: id });
  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalPrice = state.items.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );
  const taxAmount = Math.round(totalPrice * TAX_RATE);
  const grandTotal = totalPrice + taxAmount;
  const totalItems = state.items.reduce((sum, ci) => sum + ci.quantity, 0);

  return (
    <CartContext.Provider
      value={{ state, addItem, decrementItem, removeItem, clearCart, totalPrice, taxAmount, grandTotal, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
