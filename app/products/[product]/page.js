"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ProductBuyBox from "@/components/products/ProductBuyBox";
import ProductTabs from "@/components/products/ProductTabs";
import FeaturedProducts from "@/components/home/feature-products";
import Breadcrumb from "@/components/products/Breadcrumb";
import { getProductDetails } from "@/lib/api/services/products";
import ProductsPageSkeleton from "@/components/skeletons/ProductsPageSkeleton";

export default function ProductPage() {
  const params = useParams();
  const productUuid = params.product;
  
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productUuid) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await getProductDetails(productUuid);
        setProductData(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productUuid]);

  if (loading) {
    return <ProductsPageSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Error Loading Product</h2>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-slate-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Map API response to component props
  const images = productData.imageUrl 
    ? [productData.imageUrl] 
    : ["https://placehold.co/600x600/png"];

  const features = productData.technicalSpecs?.map(spec => 
    `${spec.name}: ${spec.value}${spec.unit ? ' ' + spec.unit : ''}`
  ) || [];

  const specs = productData.technicalSpecs?.map(spec => ({
    label: spec.name,
    value: `${spec.value}${spec.unit ? ' ' + spec.unit : ''}`
  })) || [];

  const mappedProduct = {
    prodId: productData.prodId,
    uniqueId: productData.uniqueId,
    brand: productData.brandName,
    title: productData.descriptions?.descriptionShort || productData.cbSku,
    subtitle: productData.descriptions?.descriptionShort || "",
    itemNumber: productData.mfgSku || productData.cbSku,
    mfgSku: productData.mfgSku,
    cbSku: productData.cbSku,
    custSKU: productData.custSKU || "",
    price: productData.price || 0,
    msrp: productData.msrp || productData.price,
    currency: "$",
    stockStatus: "Ready To ship",
    estimatedArrival: "Get estimated arrival date",
    features: features,
    description: productData.descriptions?.descriptionLong || productData.descriptions?.description || "",
    specs: specs,
    images: images,
    categoryName: productData.categoryName,
    unit: productData.unit,
  };

  return (
    <div className="min-h-screen bg-white pb-20 container mx-auto">
      <div className="container mx-auto max-w-[1400px] px-4 md:px-6 py-6">
        
        {/* Breadcrumb */}
        <Breadcrumb 
          categoryPath={[
            { name: mappedProduct.title, key: 'product' }
          ]}
        />
        
        {/* --- TOP SECTION (3 COLUMNS) --- */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-12 xl:gap-x-8">
          
          {/* COLUMN 1: Image Gallery (4 Cols) */}
          <div className="lg:col-span-4 xl:col-span-4">
            <ProductGallery images={mappedProduct.images} title={mappedProduct.title} />
          </div>

          {/* COLUMN 2: Product Information (5 Cols) */}
          <div className="lg:col-span-5 xl:col-span-5">
            <ProductInfo 
              brand={mappedProduct.brand}
              title={mappedProduct.title}
              subtitle={mappedProduct.subtitle}
              itemNumber={mappedProduct.itemNumber}
              features={mappedProduct.features}
            />
          </div>

          {/* COLUMN 3: Buy Box (3 Cols) */}
          <div className="lg:col-span-3 xl:col-span-3">
            <ProductBuyBox product={mappedProduct} />
          </div>
        </div>

        {/* --- BOTTOM SECTION (ALIGN WITH COL 1 & 2) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 xl:gap-x-8 mt-12">
          
          {/* Wrapper for Description + Tabs: Spans 9 Columns (Matches Col 1 + Col 2 above) */}
          <div className="lg:col-span-9">
            
            {/* Product Description */}
            {mappedProduct.description && (
              <section className="mb-12">
                <h2 className="mb-4 text-3xl font-bold text-slate-900 tracking-tight">Product Details</h2>
                <p className="leading-relaxed text-slate-600 text-[15px] max-w-4xl">
                  {mappedProduct.description}
                </p>
              </section>
            )}

            {/* Tabs */}
            <div className="mb-16">
              <ProductTabs 
                productUuid={mappedProduct.uniqueId}
                custSKU={mappedProduct.custSKU}
                cbSku={mappedProduct.cbSku}
                specs={mappedProduct.specs} 
              />
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