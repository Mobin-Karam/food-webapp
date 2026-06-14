import { menuItems, categories } from "./menu";
import type { Vendor } from "@/types/vendors";

export const vendors = {
  "1": {
    id: "1",
    name: "Restaurant 1",
    address: "Demo address 1",
    isOpen: true,
    menuItems,
    categories,
  },
  "2": {
    id: "2",
    name: "Restaurant 2",
    address: "Demo address 2",
    isOpen: true,
    menuItems,
    categories,
  },
} satisfies Record<string, Vendor>;

export type VendorId = keyof typeof vendors;