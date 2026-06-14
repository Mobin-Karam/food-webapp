import { vendors } from "@/data/vendors";
import { Vendor } from "@/types/vendors";

export const vendorBySlug: Record<string, Vendor> = Object.fromEntries(
  Object.values(vendors).map(v => [v.slug, v])
);