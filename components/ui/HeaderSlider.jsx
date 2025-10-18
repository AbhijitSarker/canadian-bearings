'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { Button } from "./button";
import ArrowRightLongLineIcon from '@/assets/icons/arrowRightLongLine'

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Eliminate Keyed Connection Failures with Climax",
      subtitle: "Keyed Locking Devices (KLDs) deliver unmatched positional accuracy and repeatability...",
      buttonText1: "Shop Now",
      imgSrc: assets.erasebg_transformed,
      heroBg: assets.hero_bg_mask_group
    },
    {
      id: 2,
      title: "Eliminate Keyed Connection Failures with Climax",
      subtitle: "Keyed Locking Devices (KLDs) deliver unmatched positional accuracy and repeatability...",
      buttonText1: "Shop Now",
      imgSrc: assets.erasebg_transformed,
      heroBg: assets.hero_bg_mask_group
    },
    {
      id: 3,
      title: "Eliminate Keyed Connection Failures with Climax",
      subtitle: "Keyed Locking Devices (KLDs) deliver unmatched positional accuracy and repeatability...",
      buttonText1: "Shop Now",
      imgSrc: assets.erasebg_transformed,
      heroBg: assets.hero_bg_mask_group
    },
    // {
    //   id: 2,
    //   children: [
    //     {
    //       id: 1,
    //       title: "Eliminate Keyed Connection Failures with Climax",
    //       subtitle: "Keyed Locking Devices (KLDs) deliver unmatched positional accuracy and repeatability...",
    //       buttonText1: "Shop Now",
    //       backgroundColor: "#FBF7EE",
    //       buttonType: "plain"
    //     },
    //     {
    //       id: 2,
    //       title: "Eliminate Keyed Connection Failures with Climax",
    //       subtitle: "Keyed Locking Devices (KLDs) deliver unmatched positional accuracy and repeatability...",
    //       buttonText1: "Shop Now",
    //       backgroundColor: "#FBF7EE",
    //       buttonType: "cover"
    //     },
    //     {
    //       id: 3,
    //       title: "Eliminate Keyed Connection Failures with Climax",
    //       subtitle: "Keyed Locking Devices (KLDs) deliver unmatched positional accuracy and repeatability...",
    //       buttonText1: "Shop Now",
    //       backgroundColor: "#FBF7EE",
    //       buttonType: "cover"
    //     },
    //     {
    //       id: 4,
    //       title: "Eliminate Keyed Connection Failures with Climax",
    //       subtitle: "Keyed Locking Devices (KLDs) deliver unmatched positional accuracy and repeatability...",
    //       buttonText1: "Shop Now",
    //       backgroundColor: "#FBF7EE",
    //       buttonType: "cover"
    //     },
    //     {
    //       id: 5,
    //       title: "Eliminate Keyed Connection Failures with Climax",
    //       subtitle: "Keyed Locking Devices (KLDs) deliver unmatched positional accuracy and repeatability...",
    //       buttonText1: "Shop Now",
    //       backgroundColor: "#FBF7EE",
    //       buttonType: "cover"
    //     },
    //   ]
    // }
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
    <div className="overflow-hidden w-full container mx-auto">
      <div
        className="flex relative transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="relative flex flex-col-reverse md:flex-row justify-between py-[45px] md:px-[40px] mt-6 rounded-[20px] min-w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: slide.heroBg ? `url(${slide.heroBg.src})` : 'none',
            }}
          >
            {slide.children ? (
              <div className="max-h-[524px] h-full overflow-hidden">
                <div className={`grid gap-6 w-full ${
                    slide.children.length <= 2 ? "grid-cols-2" : "grid-cols-3"
                  }`}>
                  {slide.children.map((child, childIndex) => (
                    <div
                      key={child.id}
                      className="relative flex flex-col items-start justify-center p-10 rounded-[20px]"
                      style={{ backgroundColor: child.backgroundColor }}
                    >
                      <h2 className="text-green-900 text-[32px] font-semibold mb-3">
                        {child.title}
                      </h2>
                      <p className="text-neutral-600 text-[18px] mb-4">
                        {child.subtitle}
                      </p>
                      <Button
                        variant={child.buttonType === "cover" ? "default" : "ghost"}
                      >
                        {child.buttonText1}
                        <ArrowRightLongLineIcon />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
            ) : (
              <>
                <div className="absolute inset-0 bg-[#F6FEF3] opacity-40 rounded-[20px] z-0 border"></div>

                <div className="relative z-10 mt-10 md:mt-0 flex flex-col">
                  <div className="text-green-900 md:text-[78px] md:leading-[100%] max-w-[683px] w-full font-[500] mb-[12px]">
                    {slide.title}
                  </div>
                  <div className="text-neutral-600 md:text-[18px] md:leading-[25px] max-w-[683px] w-full font-[300]">
                    {slide.subtitle}
                  </div>
                  <div className="flex items-center mt-4 md:mt-6">
                    <Button>
                      {slide.buttonText1}
                      <ArrowRightLongLineIcon />
                    </Button>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-center">
                  <Image
                    // className=""
                    width={400}
                    src={slide.imgSrc || undefined}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Slider dots */}
      <div className="justify-center flex items-center gap-3 z-20 mt-[32px]">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-colors duration-300 ${
              currentSlide === index ? "bg-green-500" : "bg-gray-400/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
