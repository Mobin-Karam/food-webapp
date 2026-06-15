"use client";

import { useState } from "react";
import { Trash2, Plus, Minus, Tag, ShoppingBag } from "lucide-react";

import { useCart } from "@/features/cart/useCart";

function formatPrice(price: number): string {
  return price.toLocaleString("fa-IR");
}

export default function CartSidebar() {
  const {
    items,
    subtotal,
    taxAmount,
    grandTotal,
    totalItems,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useCart();

  const [discountCode, setDiscountCode] = useState("");

  const isEmpty = items.length === 0;

  return (
    <aside className="sticky top-20 flex h-fit flex-col rounded-xl bg-white shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          {!isEmpty && (
            <button
              onClick={clearCart}
              className="text-gray-400 transition hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          )}

          <span>سبد خرید</span>
        </div>

        {totalItems > 0 && (
          <span className="rounded-full bg-brand-red px-2 py-0.5 text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
      </div>

      {/* Empty State */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center px-4 py-12 text-center text-gray-400">
          <ShoppingBag size={40} className="mb-3 opacity-40" />

          <p className="text-sm">سبد خرید شما خالی است</p>

          <p className="mt-1 text-xs opacity-70">
            آیتم‌های مورد نظرتان را اضافه کنید
          </p>
        </div>
      )}

      {/* Items */}
      {!isEmpty && (
        <div className="max-h-72 flex-1 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="cart-item-enter flex items-center justify-between border-b border-gray-50 px-4 py-3 transition-colors hover:bg-gray-50/50"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => incrementItem(item.id)}
                  className="qty-btn flex h-7 w-7 items-center justify-center rounded-full bg-brand-red text-white hover:bg-brand-red-dark"
                >
                  <Plus size={12} />
                </button>

                <span className="w-5 text-center text-sm font-bold text-brand-red">
                  {item.quantity}
                </span>

                <button
                  onClick={() => decrementItem(item.id)}
                  className="qty-btn flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-brand-red hover:bg-gray-200"
                >
                  <Minus size={12} />
                </button>
              </div>

              <div className="mx-3 flex-1 text-right">
                <p className="line-clamp-2 text-xs font-medium leading-snug text-gray-700">
                  {item.name}
                </p>

                <p className="mt-0.5 text-xs font-semibold text-brand-red">
                  {formatPrice(item.price)} تومان
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-300 transition hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {!isEmpty && (
        <div className="space-y-3 p-4">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{formatPrice(subtotal)} تومان</span>

            <span>جمع سفارش</span>
          </div>

          {/* Tax */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{formatPrice(taxAmount)} تومان</span>

            <div className="flex items-center gap-1">
              <span>مالیات</span>

              <span className="rounded bg-gray-100 px-1 text-xs text-gray-400">
                ⓘ
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3 font-bold text-gray-800">
            <span className="text-base">{formatPrice(grandTotal)} تومان</span>

            <span className="text-sm">هزینه کل</span>
          </div>

          {/* Discount */}
          <div>
            <button className="flex items-center gap-2 text-sm text-brand-red transition hover:text-brand-red-dark">
              <Tag size={14} />
              <span>کد تخفیف دارید؟</span>
            </button>

            {discountCode && (
              <div className="mt-2 text-xs text-green-600">{discountCode}</div>
            )}
          </div>

          {/* Checkout */}
          <button className="w-full rounded-xl bg-brand-red py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-red-dark active:scale-95">
            تکمیل سفارش
          </button>
        </div>
      )}
    </aside>
  );
}
