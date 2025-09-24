"use client"

import { ArrowRight } from "lucide-react"

export default function FeaturedBrands() {
  const brands = [
    { name: "Layers", color: "bg-purple-100 text-purple-600" },
    { name: "Sisyphus", color: "bg-green-100 text-green-600" },
    { name: "Circooles", color: "bg-blue-100 text-blue-600" },
    { name: "Catalog", color: "bg-gray-100 text-gray-600" },
    { name: "Quotient", color: "bg-purple-100 text-purple-600" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Brands</h2>
          <button className="text-green-600 hover:text-green-700 flex items-center space-x-1">
            <span>Explore All Brands</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-center space-x-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className={`px-6 py-3 rounded-full ${brand.color} font-semibold cursor-pointer hover:scale-105 transition-transform`}
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
