'use client';

import { MapPin, ChevronDown } from 'lucide-react';
import type { Vendor } from '@/types/vendors';

export default function HeroBanner({ vendor }: { vendor: Vendor }) {
  const isAcceptingOrders = vendor.acceptingOrders ?? vendor.isOpen;

  return (
    <div className="relative w-full h-48 md:h-56 overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/hero-bg.jpg')`,
          backgroundColor: '#8B4513',
        }}
      />

      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-8 text-white">

        <div className="flex items-start justify-between">

          <div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-2">

              <span
                className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                  isAcceptingOrders ? "bg-green-400" : "bg-red-400"
                }`}
              />

              <span
                className={`text-sm font-medium ${
                  isAcceptingOrders ? "text-green-300" : "text-red-300"
                }`}
              >
                {isAcceptingOrders ? "سفارش می‌پذیریم" : "در حال حاضر بسته است"}
              </span>

            </div>

            {/* Vendor name */}
            <h1 className="text-xl md:text-2xl font-bold mb-1">
              {vendor.name}
            </h1>

            {/* Address */}
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <MapPin size={14} />
              <span>{vendor.address ?? 'آدرس ثبت نشده'}</span>
            </div>

          </div>

          {/* Action */}
          <button className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-lg border border-white/30 transition-colors whitespace-nowrap">
            <span>تغییر شعبه</span>
            <ChevronDown size={14} />
          </button>

        </div>

      </div>
    </div>
  );
}