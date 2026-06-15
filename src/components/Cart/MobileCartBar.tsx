'use client';

import { useState } from 'react';
import CartSidebar from './CartSidebar';
import { useCart } from '@/features/cart/useCart';

export default function MobileCartBar() {
  const [open, setOpen] = useState(false);
  const { totalItems, grandTotal } = useCart();

  if (totalItems === 0) return null;

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      {open && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[80vh] overflow-auto">
          <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-2" />
          <div className="p-4">
            <CartSidebar />
          </div>
        </div>
      )}

      {/* Sticky bottom bar */}
      {!open && (
        <div
          className="md:hidden fixed bottom-4 left-4 right-4 z-30 bg-brand-red text-white rounded-xl flex items-center justify-between px-4 py-3 shadow-lg cursor-pointer active:scale-95 transition-transform"
          onClick={() => setOpen(true)}
        >
          <span className="text-sm font-bold price-display">
            {grandTotal.toLocaleString('fa-IR')} تومان
          </span>
          <span className="text-sm font-semibold">مشاهده سبد خرید</span>
          <span className="bg-white/20 text-xs font-bold px-2 py-0.5 rounded-full">
            {totalItems}
          </span>
        </div>
      )}
    </>
  );
}
