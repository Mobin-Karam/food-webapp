"use client";

import { ShoppingCart, UserCircle2, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useCart } from "@/features/cart/useCart";

export default function Header() {
  const { totalItems } = useCart();
  const { auth, openModal } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Cart icon (mobile) */}
        <button className="relative md:hidden text-brand-red">
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>

        {/* Logo */}
        <Link
          href={"/"}
          className="text-brand-red font-bold text-xl tracking-tight"
        >
          TFC
        </Link>
        
        {/* Login / User button */}
        {auth.isLoggedIn ? (
          <div className="flex items-center gap-2 text-brand-red">
            <UserCircle2 size={28} strokeWidth={1.6} />
          </div>
        ) : (
          <button
            onClick={openModal}
            className="flex items-center gap-2 bg-brand-red text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-red-dark active:scale-95 transition-all"
          >
            <LogIn size={15} />
            <span>ورود</span>
          </button>
        )}
      </div>
    </header>
  );
}
