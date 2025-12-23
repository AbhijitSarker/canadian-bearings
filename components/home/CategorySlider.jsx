"use client";
import Link from "next/link";
import React, { useState } from "react";
import CategoryCard from "@/components/ui/category-card";

// Add custom CSS to hide scrollbar
const styles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Arrow Icons as inline SVGs
const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CategorySlider = ({ categories = [], onCategoryClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = React.useRef(null);

  // Responsive items per view
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 6;
    const width = window.innerWidth;
    if (width < 640) return 2; // mobile
    if (width < 768) return 3; // tablet
    if (width < 1024) return 4; // small desktop
    if (width < 1280) return 5; // medium desktop
    return 6; // large desktop
  };

  const [itemsPerView, setItemsPerView] = React.useState(getItemsPerView());

  React.useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  if (!categories || categories.length === 0) return null;

  return (
    <div className="w-full my-8">
      <style>{styles}</style>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row  md:items-center justify-between mb-8">
          <h2 className="text-4xl font-medium text-gray-800">Categories</h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Previous Arrow - Hidden on mobile */}
          {!isMobile && (
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
            >
              <ArrowLeft />
            </button>
          )}

          {/* Cards Container - Swipeable on mobile */}
          <div
            ref={scrollContainerRef}
            className={`overflow-x-auto ${isMobile ? 'snap-x snap-mandatory scrollbar-hide' : 'overflow-hidden'}`}
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div
              className={`flex gap-4 ${!isMobile ? 'transition-transform duration-300 ease-in-out' : ''}`}
              style={!isMobile ? {
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
              } : {}}
            >
              {categories.map((cat, idx) => (
                <div
                  key={cat.key || idx}
                  className={`flex-shrink-0 ${isMobile ? 'snap-start' : ''}`}
                  onClick={() => onCategoryClick && onCategoryClick(cat)}
                >
                  <CategoryCard icon={cat.imageUrl || cat.icon || "/placeholder.png"} name={cat.name} />
                </div>
              ))}
              {/* Add extra spacing at the end on mobile to show peek */}
              {isMobile && <div className="w-4 flex-shrink-0" />}
            </div>
          </div>

          {/* Next Arrow - Hidden on mobile */}
          {!isMobile && (
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all ${currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
            >
              <ArrowRight />
            </button>
          )}
        </div>

        {/* Pagination Dots - Hidden on mobile */}
        {!isMobile && maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-green-600 w-6' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        )} 
      </div>
    </div>
  );
};

export default CategorySlider;