'use client';

import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { MenuItem } from '@/types/menu';

type Props = {
  item: MenuItem;
};

// Emoji mapping for placeholder images
const categoryEmoji: Record<string, string> = {
  fried: '🍗',
  pizza: '🍕',
  sandwich: '🍔',
  salad: '🥗',
  drinks: '🥤',
};

function formatPrice(price: number): string {
  return price.toLocaleString('fa-IR');
}

export default function FoodCard({ item }: Props) {
  const { state, addItem, decrementItem } = useCart();
  const cartItem = state.items.find(ci => ci.item.id === item.id);
  const quantity = cartItem?.quantity ?? 0;

  return (
    <div className="food-card bg-white rounded-xl overflow-hidden shadow-card cursor-pointer">
      {/* Image area */}
      <div className="relative h-44 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center food-img-placeholder"
          style={{ backgroundImage: `url('${item.image}')` }}
        >
          {/* Fallback emoji shown behind the image */}
          <span style={{ opacity: 0.5 }}>{categoryEmoji[item.categoryId] ?? '🍽️'}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-1 line-clamp-2 text-right">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-xs text-gray-400 mb-2 line-clamp-1 text-right">{item.description}</p>
        )}

        {/* Price & quantity row */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-500 price-display">
            {formatPrice(item.price)}{' '}
            <span className="text-xs">تومان</span>
          </span>

          {quantity === 0 ? (
            <button
              onClick={() => addItem(item)}
              className="qty-btn w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center hover:bg-brand-red-dark shadow-sm"
              aria-label="افزودن به سبد"
            >
              <Plus size={16} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => addItem(item)}
                className="qty-btn w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center hover:bg-brand-red-dark shadow-sm"
                aria-label="افزایش تعداد"
              >
                <Plus size={14} />
              </button>
              <span className="text-sm font-bold text-brand-red w-4 text-center">
                {quantity}
              </span>
              <button
                onClick={() => decrementItem(item.id)}
                className="qty-btn w-8 h-8 rounded-full bg-gray-100 text-brand-red flex items-center justify-center hover:bg-gray-200 shadow-sm"
                aria-label="کاهش تعداد"
              >
                <Minus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
