import React from "react";

// Category Card Component (kept consistent with CategorySlider)
const CategoryCard = ({ icon, name }) => {
  // Support imported image modules (object with .src) or plain URL strings
  const src = typeof icon === 'string' ? icon : (icon && (icon.src || icon.default || icon.url)) || '';

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 cursor-pointer border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-200 w-[170px] h-[170px]">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-50 mb-4">
        <img src={src} alt={name} className="w-16 h-16 object-contain" />
      </div>
      <span className="text-base font-light text-gray-800 text-center leading-4">{name}</span>
    </div>
  );
};

export default CategoryCard;
