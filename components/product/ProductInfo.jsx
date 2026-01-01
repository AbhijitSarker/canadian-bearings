import React from "react";
import Link from "next/link";

export default function ProductInfo({ brand, title, subtitle, itemNumber, features }) {
  return (
    <div className="flex flex-col gap-4">
      <Link href="#" className="text-sm font-bold text-orange-600 hover:underline">
        {brand}
      </Link>

      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
        {title}
      </h1>

      <div className="space-y-2">
        <p className="text-lg text-slate-700">{subtitle}</p>
        <p className="text-sm font-medium text-gray-500">
          ITEM #{itemNumber}
        </p>
      </div>

      <ul className="mt-4 space-y-2 pl-4">
        {features.map((feature, index) => (
          <li key={index} className="list-disc text-slate-700">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}