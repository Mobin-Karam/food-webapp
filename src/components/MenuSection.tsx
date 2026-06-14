'use client';

import { Search, Share2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { menuItems, categories } from '@/data/menu';
import FoodCard from './FoodCard';
import CategoryBar from './CategoryBar';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const byCategory = menuItems.filter(item => item.categoryId === activeCategory);
    if (!searchQuery.trim()) return byCategory;
    return byCategory.filter(item =>
      item.name.includes(searchQuery) || item.description?.includes(searchQuery)
    );
  }, [activeCategory, searchQuery]);

  const activeCategoryLabel = categories.find(c => c.id === activeCategory)?.label ?? '';

  return (
    <div className="flex flex-col relative">
      {/* Tabs */}
      <CategoryBar activeCategory={activeCategory} onSelect={setActiveCategory} />

      {/* Search */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="جستجوی سریع"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 border-none outline-none rounded-lg pr-9 pl-4 py-2.5 text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Menu content */}
      <div className="p-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <button className="text-gray-400 hover:text-brand-red transition-colors">
            <Share2 size={18} />
          </button>
          <h2 className="text-base font-bold text-gray-800">{activeCategoryLabel}</h2>
        </div>

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredItems.map(item => (
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
