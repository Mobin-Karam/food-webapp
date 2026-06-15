import { CartAction, CartState } from "./cart.types";

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            image: action.payload.image,
            quantity: 1,
          },
        ],
      };
    }

    case "DECREMENT_ITEM": {
      const existing = state.items.find((item) => item.id === action.payload);

      if (!existing) return state;

      if (existing.quantity <= 1) {
        return {
          items: state.items.filter((item) => item.id !== action.payload),
        };
      }

      return {
        items: state.items.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        ),
      };
    }

    case "SET_QUANTITY": {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        items: state.items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity,
              }
            : item,
        ),
      };
    }

    case "INCREMENT_ITEM":
      return {
        items: state.items.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      };

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        items: [],
      };

    default:
      return state;
  }
}
