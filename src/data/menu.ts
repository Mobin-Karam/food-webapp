import type { MenuItem, Category } from "@/types/menu";



export const categories = [
  {
    id: "fried",
    label: "سوخاری",
    iconWhite: "/images/menu/icon-gril-white.png",
    iconOrange: "/images/menu/icon-chickenstrips.png",
  },
  {
    id: "pizza",
    label: "پیتزا",
    iconWhite: "/images/menu/icon-piko-white.png",
    iconOrange: "/images/menu/icon-pizza.png",
  },
  {
    id: "sandwich",
    label: "ساندویچ و برگر",
    iconWhite: "/images/menu/icon-burger-white.png",
    iconOrange: "/images/menu/icon-burger.png",
  },
  {
    id: "hotdog",
    label: "هات‌داگ",
    iconWhite: "/images/menu/icon-hotdog-white.png",
    iconOrange: "/images/menu/icon-sandwich.png",
  },
  {
    id: "hotsandwich",
    label: "ساندویچ گرم",
    iconWhite: "/images/menu/icon-hotsandwich-white.png",
    iconOrange: "/images/menu/icon-sandwich.png",
  },
  {
    id: "sides",
    label: "پیش‌غذا",
    iconWhite: "/images/menu/icon-potin-white.png",
    iconOrange: "/images/menu/icon-appetizer.png",
  },
] as const satisfies readonly Category[];

export type CategoryItem = (typeof categories)[number]["id"];

export const menuItems = [
  {
    id: "f1",
    categoryId: "fried",
    name: "فیله استریپس TFC با سالاد کلم",
    price: 450000,
    image: "/images/foods/54ezkonv.o0b_560x350.jpg",
  },
  {
    id: "f2",
    categoryId: "fried",
    name: "فیله دوتکه استریپس با سالاد کلم TFC",
    price: 530000,
    image: "/images/foods/54ezkonv.o0b_560x350.jpg",
  },
  {
    id: "p1",
    categoryId: "pizza",
    name: "پیتزا مرغ و قارچ",
    price: 680000,
    image: "/images/foods/54ezkonv.o0b_560x350.jpg",
  },
  {
    id: "s1",
    categoryId: "sandwich",
    name: "برگر کلاسیک",
    price: 420000,
    image: "/images/foods/54ezkonv.o0b_560x350.jpg",
  },
  {
    id: "h1",
    categoryId: "hotdog",
    name: "هات‌داگ کلاسیک",
    price: 280000,
    image: "/images/foods/54ezkonv.o0b_560x350.jpg",
  },
  {
    id: "hs1",
    categoryId: "hotsandwich",
    name: "ساندویچ گرم مرغ",
    price: 350000,
    image: "/images/foods/54ezkonv.o0b_560x350.jpg",
  },
  {
    id: "si1",
    categoryId: "sides",
    name: "سیب‌زمینی سرخ‌کرده",
    price: 180000,
    image: "/images/foods/54ezkonv.o0b_560x350.jpg",
  },
] satisfies MenuItem[];
