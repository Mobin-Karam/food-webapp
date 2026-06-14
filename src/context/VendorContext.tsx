"use client";

import { createContext, useContext, useState } from "react";
import { Vendor } from "@/types/vendors";
import { vendors } from "@/data/vendors";

type VendorContextType = {
  vendor: Vendor | null;
  setVendorById: (id: string) => void;
};

const VendorContext = createContext<VendorContextType | null>(null);

export function VendorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [vendor, setVendor] = useState<Vendor | null>(vendors["1"]);

  const setVendorById = (id: string) => {
    setVendor(vendors[id] ?? null);
  };

  return (
    <VendorContext.Provider value={{ vendor, setVendorById }}>
      {children}
    </VendorContext.Provider>
  );
}

export const useVendor = () => {
  const ctx = useContext(VendorContext);
  if (!ctx) throw new Error("useVendor must be used inside VendorProvider");
  return ctx;
};