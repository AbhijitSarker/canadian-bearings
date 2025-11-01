"use client";

import Link from "next/link";
import { Printer, Download } from "lucide-react";

export default function HeaderBanner({ title, subtitle, onPrint, onExport }) {
  return (
    <div className="bg-[#E8F4F8] py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span>›</span>
          <span className="text-gray-400">{title}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-medium text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
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
      </div>
    </div>
  );
}
