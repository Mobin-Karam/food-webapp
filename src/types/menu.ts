import { categories } from "@/data/menu";

export type Category = {
  id: string;
  label: string;
  iconWhite: string;
  iconOrange: string;
};

export type CategoryId = (typeof categories)[number]["id"];

export type MenuItem = {
  id: string;
  categoryId: CategoryId;
  name: string;
  price: number;
  image: string;
  description?: string;
};