import Link from "next/link";
import Image from "next/image";
import { vendors } from "@/data/vendors";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="bg"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Card */}
        <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 w-full max-w-md shadow-xl">
          {/* Title */}
          <h1 className="text-lg font-bold text-center mb-4">
            لطفاً شعبه مورد نظر خود را انتخاب کنید
          </h1>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(vendors).map(([slug, v]) => (
              <Link
                key={slug}
                href={`/order/${slug}`}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white hover:bg-gray-50 transition border"
              >
                <div className="w-10 h-10 relative">
                  <Image
                    src={v.logo || "/images/default-logo.png"}
                    alt={v.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <span className="text-xs font-medium text-center">
                  {v.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}
