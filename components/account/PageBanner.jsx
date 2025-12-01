import React from "react";
import { Printer } from "lucide-react";

const AccountPageBanner = ({ title, onPrint }) => {
  return (
    <header className="w-full mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
          {title}
        </h1>
        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Printer size={16} />
          <span>Print</span>
        </button>
      </div>
    </header>
  );
};

export default AccountPageBanner;
