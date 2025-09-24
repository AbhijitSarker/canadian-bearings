'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { Button } from "./button";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Eliminate keyed connection failures with climax!",
      subtitle: "Keyed Locking Devices (KLDs) deliver unmatched positional accuracy and repeatability...",
      buttonText1: "Buy Now",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Eliminate keyed connection failures with climax!",
      subtitle: "Eliminate keyed connection failures with climax",
      buttonText1: "Shop Now",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "PEliminate keyed connection failures with climax!",
      subtitle: "Eliminate keyed connection failures with climax",
      buttonText1: "Order Now",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length, mounted]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  if (!mounted) return null;

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="border flex flex-col-reverse md:flex-row items-center justify-between bg-[#FBFEF9] py-10 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="mt-10 md:mt-0 border flex-1 flex flex-col">
              <h1 className="max-w-2xl text-green-900 md:text-[78px] md:leading-[100%] text-2xl font-semibold">
                {slide.title}
              </h1>
              <p>
                {slide.subtitle}
              </p>
              <div className="flex items-center mt-4 md:mt-6 ">
                {/* <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium">
                  {slide.buttonText1}
                </button> */}
                <Button>
                  {slide.buttonText1}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                className="h-[408px] w-[408px]"
                src={slide.imgSrc || undefined}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
