"use client";

import Image from "next/image";
import { Send, MessageCircle } from "lucide-react";
import type { Vendor } from "@/types/vendors";

export default function Footer({ vendor }: { vendor: Vendor }) {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Social Media (vendor-driven) */}
        <div className="flex items-center justify-center gap-6 text-gray-600">
          {vendor.social?.instagram && (
            <a
              href={vendor.social.instagram}
              target="_blank"
              className="flex items-center gap-1 hover:text-pink-500 transition"
            >
         
              <span className="text-sm">اینستاگرام</span>
            </a>
          )}

          {vendor.social?.telegram && (
            <a
              href={vendor.social.telegram}
              target="_blank"
              className="flex items-center gap-1 hover:text-blue-500 transition"
            >
              <Send size={18} />
              <span className="text-sm">تلگرام</span>
            </a>
          )}

          {vendor.social?.bale && (
            <a
              href={vendor.social.bale}
              target="_blank"
              className="flex items-center gap-1 hover:text-green-600 transition"
            >
              <MessageCircle size={18} />
              <span className="text-sm">بله</span>
            </a>
          )}
        </div>

        {/* Center Branding */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="relative w-12 h-12">
            <Image
              src={vendor.logo || "/images/logo.png"}
              alt={vendor.name}
              fill
              className="object-contain"
            />
          </div>

          <p className="text-xs text-gray-500">نسخه سیستم: ۱.۰.۰</p>
        </div>

        {/* Footer Bottom */}
        <div className="border-t pt-4 text-center space-y-2">
          <p className="text-xs text-gray-500">
            © تمامی حقوق متعلق به {vendor.name} محفوظ است
          </p>

          <p className="text-xs text-gray-400">
            ساخته شده با ❤️ توسط استارتاپ Koonj
          </p>
        </div>
      </div>
    </footer>
  );
}
