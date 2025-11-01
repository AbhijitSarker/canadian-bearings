import HeaderSlider from "@/components/ui/HeaderSlider";
import React from "react";
import FeaturedBrands from "@/components/home/featured-brands";
import CustomerFeedback from "@/components/home/customer-feedback";
import ExploreOfferings from "@/components/home/explore-offerings";
import PopularReads from "@/components/home/popular-reads";
import CTASection from "@/components/home/cta-section";
import CategorySlider from "@/components/home/CategorySlider";
import FeaturedProducts from "@/components/home/feature-products";
import ProtectedRoute from "@/components/auth/ProtectedRoute";


const Home = () => {

  return (
    <ProtectedRoute>
      <div className="w-full">
        <HeaderSlider />
        <CategorySlider />
        <FeaturedProducts />
        <FeaturedBrands />
        <CustomerFeedback />
        <ExploreOfferings />
        <PopularReads />
        <CTASection />
      </div>
    </ProtectedRoute>
  );
};

export default Home;
