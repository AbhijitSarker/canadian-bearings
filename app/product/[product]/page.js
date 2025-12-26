"use client";

import React from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductBuyBox from "@/components/product/ProductBuyBox";
import ProductTabs from "@/components/product/ProductTabs";
import FeaturedProducts from "@/components/home/feature-products";

// --- FAKE DATA ---
const productData = {
  brand: "SKF",
  title: "SKF 6203 2ZJEM",
  subtitle: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
  itemNumber: "04166801",
  price: 31.89,
  msrp: 35.99,
  currency: "$",
  stockStatus: "Ready To ship",
  estimatedArrival: "Get estimated arrival date",
  features: [
    "Deep Groove Bearing",
    "2.17 in Inner Diameter",
    "4.72 in Outer Diameter",
    "1.14 in Width",
    "Bearing Steel Material",
    "Cylindrical O.D",
    "1.14 in Outer Ring Width",
    "Single Row",
    "Metric",
  ],
  description:
    "A must see. The welcoming foyer leads to a stunning formal dining or to the magnificent great room. The updated open kitchen has Quartz countertops, an over-the-cooktop hood vent, coffee bar, a wonderful pantry and updated lighting! The mud room has convenient & functional built-in cabinet lockers.",
  specs: [
    { label: "Bearing Type", value: "Deep Groove" },
    { label: "O.D. Type", value: "Cylindrical" },
    { label: "Cage Material", value: "Bearing Steel" },
    { label: "O.D.", value: "4.72 in, 120 mm" },
    { label: "Width", value: "1.14 in, 29 mm" },
    { label: "Inch/Metric", value: "Metric" },
    { label: "Outer Ring Width", value: "1.14 in, 29 mm" },
  ],
  images: [
    "https://placehold.co/600x600/png",
    "https://placehold.co/150x150/png",
    "https://placehold.co/150x150/png",
    "https://placehold.co/150x150/png",
  ],
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-slate-800">
      <div className="container mx-auto max-w-[1400px] px-4 md:px-6 py-6">
        
        {/* --- TOP SECTION (3 COLUMNS) --- */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-12 xl:gap-x-8">
          
          {/* COLUMN 1: Image Gallery (4 Cols) */}
          <div className="lg:col-span-4 xl:col-span-4">
            <ProductGallery images={productData.images} title={productData.title} />
          </div>

          {/* COLUMN 2: Product Information (5 Cols) */}
          <div className="lg:col-span-5 xl:col-span-5">
            <ProductInfo 
              brand={productData.brand}
              title={productData.title}
              subtitle={productData.subtitle}
              itemNumber={productData.itemNumber}
              features={productData.features}
            />
          </div>

          {/* COLUMN 3: Buy Box (3 Cols) */}
          <div className="lg:col-span-3 xl:col-span-3">
            <ProductBuyBox product={productData} />
          </div>
        </div>

        {/* --- BOTTOM SECTION (ALIGN WITH COL 1 & 2) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 xl:gap-x-8 mt-12">
          
          {/* Wrapper for Description + Tabs: Spans 9 Columns (Matches Col 1 + Col 2 above) */}
          <div className="lg:col-span-9">
            
            {/* Product Description */}
            <section className="mb-12">
              <h2 className="mb-4 text-3xl font-bold text-slate-900 tracking-tight">Product Details</h2>
              <p className="leading-relaxed text-slate-600 text-[15px] max-w-4xl">
                {productData.description}
              </p>
              <button className="mt-3 text-sm font-bold text-slate-900 hover:underline">
                Read More...
              </button>
            </section>

            {/* Tabs */}
            <div className="mb-16">
              <ProductTabs specs={productData.specs} />
            </div>
          </div>
        </div>

        {/* --- ALTERNATE PRODUCTS / FEATURED --- */}
        <FeaturedProducts />
      </div>

      {/* --- FOOTER BANNER --- */}
      <section className="relative h-[400px] w-full overflow-hidden bg-slate-900 mt-10">
        <div className="absolute inset-0">
          <img
            src="https://placehold.co/1600x400/png"
            alt="Footer Banner"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent"></div>
        </div>

        <div className="container relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1]">
            WE'RE BETTER <br /> TOGETHER
          </h2>
          <p className="mt-4 max-w-lg text-lg text-slate-200">
            Sign up today and get the benefit of ordering faster, saving product lists and submitting online quotes.
          </p>
          <button className="mt-8 w-fit rounded-md bg-[#4a8b3c] px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#3a6f2f] shadow-lg">
            Register Now
          </button>
        </div>
      </section>
    </div>
  );
}