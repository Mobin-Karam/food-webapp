"use client";

import { useRouter } from "next/navigation";
import { vendors } from "@/data/vendors";
import { useModal } from "@/components/Modal/ModalContext";
import { useVendor } from "@/context/VendorContext";
import { Vendor } from "@/types/vendors";
import { vendorBySlug } from "@/lib/slugIndex";

export function BranchSelector() {
  const { close } = useModal();
  const { setVendorById } = useVendor();
  const router = useRouter();

  const handleSelect = (slug: string) => {
    const vendor: Vendor = vendorBySlug[slug];

    if (!vendor) return;

    setVendorById(slug);

    close(); // close modal immediately

    router.push(`/order/${vendor.slug}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">انتخاب شعبه</h2>

      <div className="space-y-2">
        {Object.values(vendors).map((v: Vendor) => (
          <button
            key={v.id}
            onClick={() => handleSelect(v.slug)}
            className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition"
          >
            <div className="font-medium">{v.name}</div>
            <div className="text-xs text-gray-500">{v.address}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
