import { MenuItem } from "@/types/menu";
import { Dispatch } from "react";

import { CartAction } from "./cart.types";
import { appEventBus } from "@/lib/appEventBus";

export function addItemAction(
  dispatch: Dispatch<CartAction>,
  item: MenuItem,
) {
  dispatch({
    type: "ADD_ITEM",
    payload: item,
  });

  appEventBus.emit(
    "به سبد خرید اضافه شد",
    "success",
  );
}

export function removeItemAction(
  dispatch: Dispatch<CartAction>,
  id: string,
) {
  dispatch({
    type: "REMOVE_ITEM",
    payload: id,
  });

  appEventBus.emit(
    "آیتم حذف شد",
    "info",
  );
}

export function decrementItemAction(
  dispatch: Dispatch<CartAction>,
  id: string,
) {
  dispatch({
    type: "DECREMENT_ITEM",
    payload: id,
  });
}

export function setQuantityAction(
  dispatch: Dispatch<CartAction>,
  id: string,
  quantity: number,
) {
  dispatch({
    type: "SET_QUANTITY",
    payload: {
      id,
      quantity,
    },
  });
}

export function clearCartAction(
  dispatch: Dispatch<CartAction>,
) {
  dispatch({
    type: "CLEAR_CART",
  });

  appEventBus.emit(
    "سبد خرید خالی شد",
    "info",
  );
}

// cart.actions.ts

export function incrementItemAction(
  dispatch: Dispatch<CartAction>,
  id: string,
) {
  dispatch({
    type: "INCREMENT_ITEM",
    payload: id,
  });
}