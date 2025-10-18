'use client'
import TopHeader from "@/components/common/topHeader";
import Navbar from "@/components/common/navbar";
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
import Slider from "react-slick";
import ArrowLeftSLineIcon from "@/assets/icons/arrowLeftSLine";
import ArrowRightSLineIcon from "@/assets/icons/arrowRightSLine";
import FeaturedProducts from "@/components/home/feature-products";

var category_settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 7,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1280, // <= 1280px
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1024, // <= 1024px (tablet landscape)
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 768, // <= 768px (tablet portrait)
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480, // <= 480px (mobile)
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !flex !items-center !justify-center !bg-green-50 !rounded-full !w-10 !h-10`}
      style={{ ...style, right: "-20px", zIndex: 10 }}
      onClick={onClick}
    >
      <ArrowRightSLineIcon />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !flex !items-center !justify-center !bg-green-50 !rounded-full !w-10 !h-10`}
      style={{ ...style, left: "-20px", zIndex: 10 }}
      onClick={onClick}
    >
      <ArrowLeftSLineIcon />
    </div>
  );
}



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
      <TopHeader/>
      <Navbar/>
      <HeaderSlider />

      {/* Category Section */}
      <section className="my-[70px] md:px-[80px] px-[20px] mx-auto">
        <div className="md:flex justify-between items-center mb-[30px]">
          <h2 className="text-[40px] leading-[48px] font-[500] text-gray-800 mb-5 md:mb-0">Shop Our Top Categories</h2>
          <a href="#" className="text-green-600 text-[18px] leading-[100%] font-medium hover:underline">Explore All Categories</a>
        </div>
        <Slider {...category_settings}>
          {categories.map((cat, idx) => (
            // <div>
              <CategoryCard key={cat.name + idx} icon={cat.icon} name={cat.name} />
            // </div>
          ))}
      </Slider>
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
