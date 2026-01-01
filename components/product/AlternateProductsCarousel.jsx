"use client";
import React, { useRef } from "react";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ui/product-card"; // Ensure path is correct

export default function AlternateProductsCarousel({ products }) {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = 320;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="my-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900">Alternate Products</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scrollCarousel("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-slate-900 transition-colors"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-slate-900 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {products.map((prod) => (
          <div
            key={prod.id}
            className="min-w-[100%] sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] snap-start"
          >
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    </section>
  );
}