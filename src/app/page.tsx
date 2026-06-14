import Link from "next/link";
import { vendors } from "@/data/vendors";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Choose Restaurant</h1>

      <div className="grid gap-3">
        {Object.entries(vendors).map(([slug, v]) => (
          <Link
            key={slug}
            href={`/order/${slug}`}
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            {v.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
