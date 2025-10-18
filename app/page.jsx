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
