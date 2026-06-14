import OrderPage from "@/components/pages/OrderPage";
import { vendors } from "@/data/vendors";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const vendor = Object.values(vendors).find((v) => v.slug === slug);

  if (!vendor) return notFound();

  return <OrderPage vendor={vendor} />;
}
