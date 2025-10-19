import HeaderSlider from "@/components/ui/HeaderSlider";
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

  return (
    <div className="w-full">
      <HeaderSlider />
      <CategorySlider />
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
