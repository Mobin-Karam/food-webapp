import { Category, MenuItem } from "./menu";

export type Vendor = {
  id: string;
  name: string;
  slug: string; // IMPORTANT: required

  address?: string;
  phone?: string;
  description?: string;

  logo?: string;
  heroImage?: string;

  isOpen?: boolean;
  acceptingOrders?: boolean;

  openingHours?: {
    weekdays: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };

  social?: {
    instagram?: string;
    telegram?: string;
    bale?: string;
  };

  menuItems: readonly MenuItem[];
  categories: readonly Category[];
};
export type VendorId = "1" | "2";