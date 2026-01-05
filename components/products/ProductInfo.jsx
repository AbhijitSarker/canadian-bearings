import React from "react";
import Link from "next/link";

export default function ProductInfo({ brand, title, subtitle, itemNumber, features }) {
  return (
    <div className="flex flex-col gap-3">
      <Link href="#" className="text-sm font-bold text-[#E65100] uppercase tracking-wide hover:underline">
        {brand}
      </Link>

      <h1 className="text-[34px] font-bold leading-tight tracking-tight text-slate-900">
        {title}
      </h1>

      <div className="space-y-3">
        {subtitle && (
          <p className="text-[15px] font-normal text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        )}
        <p className="text-[13px] font-medium text-slate-500 flex items-center gap-1">
          <span className="uppercase">Item</span> #{itemNumber}
        </p>
      </div>

      <ul className="mt-4 space-y-2.5">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2.5 text-[15px] text-slate-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
            <span className="leading-snug">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}