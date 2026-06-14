# TFC Food Ordering Website

A fully functional online food ordering website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** — RTL (right-to-left) layout in Persian/Farsi.

## Features

- 🛒 Add/remove items from cart with quantity controls
- 📂 Category-based menu filtering (5 categories)
- 🔍 Search within categories
- 💳 Cart sidebar with tax calculation (10%) and total
- 📱 Fully responsive — mobile drawer cart, desktop sidebar
- 🌐 RTL layout (Persian / Farsi)
- 🍽️ Restaurant info tab (address, hours, phone, description)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles + Vazirmatn font
│   ├── layout.tsx           # Root layout with CartProvider
│   └── page.tsx             # Main page
├── components/
│   ├── Header.tsx           # Top navigation bar
│   ├── HeroBanner.tsx       # Branch hero image + info
│   ├── CategoryBar.tsx      # Horizontal category tabs
│   ├── FoodCard.tsx         # Individual menu item card
│   ├── MenuSection.tsx      # Menu grid + search
│   ├── CartSidebar.tsx      # Desktop cart panel
│   ├── MobileCartBar.tsx    # Mobile cart drawer
│   └── RestaurantInfo.tsx   # Restaurant details tab
├── context/
│   └── CartContext.tsx      # Global cart state (useReducer)
└── data/
    └── menu.ts              # Menu items & categories data
```

## Adding Your Own Images

Replace image paths in `src/data/menu.ts` and put image files in `public/images/`:

```ts
{
  id: 'f1',
  name: 'فیله استریپس TFC',
  price: 450000,
  image: '/images/your-image.jpg',   // ← put files in public/images/
  ...
}
```

For the hero banner, replace `public/images/hero-bg.jpg`.

## Customization

### Change prices or add items
Edit `src/data/menu.ts` — add new items to any category.

### Add a new category
1. Add to `categories` array in `src/data/menu.ts`
2. Add matching emoji in `categoryEmoji` in `FoodCard.tsx`

### Change brand colors
Edit `tailwind.config.js` under `theme.extend.colors.brand`.

### Change tax rate
Edit `TAX_RATE` in `src/context/CartContext.tsx`.

## Build for Production

```bash
npm run build
npm start
```
