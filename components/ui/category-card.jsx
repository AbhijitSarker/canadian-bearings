import React from "react";
import Image from "next/image";

const CategoryCard = ({ icon, name }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-[10px] pt-4 px-3 pb-2 cursor-pointer border border-neutral-200">
      <div className="w-[76px] h-[76px] flex items-center justify-center rounded-[40px] bg-neutral-50 overflow-hidden">
        {icon ? (
          <Image src={icon} alt={name} width={62} height={62} className="object-contain w-full h-full" />
        ) : (
          <div className="w-full h-full rounded-[40px] bg-neutral-50" />
        )}
      </div>
      <span className="text-[16px] leading-[16px] font-[300] text-gray-800 text-center mt-[15px]">{name}</span>
    </div>
  );
};

export default CategoryCard;
