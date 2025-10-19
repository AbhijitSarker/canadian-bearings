'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { Button } from "./button";
import ArrowRightLongLineIcon from '@/assets/icons/arrowRightLongLine'
import { MoveRight } from "lucide-react";

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
      id: 2,
      title: "Eliminate Keyed Connection Failures with Climax",
      subtitle: "Keyed Locking Devices (KLDs) deliver unmatched positional accuracy and repeatability...",
      buttonText1: "Shop Now",
      imgSrc: assets.erasebg_transformed,
      heroBg: assets.hero_bg_mask_group
    },
    {
      id: 3,
      id: 3,
      title: "Eliminate Keyed Connection Failures with Climax",
      subtitle: "Keyed Locking Devices (KLDs) deliver unmatched positional accuracy and repeatability...",
      buttonText1: "Shop Now",
      imgSrc: assets.erasebg_transformed,
      heroBg: assets.hero_bg_mask_group
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!mounted || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderData.length, mounted, isPaused]);

  // Handle slide change with bounds checking
  const handleSlideChange = useCallback((index) => {
    if (index >= 0 && index < sliderData.length) {
      setCurrentSlide(index);
    }
  }, [sliderData.length]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
      } else {
        // Swipe right - previous slide
        setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
      }
    }

    // Resume auto-play after 3 seconds
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Mouse enter/leave for desktop
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (!mounted) return null;

  return (
    <div className="w-full overflow-hidden pb-2">
      <div className="container mx-auto px-4" >
        <div className="relative">
          {/* Slider content */}
          <div
            ref={sliderRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {sliderData.map((slide, index) => (
                <div
                  key={slide.id}
                  className="relative flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-8 py-8 md:py-12 px-6 md:px-10 lg:px-16 mt-6 rounded-2xl min-w-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: slide.heroBg ? `url(${slide.heroBg.src})` : 'none',
                  }}
                >
                  <>
                    {/* Background overlay */}
                    <div className="absolute inset-0 bg-[#F6FEF3] opacity-40 rounded-2xl z-0 border border-green-100"></div>

                    {/* Content section */}
                    <div className="relative z-10 flex-1 flex flex-col justify-center space-y-4 md:space-y-6">
                      <h1 className="text-green-900 text-3xl md:text-5xl lg:text-6xl xl:text-[78px] leading-tight md:leading-[110%] max-w-[683px] font-medium">
                        {slide.title}
                      </h1>
                      <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-[683px] font-light">
                        {slide.subtitle}
                      </p>
                      <div className="flex items-center pt-2">
                        <Button className="group">
                          {slide.buttonText1}
                          <MoveRight />
                        </Button>
                      </div>
                    </div>

                    {/* Image section */}
                    <div className="relative z-10 flex items-center justify-center flex-shrink-0">
                      <Image
                        className=" object-contain"
                        // width={400}
                        // height={400}
                        src={slide.imgSrc || undefined}
                        alt={`Slide ${index + 1}`}
                        priority={index === 0}
                      />
                    </div>
                  </>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows for desktop - positioned outside the sliding container */}
          <button
            onClick={() => handleSlideChange(currentSlide - 1)}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => handleSlideChange(currentSlide + 1)}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slider dots */}
        <div className="flex justify-center items-center gap-3 mt-6 md:mt-8">
          {sliderData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${currentSlide === index
                ? "bg-green-500 w-8"
                : "bg-gray-400/50 hover:bg-gray-400"
                }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? "true" : "false"}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderSlider;