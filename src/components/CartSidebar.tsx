'use client';

import { Trash2, Plus, Minus, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

function formatPrice(price: number): string {
  return price.toLocaleString('fa-IR');
}

export default function CartSidebar() {
  const { state, addItem, decrementItem, removeItem, totalPrice, taxAmount, grandTotal, totalItems } = useCart();
  const [discountCode, setDiscountCode] = useState('');

  return (
    <aside className="bg-white rounded-xl shadow-card flex flex-col h-fit sticky top-20">
      {/* Cart header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <Trash2 size={16} className="text-gray-400 cursor-pointer hover:text-brand-red transition-colors" />
          <span>سبد خرید</span>
        </div>
        {totalItems > 0 && (
          <span className="bg-brand-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {totalItems}
          </span>
        )}
      </div>

      {/* Empty state */}
      {state.items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center text-gray-400">
          <ShoppingBag size={40} className="mb-3 opacity-40" />
          <p className="text-sm">سبد خرید شما خالی است</p>
          <p className="text-xs mt-1 opacity-70">آیتم‌های مورد نظرتان را اضافه کنید</p>
        </div>
      )}

      {/* Cart items */}
      {state.items.length > 0 && (
        <div className="flex-1 overflow-y-auto max-h-72">
          {state.items.map(ci => (
            <div
              key={ci.item.id}
              className="cart-item-enter flex items-center justify-between px-4 py-3 border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addItem(ci.item)}
                  className="qty-btn w-7 h-7 rounded-full bg-brand-red text-white flex items-center justify-center hover:bg-brand-red-dark"
                >
                  <Plus size={12} />
                </button>
                <span className="text-sm font-bold text-brand-red w-5 text-center">{ci.quantity}</span>
                <button
                  onClick={() => decrementItem(ci.item.id)}
                  className="qty-btn w-7 h-7 rounded-full bg-gray-100 text-brand-red flex items-center justify-center hover:bg-gray-200"
                >
                  <Minus size={12} />
                </button>
              </div>

              <div className="flex-1 text-right mx-3">
                <p className="text-xs font-medium text-gray-700 line-clamp-2 leading-snug">{ci.item.name}</p>
                <p className="text-xs text-brand-red font-semibold mt-0.5">
                  {formatPrice(ci.item.price)} تومان
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Totals & checkout */}
      {state.items.length > 0 && (
        <div className="p-4 space-y-3">
          {/* Tax */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="price-display">{formatPrice(taxAmount)} تومان</span>
            <div className="flex items-center gap-1">
              <span>مالیات</span>
              <span className="text-xs bg-gray-100 text-gray-400 px-1 rounded">ⓘ</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between font-bold text-gray-800">
            <span className="price-display text-base">{formatPrice(grandTotal)} تومان</span>
            <span className="text-sm">هزینه‌ی کل</span>
          </div>

          {/* Discount code */}
          <div className="flex items-center gap-2 text-sm text-brand-red cursor-pointer hover:text-brand-red-dark">
            <Tag size={14} />
            <span>کد تخفیف دارید؟</span>
          </div>

          {/* Checkout button */}
          <button className="w-full bg-brand-red hover:bg-brand-red-dark text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-sm active:scale-95 transition-transform">
            تکمیل سفارش
          </button>
        </div>
      )}
    </aside>
  );
}
