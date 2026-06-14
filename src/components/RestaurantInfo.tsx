"use client";

import { MapPin, Clock, Phone, Info } from "lucide-react";
import type { Vendor } from "@/types/vendors";

type Props = {
  vendor: Vendor;
};

export default function RestaurantInfo({ vendor }: Props) {
  return (
    <div className="p-5 space-y-5 text-right">
      <h2 className="text-base font-bold text-gray-800">اطلاعات رستوران</h2>

      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-brand-red mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400 mb-0.5">آدرس</p>
            <p className="text-sm text-gray-700">{vendor.address ?? "---"}</p>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="flex items-start gap-3">
          <Clock size={18} className="text-brand-red mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400 mb-0.5">ساعت کاری</p>

            <p className="text-sm text-gray-700">
              {vendor.openingHours?.weekdays ?? "—"}
            </p>

            {vendor.openingHours?.friday && (
              <p className="text-sm text-gray-700">
                جمعه: {vendor.openingHours.friday}
              </p>
            )}

            {vendor.openingHours?.saturday && (
              <p className="text-sm text-gray-700">
                شنبه: {vendor.openingHours.saturday}
              </p>
            )}

            {vendor.openingHours?.sunday && (
              <p className="text-sm text-gray-700">
                یکشنبه: {vendor.openingHours.sunday}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone size={18} className="text-brand-red mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400 mb-0.5">تلفن</p>
            <p className="text-sm text-gray-700">{vendor.phone ?? "---"}</p>
          </div>
        </div>

        {/* Description */}
        <div className="flex items-start gap-3">
          <Info size={18} className="text-brand-red mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400 mb-0.5">درباره ما</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {vendor.description ?? "---"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
