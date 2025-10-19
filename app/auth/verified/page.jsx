"use client";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export default function VerifiedPage() {
  return (
    <div className="w-full md:w-1/2 p-6 md:p-16">
      <div className="flex flex-col items-center text-left bg-white px-0 md:px-6">
      {/* Verified Badge */}
      <div className="relative flex items-center justify-center w-28 h-28 mb-6">
        <div className="absolute inset-0 rounded-full bg-green-600/90 scale-110" 
             style={{ clipPath: "polygon(50% 0%, 61% 7%, 73% 7%, 85% 15%, 92% 27%, 92% 39%, 100% 50%, 92% 61%, 92% 73%, 85% 85%, 73% 92%, 61% 92%, 50% 100%, 39% 92%, 27% 92%, 15% 85%, 8% 73%, 8% 61%, 0% 50%, 8% 39%, 8% 27%, 15% 15%, 27% 8%, 39% 8%)" }}>
        </div>
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative z-10">
          <CheckIcon className="w-10 h-10 text-green-600" strokeWidth={3} />
        </div>
      </div>

      {/* Text Content */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Account Verified!
      </h2>
      <p className="text-gray-500 text-sm max-w-md text-center">
        Welcome aboard! Start your success journey with Canadian Bearings!
      </p>

      {/* CTA Button */}
      <Link
        href="/shop"
        className="mt-8 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-6 py-2 rounded-md transition"
      >
        Let’s Start Shopping
      </Link>
      </div>
    </div>
  );
}
