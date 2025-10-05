'use client'
import TopHeader from "@/components/common/topHeader";
import Navbar from "@/components/common/navbar_2";
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
import ArrowLeftSLineIcon from "@/assets/icons/arrowLeftSLine";
import ArrowRightSLineIcon from "@/assets/icons/arrowRightSLine";
import FeaturedProducts from "@/components/home/feature-products";



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
    { name: "Mechanical Power Transmission", icon: headphoneImg },
    { name: "Mechanical Power Transmission", icon: headphoneImg },
    { name: "Mechanical Power Transmission", icon: headphoneImg },
    { name: "Mechanical Power Transmission", icon: headphoneImg },
  ];

  return (
    <div className="max-w-[1440px] w-full mx-auto">
      <TopHeader bgColor="bg-green-600" textColor="text-white" iconColor="white" />
      <Navbar/>
      <HeaderSlider />

      {/* Category Section */}
      <section className="my-[70px] md:px-[80px] px-[20px] w-full mx-auto">
        <div className="flex justify-between items-center mb-[30px]">
          <h2 className="text-[40px] leading-[48px] font-[500] text-gray-800">Shop Our Top Categories</h2>
          <a href="#" className="text-green-600 text-[18px] leading-[100%] font-medium hover:underline">Explore All Categories</a>
        </div>
        <div className="grid md:grid-cols-4 xl:grid-cols-7 sm:grid-cols-3 grid-cols-2 gap-[15px]">
          {categories.map((cat, idx) => (
            
              <CategoryCard key={cat.name + idx} icon={cat.icon} name={cat.name} />
            
          ))}
          </div>
      </section>


      <FeaturedProducts />


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
