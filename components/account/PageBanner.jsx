import React from "react";
import greenBanner from "@/assets/blueBanner.svg";
import { Download, Printer } from "lucide-react";

const AccountPageBanner = ({ title, subtitle, onPrint, onExport }) => {

  const bgUrl = typeof greenBanner === "string" ? greenBanner : (greenBanner?.src ?? greenBanner?.default ?? null);
  
  return (
    <header className="relative w-full">
      <div 
        className="mx-3 sm:mx-4 lg:mx-6 my-4 sm:my-6 lg:my-8 p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-2xl lg:rounded-3xl bg-cover bg-no-repeat flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 lg:gap-8"
        style={{
          backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
          backgroundPosition: 'center',
          backgroundColor: bgUrl ? undefined : '#f6fef3'
        }}
      >
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[46px] font-semibold text-neutral-950 break-words">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 sm:mt-3 lg:mt-4 text-xs sm:text-sm lg:text-base text-[#5c5c5c] font-light line-clamp-3">
              {subtitle}
            </p>
          ) : (
            <p className="mt-2 sm:mt-3 lg:mt-4 text-xs sm:text-sm lg:text-base text-[#5c5c5c] font-light tracking-wider line-clamp-3">
              We have over 430 Service Centers conveniently located across North America. Please use the search form below to find the Canadian Service Center near you.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={onPrint}
            className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition text-xs sm:text-sm font-medium whitespace-nowrap"
          >
            <Printer size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="">Print</span>
          </button>
          <button
            onClick={onExport}
            className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition text-xs sm:text-sm font-medium whitespace-nowrap"
          >
            <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AccountPageBanner;
