'use client'
import HeaderSlider from "@/components/ui/HeaderSlider";
import ProductCard from "@/components/ui/product-card";
import CategoryCard from "@/components/ui/category-card";
import headphoneImg from "@/assets/header_headphone_image.png";
import macbookImg from "@/assets/header_macbook_image.png";
import playstationImg from "@/assets/header_playstation_image.png";
import React from "react";
import FeaturedBrands from "@/components/home/featured-brands";
import CustomerFeedback from "@/components/home/customer-feedback";
import ExploreOfferings from "@/components/home/explore-offerings";
import PopularReads from "@/components/home/popular-reads";
import CTASection from "@/components/home/cta-section";
import Footer from "@/components/home/footer";
const Home = () => {
  // Sample category data
  const categories = [
    { name: "Abrasives", icon: headphoneImg },
    { name: "Bearings", icon: macbookImg },
    { name: "Cutting Tools", icon: playstationImg },
    { name: "Electrical Supplies", icon: headphoneImg },
    { name: "Fasteners", icon: macbookImg },
    { name: "Hardware & Material", icon: playstationImg },
    { name: "Mechanical Power Transmission", icon: headphoneImg },
  ];

  return (
    <div className="container mx-auto px-4 ">
      <h1 className="text-3xl font-bold text-green-500">Welcome to Canadian Bearings</h1>
      <HeaderSlider />

      {/* Category Section */}
      <section className="my-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Shop Our Top Categories</h2>
          <a href="#" className="text-green-600 text-sm font-medium hover:underline">Explore All Categories</a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((cat, idx) => (
            <CategoryCard key={cat.name + idx} icon={cat.icon} name={cat.name} />
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
        <ProductCard className="mt-10" />
        <ProductCard className="mt-10" />
        <ProductCard className="mt-10" />
      </div>
      <FeaturedBrands />
      <CustomerFeedback />
      <ExploreOfferings />
      <PopularReads />
      <CTASection />
      <Footer />

    </div>
  );
};

export default Home;
