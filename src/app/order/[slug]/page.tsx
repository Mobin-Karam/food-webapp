import OrderPage from "@/components/pages/OrderPage";
import { vendors, type VendorId } from "@/data/vendors";
import { notFound } from "next/navigation";

export default function Page({
  params,
}: {
  params: { slug: VendorId };
}) {
  const vendor = vendors[params.slug];

  if (!vendor) return notFound();

  return <OrderPage vendor={vendor} />;
}