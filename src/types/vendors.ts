import type { MenuItem, Category } from "./menu";

export type Vendor = {
  id: string;
  name: string;
  address?: string;
  isOpen?: boolean;

  menuItems: readonly MenuItem[];
  categories: readonly Category[];
};