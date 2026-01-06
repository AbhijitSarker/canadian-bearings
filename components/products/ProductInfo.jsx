import React from "react";
import Link from "next/link";

export default function ProductInfo({ brand, title, subtitle, itemNumber, features, mfgSku, cbSku, custSKU }) {
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
        <div className="flex flex-wrap gap-2 pt-1">
          {mfgSku && (
            <span className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              MFG: {mfgSku}
            </span>
          )}
          {cbSku && (
            <span className="inline-flex items-center px-2 py-1 rounded bg-orange-50 text-orange-700 text-xs font-bold border border-orange-100">
              CB: {cbSku}
            </span>
          )}
          {custSKU && (
            <span className="inline-flex items-center px-2 py-1 rounded bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
              CUST: {custSKU}
            </span>
          )}
        </div>
      </div>

      <p className="mt-4 text-[15px] text-slate-600 leading-relaxed">
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            <span className="font-bold text-slate-900">{feature.name}:</span>{" "}
            <span>{feature.value}</span>
            {index < features.length - 1 && ", "}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}