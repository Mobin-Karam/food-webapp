import { MenuItem } from "@/types/menu";

export type CartItem = Readonly<{
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}>;

export type CartState = Readonly<{
  items: readonly CartItem[];
}>;

export type CartAction =
  | {
      type: "ADD_ITEM";
      payload: MenuItem;
    }
  | {
      type: "DECREMENT_ITEM";
      payload: string;
    }
  | {
      type: "REMOVE_ITEM";
      payload: string;
    }
  | {
      type: "SET_QUANTITY";
      payload: {
        id: string;
        quantity: number;
      };
    }
  | {
      type: "INCREMENT_ITEM";
      payload: string;
    }
  | {
      type: "CLEAR_CART";
    };

export const INITIAL_CART_STATE: CartState = {
  items: [],
};
