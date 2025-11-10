import React from "react";
import greenBanner from "@/assets/blueBanner.svg";
import { Download, Printer } from "lucide-react";

const AccountPageBanner = ({ title, subtitle, onPrint, onExport }) => {

  const bgUrl = typeof greenBanner === "string" ? greenBanner : (greenBanner?.src ?? greenBanner?.default ?? null);
  
  return (
    <header
      className="relative container mx-auto p-4 bg-cover bg-no-repeat rounded-3xl"
    >
      <div className="p-8 container mx-auto flex flex-row justify-between items-center rounded-xl"
        style={{
          backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
          backgroundPosition: 'center',
          backgroundColor: bgUrl ? undefined : '#f6fef3'
        }}
        >
        <div className="max-w-5xl">
          <h1 className="text-[46px] font-semibold text-neutral-950">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-base text-[#5c5c5c] font-light">{subtitle}</p>
          ) : (
              <p className="mt-4 text-base text-[#5c5c5c]  font-light tracking-wider">We have over 430 Service Centers conveniently located across North America. Please use the search form below to find the Canadian Service Center near you.</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            <Printer size={18} />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AccountPageBanner;
