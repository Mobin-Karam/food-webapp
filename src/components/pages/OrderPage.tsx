"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CartSidebar from "@/components/CartSidebar";
import MenuSection from "@/components/MenuSection";
import RestaurantInfo from "@/components/RestaurantInfo";
import MobileCartBar from "@/components/MobileCartBar";

type Tab = "menu" | "info";

export default function OrderPage({ vendor }: { vendor: any }) {
  const [activeTab, setActiveTab] = useState<Tab>("menu");

  return (
    <div className="min-h-screen bg-gray-100 pb-24 md:pb-4">
      <Header />
      <HeroBanner vendor={vendor} />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-4 items-start">
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl overflow-hidden shadow-card">

              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                    activeTab === "info"
                      ? "text-brand-red border-b-2 border-brand-red"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  اطلاعات رستوران
                </button>

                <button
                  onClick={() => setActiveTab("menu")}
                  className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                    activeTab === "menu"
                      ? "text-brand-red border-b-2 border-brand-red"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  منوی سفارش
                </button>
              </div>

              {/* Content */}
              {activeTab === "menu" ? (
                <MenuSection
                  menuItems={vendor.menuItems}
                  categories={vendor.categories}
                />
              ) : (
                <RestaurantInfo vendor={vendor} />
              )}
            </div>
          </div>

          <div className="hidden md:block w-72 flex-shrink-0">
            <CartSidebar />
          </div>
        </div>
      </div>

      <MobileCartBar />
    </div>
  );
}