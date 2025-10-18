import HeaderSlider from "@/components/ui/HeaderSlider";
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
import CategorySlider from "@/components/home/CategorySlider";
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
    <div className="w-full">
      <HeaderSlider />

      {/* Category Section */}
      <section className="my-[70px] container mx-auto">
        <div className="md:flex justify-between items-center mb-[30px]">
          <h2 className="text-[40px] leading-[48px] font-[500] text-gray-800 mb-5 md:mb-0">Shop Our Top Categories</h2>
          <a href="#" className="text-green-600 text-[18px] leading-[100%] font-medium hover:underline">Explore All Categories</a>
        </div>
        <CategorySlider categories={categories} />
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
