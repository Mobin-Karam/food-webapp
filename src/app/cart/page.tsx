"use client";

import CartSidebar from "@/components/Cart/CartSidebar";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
  const { state, grandTotal, taxAmount } = useCart();

  const [deliveryType, setDeliveryType] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [bank, setBank] = useState("mellat");
  const [notes, setNotes] = useState("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">

      {/* LEFT - checkout form */}
      <div className="lg:col-span-2 space-y-6">

        {/* Delivery */}
        <section className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-3">روش تحویل</h2>

          <div className="flex gap-3">
            <button
              onClick={() => setDeliveryType("delivery")}
              className={`px-4 py-2 rounded-lg border ${
                deliveryType === "delivery" ? "bg-red-500 text-white" : ""
              }`}
            >
              ارسال
            </button>

            <button
              onClick={() => setDeliveryType("pickup")}
              className={`px-4 py-2 rounded-lg border ${
                deliveryType === "pickup" ? "bg-red-500 text-white" : ""
              }`}
            >
              حضوری
            </button>
          </div>
        </section>

        {/* Payment */}
        <section className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-3">پرداخت</h2>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
              />
              پرداخت آنلاین
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              پرداخت در محل
            </label>
          </div>

          {paymentMethod === "online" && (
            <select
              className="mt-3 w-full border p-2 rounded"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="mellat">بانک ملت</option>
              <option value="saderat">بانک صادرات</option>
              <option value="melli">بانک ملی</option>
            </select>
          )}
        </section>

        {/* Notes */}
        <section className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-3">توضیحات سفارش</h2>

          <textarea
            className="w-full border rounded p-3"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="مثلاً بدون پیاز، تند نباشد..."
          />
        </section>

        {/* Loyalty */}
        <section className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-3">باشگاه مشتریان</h2>

          <div className="text-sm text-gray-500">
            امتیاز شما: 1200 امتیاز
          </div>

          <button className="mt-2 text-red-500 text-sm">
            استفاده از امتیاز
          </button>
        </section>
      </div>

      {/* RIGHT - cart summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-20">
          <CartSidebar />

          <div className="bg-white p-4 rounded-xl shadow mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>مالیات</span>
              <span>{taxAmount.toLocaleString("fa-IR")} تومان</span>
            </div>

            <div className="flex justify-between font-bold">
              <span>مجموع پرداختی</span>
              <span>{grandTotal.toLocaleString("fa-IR")} تومان</span>
            </div>

            <button className="w-full bg-green-600 text-white py-3 rounded-xl mt-3">
              پرداخت و ثبت سفارش
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}