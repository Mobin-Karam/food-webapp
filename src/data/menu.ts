import type { MenuItem, Category } from "@/types/menu";



export const categories = [
  {
    id: "fried",
    label: "سوخاری",
    iconWhite: "/images/icon-gril-white.png",
    iconOrange: "/images/icon-gril-orange.png",
  },
  {
    id: "pizza",
    label: "پیتزا",
    iconWhite: "/images/icon-piko-white.png",
    iconOrange: "/images/icon-piko-orange.png",
  },
  {
    id: "sandwich",
    label: "ساندویچ و برگر",
    iconWhite: "/images/icon-burger-white.png",
    iconOrange: "/images/icon-burger-orange.png",
  },
  {
    id: "hotdog",
    label: "هات‌داگ",
    iconWhite: "/images/icon-hotdog-white.png",
    iconOrange: "/images/icon-hotdog-orange.png",
  },
  {
    id: "hotsandwich",
    label: "ساندویچ گرم",
    iconWhite: "/images/icon-hotsandwich-white.png",
    iconOrange: "/images/icon-hotsandwich-orange.png",
  },
  {
    id: "sides",
    label: "پیش‌غذا",
    iconWhite: "/images/icon-potin-white.png",
    iconOrange: "/images/icon-potin-orange.png",
  },
] as const satisfies readonly Category[];

export type CategoryItem = (typeof categories)[number]["id"];

export const menuItems = [
  {
    id: "f1",
    categoryId: "fried",
    name: "فیله استریپس TFC با سالاد کلم",
    price: 450000,
    image: "/images/strips-salad.jpg",
  },
  {
    id: "f2",
    categoryId: "fried",
    name: "فیله دوتکه استریپس با سالاد کلم TFC",
    price: 530000,
    image: "/images/double-strips-salad.jpg",
  },
  {
    id: "p1",
    categoryId: "pizza",
    name: "پیتزا مرغ و قارچ",
    price: 680000,
    image: "/images/pizza-chicken-mushroom.jpg",
  },
  {
    id: "s1",
    categoryId: "sandwich",
    name: "برگر کلاسیک",
    price: 420000,
    image: "/images/classic-burger.jpg",
  },
  {
    id: "h1",
    categoryId: "hotdog",
    name: "هات‌داگ کلاسیک",
    price: 280000,
    image: "/images/hotdog-classic.jpg",
  },
  {
    id: "hs1",
    categoryId: "hotsandwich",
    name: "ساندویچ گرم مرغ",
    price: 350000,
    image: "/images/hot-sandwich-chicken.jpg",
  },
  {
    id: "si1",
    categoryId: "sides",
    name: "سیب‌زمینی سرخ‌کرده",
    price: 180000,
    image: "/images/fries.jpg",
  },
] satisfies MenuItem[];
