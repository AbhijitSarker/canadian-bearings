"use client";

import React from "react";
import Slider from "react-slick";
import CategoryCard from "@/components/ui/category-card";
import ArrowLeftSLineIcon from "@/assets/icons/arrowLeftSLine";
import ArrowRightSLineIcon from "@/assets/icons/arrowRightSLine";
import headphoneImg from "@/assets/header_headphone_image.png";
import macbookImg from "@/assets/header_macbook_image.png";
import playstationImg from "@/assets/header_playstation_image.png";

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

const CategorySlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 5, slidesToScroll: 5 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, slidesToScroll: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
    ],
  };
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
    <div>
      <div className="container mx-auto px-10">
        <Slider {...settings}>
          {categories.map((cat, idx) => (
            <CategoryCard key={cat.name + idx} icon={cat.icon} name={cat.name} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategorySlider;
