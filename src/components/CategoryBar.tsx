"use client";

import { Category } from "@/types/menu";
import Image from "next/image";


type Props = {
  categories: readonly Category[];
  activeCategory: string;
  onSelect: (id: string) => void;
};

export default function CategoryBar({
  categories,
  activeCategory,
  onSelect,
}: Props) {
  return (
    <div className="bg-white border-b border-gray-100 overflow-x-auto">
      <div className="flex min-w-max">
        {categories?.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex flex-col items-center gap-1.5 px-4 py-3 text-xs font-medium transition-colors whitespace-nowrap border-b-2
                ${
                  isActive
                    ? "border-brand-red text-brand-red"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src={isActive ? cat.iconOrange : cat.iconWhite}
                  alt={cat.label}
                  fill
                  sizes="32px"
                  className="object-contain"
                  style={
                    isActive ? undefined : { filter: "brightness(0) invert(0.6)" }
                  }
                />
              </div>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}