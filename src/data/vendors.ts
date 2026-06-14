import { Vendor } from "@/types/vendors";
import { categories, menuItems } from "./menu";

export const vendors = {
  "1": {
    id: "1",
    name: "Restaurant 1",
    address: "Demo address 1",
    phone: "021-1234-5678",
    description: "Demo restaurant description 1",

    logo: "/images/logo1.png",
    heroImage: "/images/hero1.jpg",

    social: {
      instagram: "https://instagram.com/tfc",
      telegram: "https://t.me/tfc",
      bale: "https://bale.ai/tfc",
    },

    isOpen: true,
    acceptingOrders: true,

    openingHours: {
      weekdays: "۱۱:۰۰ – ۲۳:۰۰",
      friday: "۱۲:۰۰ – ۲۳:۳۰",
    },

    menuItems,
    categories,
  },
  "2": {
    id: "2",
    name: "Restaurant 2",
    address: "Demo address 2",
    phone: "021-9999-8888",
    description: "Demo restaurant description 2",

    social: {
      instagram: "https://instagram.com/tfc",
      telegram: "https://t.me/tfc",
      bale: "https://bale.ai/tfc",
    },

    logo: "/images/logo1.png",
    heroImage: "/images/hero1.jpg",

    isOpen: false,
    acceptingOrders: false,

    openingHours: {
      weekdays: "۱۰:۰۰ – ۲۲:۰۰",
      friday: "۱۲:۰۰ – ۲۳:۰۰",
    },

    menuItems,
    categories,
  },
} satisfies Record<string, Vendor>;
