import React from "react";
import Image from "next/image";

const CategoryCard = ({ icon, name }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer border border-gray-100 min-w-[120px]">
      <div className="w-16 h-16 flex items-center justify-center mb-2">
        {icon ? (
          <Image src={icon} alt={name} width={64} height={64} className="object-contain w-full h-full" />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-full" />
        )}
      </div>
      <span className="text-sm font-medium text-gray-700 text-center">{name}</span>
    </div>
  );
};

export default CategoryCard;
