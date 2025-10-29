"use client"
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import ListUnorderedIcon from "@/assets/icons/listUnordered";
import MapPinLineIcon from "@/assets/icons/mapPinLine";

export default function LowerNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-[#324a50] text-neutral-0" role="navigation" aria-label="Lower navigation">
      <div className="container mx-auto px-4">
        {/* Desktop & Tablet Layout */}
        <div className="hidden md:flex items-center gap-x-2 justify-between py-2">
          <div className="flex items-center gap-x-3">
            <button
              className="flex items-center gap-2 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.09)] border border-[rgba(255,255,255,0.08)] text-white px-3 py-1 rounded-full text-sm"
              aria-label="All Products"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              <span className="whitespace-nowrap">All Product</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-8">
            <Link href="#" className="text-white text-sm hover:underline">
              Product
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Brands
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Services
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Resource
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Industries
            </Link>
          </div>

          <div className="flex items-center lg:max-w-[467px] w-full justify-end gap-x-3">
            <div className="flex items-center pr-[10px] border-r border-[rgba(255,255,255,0.08)] gap-x-[6px] text-[14px] leading-[100%] text-white font-[400] whitespace-nowrap">
              <ListUnorderedIcon />
              Quick Order
            </div>
            <div className="flex items-center px-[10px] gap-x-[6px] text-[14px] leading-[100%] text-white font-[400] whitespace-nowrap">
              <MapPinLineIcon />
              Location
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-2">
            <div>
              <button
                className="flex items-center gap-2 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] text-white px-3 py-1 rounded-full text-sm"
                aria-label="All Products"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                <span className="whitespace-nowrap">All Product</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2"
                aria-label="Toggle menu"
              >
                <Menu />
              </button>

              <div className="flex items-center">
                <MapPinLineIcon />
              </div>
            </div>
          </div>

          {/* Scrollable center links on small screens */}
          <div className="flex items-center gap-3">
            <div className="flex gap-4 items-center overflow-x-auto w-full md:hidden py-1 px-1">
              <Link href="#" className="text-white text-sm whitespace-nowrap px-2">
                Product
              </Link>
              <Link href="#" className="text-white text-sm whitespace-nowrap px-2">
                Brands
              </Link>
              <Link href="#" className="text-white text-sm whitespace-nowrap px-2">
                Services
              </Link>
              <Link href="#" className="text-white text-sm whitespace-nowrap px-2">
                Resource
              </Link>
              <Link href="#" className="text-white text-sm whitespace-nowrap px-2">
                Industries
              </Link>
            </div>
          </div>

          {/* Mobile Menu (drawer-like) */}
          {mobileOpen && (
            <div className="mt-3 bg-white rounded-lg shadow-lg p-4 space-y-3 text-neutral-950">
              <div className="flex flex-col">
                <Link href="#" className="py-2">Product</Link>
                <Link href="#" className="py-2">Brands</Link>
                <Link href="#" className="py-2">Services</Link>
                <Link href="#" className="py-2">Resource</Link>
                <Link href="#" className="py-2">Industries</Link>
              </div>
              <div className="border-t pt-3 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <ListUnorderedIcon />
                  Quick Order
                </div>
                <div className="flex items-center gap-2">
                  <MapPinLineIcon />
                  Location
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
