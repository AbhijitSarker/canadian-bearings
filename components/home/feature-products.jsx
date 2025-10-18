'use client';
import React, { useState, useEffect } from "react";
import ArrowLeftSLineIcon from "@/assets/icons/arrowLeftSLine";
import ArrowRightSLineIcon from "@/assets/icons/arrowRightSLine";
import ProductCard from "../ui/product-card";

import headphoneImg from "@/assets/header_headphone_image.png";

// Mock product data
const products = [
  {
    id: 1,
    category: "Ball Bearings",
    name: "SKF 6203 2ZJEM",
    description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
    itemNumber: "I01525229",
    price: 31.89,
    image: headphoneImg,
  },
  {
    id: 2,
    category: "Ball Bearings",
    name: "SKF 6203 2ZJEM",
    description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
    itemNumber: "I01525229",
    price: 31.89,
    image: headphoneImg,
  },
  {
    id: 3,
    category: "Ball Bearings",
    name: "SKF 6203 2ZJEM",
    description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
    itemNumber: "I01525229",
    price: 31.89,
    image: headphoneImg,
  },
  {
    id: 4,
    category: "Ball Bearings",
    name: "SKF 6203 2ZJEM",
    description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
    itemNumber: "I01525229",
    price: 31.89,
    image: headphoneImg,
  },
  {
    id: 5,
    category: "Ball Bearings",
    name: "SKF 6203 2ZJEM",
    description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
    itemNumber: "I01525229",
    price: 31.89,
    image: headphoneImg,
  },
  {
    id: 6,
    category: "Ball Bearings",
    name: "SKF 6203 2ZJEM",
    description: "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
    itemNumber: "I01525229",
    price: 31.89,
    image: headphoneImg,
  },
];

const FeaturedProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  // 🔹 Update slidesToShow based on screen size
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1); // mobile
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2); // tablet
      } else if (window.innerWidth < 1280) {
        setSlidesToShow(3); // small desktop
      } else {
        setSlidesToShow(4); // large desktop
      }
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const totalSlides = Math.ceil(products.length - slidesToShow + 1);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="w-full py-16 overflow-hidden">
      <div className=" container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-medium text-gray-800">Feature Products</h2>
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors disabled:bg-white disabled:border disabled:border-neutral-200 disabled:cursor-not-allowed"
            >
              <ArrowLeftSLineIcon color={currentSlide === 0 ? "#171717" : undefined} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide >= totalSlides - 1}
              className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors disabled:bg-white disabled:border disabled:border-neutral-200 disabled:cursor-not-allowed"
            >
              <ArrowRightSLineIcon color={currentSlide >= totalSlides - 1 ? "#171717" : undefined} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-visible -mr-4">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 pr-4"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
