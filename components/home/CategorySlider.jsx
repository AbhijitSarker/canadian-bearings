"use client";
import Link from "next/link";
import React, { useState } from "react";

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

// Category Card Component
const CategoryCard = ({ icon, name }) => (
  <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 cursor-pointer border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-200 w-[170px] h-[170px]">
    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-50 mb-4">
      <img src={icon} alt={name} className="w-16 h-16 rounded-full object-contain" />
    </div>
    <span className="text-base font-light text-gray-800 text-center leading-4">{name}</span>
  </div>
);

const CategorySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = React.useRef(null);

  // Sample category data with placeholder images
  const categories = [
    { name: "Abrasives", icon: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=100&h=100&fit=crop" },
    { name: "Bearings", icon: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100&h=100&fit=crop" },
    { name: "Cutting Tools", icon: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&h=100&fit=crop" },
    { name: "Electrical Supplies", icon: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop" },
    { name: "Fasteners", icon: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100&h=100&fit=crop" },
    { name: "Hardware & Material", icon: "https://images.unsplash.com/photo-1581092918484-8313e1f7f1a8?w=100&h=100&fit=crop" },
    { name: "Mechanical Power Transmission", icon: "https://images.unsplash.com/photo-1581092918119-e3d1e8f675f6?w=100&h=100&fit=crop" },
    { name: "Tools", icon: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=100&h=100&fit=crop" },
    { name: "Safety Equipment", icon: "https://images.unsplash.com/photo-1588783952862-ff6d285783cc?w=100&h=100&fit=crop" },
  ];

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

  return (
    <div className="w-full my-8">
      <style>{styles}</style>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row  md:items-center justify-between mb-8">
          <h2 className="text-4xl font-medium text-gray-800">Shop Our Top Categories</h2>
          <Link href="/categories" className="text-green-600 hover:text-green-700 font-medium text-sm sm:text-base my-4 md:my-0">
            Explore All Categories
          </Link>
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
                  key={idx}
                  className={`flex-shrink-0 ${isMobile ? 'snap-start' : ''}`}
                >
                  <CategoryCard icon={cat.icon} name={cat.name} />
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
        {!isMobile && (
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