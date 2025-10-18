"use client"

import Image from "next/image"

import layersBrand from '@/assets/brands/layers_brand.png'
import sisyphusBrand from '@/assets/brands/sisyphus_brand.png'
import circoolesBrand from '@/assets/brands/circooles_brand.png'
import catalogBrand from '@/assets/brands/catalog_brand.png'
import quotientBrand from '@/assets/brands/quotient_brand.png'


export default function FeaturedBrands() {
  const brands = [
    { name: "Layers", image: layersBrand },
    { name: "Sisyphus", image: sisyphusBrand },
    { name: "Circooles", image: circoolesBrand },
    { name: "Catalog", image: catalogBrand },
    { name: "Quotient", image: quotientBrand },
  ]

  return (
    <section className="bg-[#D7EAF4]">
      <div className="container mx-auto py-[64px]" >
        <div className="md:flex justify-between items-start mb-8">
          <div>
            <div className="text-[40px] leading-[48px] font-[500] text-gray-800">Featured Brands</div>
            <div className="text-[20px] leading-[30px] font-[300] text-gray-500 mt-[12px]">We’ve provide 200+ companies product for our customer.</div>
          </div>
          <button className="text-green-600 hover:text-green-700 flex items-center space-x-1 text-[18px] leading-[100%] font-[400] mt-5 md:mt-0">
            <span>Explore All Brands</span>
          </button>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-5">
          {brands.map((brand, index) => (
            <div key={index} className="flex items-center gap-x-[14px]">
              <Image 
                src={brand.image}
                alt={brand.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
