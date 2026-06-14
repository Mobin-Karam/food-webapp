import { Search, Share2 } from "lucide-react";
import { useState, useMemo } from "react";
import type { Vendor } from "@/types/vendors";
import FoodCard from "./FoodCard/FoodCard";
import CategoryBar from "./CategoryBar";
import { useNotification } from "@/context/NotificationContext";

type Props = {
  vendor: Vendor;
};

export default function MenuSection({ vendor }: Props) {
  const [activeCategory, setActiveCategory] = useState(
    vendor.categories?.[0]?.id,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const { show } = useNotification();

  const filteredItems = useMemo(() => {
    const byCategory = vendor.menuItems?.filter(
      (item) => item.categoryId === activeCategory,
    );

    if (!searchQuery.trim()) return byCategory;

    const q = searchQuery.toLowerCase();

    return byCategory.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q),
    );
  }, [vendor.menuItems, activeCategory, searchQuery]);

  const activeCategoryLabel =
    vendor.categories?.find((c) => c.id === activeCategory)?.label ?? "";

  const handleShare = async () => {
    const shareData = {
      title: activeCategoryLabel,
      text: `منوی ${activeCategoryLabel} را ببینید`,
      url: window.location.href,
    };

    try {
      // Mobile / modern browsers
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      // Fallback (desktop)
      await navigator.clipboard.writeText(window.location.href);

      show("لینک کپی شد");
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="flex flex-col relative">
      <CategoryBar
        categories={vendor.categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="relative">
          <Search
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="جستجوی سریع"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 border-none outline-none rounded-lg pr-9 pl-4 py-2.5 text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleShare}
            className="text-gray-400 hover:text-brand-red transition-colors"
          >
            <Share2 size={18} />
          </button>
          <h2 className="text-base font-bold text-gray-800">
            {activeCategoryLabel}
          </h2>
        </div>

        {filteredItems?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-16 text-gray-400">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-sm">موردی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
}
