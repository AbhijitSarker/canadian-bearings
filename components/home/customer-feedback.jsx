"use client"

import { useState } from "react"
import Image from "next/image"
import customer1 from '@/assets/customers/customer_1.png'
import ArrowLeftSLineIcon from "@/assets/icons/arrowLeftSLine";
import ArrowRightSLineIcon from "@/assets/icons/arrowRightSLine";

const reviews = [
  { id: 1,
    name: "Mark Jensen", 
    designation: "Operations Manager at Northpoint Manufacturing", 
    image: customer1, 
    description: 'We\'ve been sourcing our industrial components from Canadian Bearings for over a year now, and the experience has been consistently excellent. Their wide range of bearings and other mechanical components, combined with competitive pricing, makes it easy to find a supplier that combines quality, service, and reliability so well. Highly recommended for any industrial business.' 
  },
  { id: 2,
    name: "Sarah Lee", // Changed name for distinction
    designation: "Procurement Head at Apex Industries", 
    image: customer1, 
    description: 'Canadian Bearings has consistently delivered high-quality products and exceptional service. Their team is knowledgeable and always goes the extra mile to ensure we get exactly what we need, often on short notice. Their reliability is a huge asset to our supply chain.' 
  },
  { id: 3,
    name: "David Chen", // Changed name for distinction
    designation: "Lead Engineer at Global Dynamics", 
    image: customer1, 
    description: 'The technical support from Canadian Bearings is outstanding. They helped us identify the perfect bearing solution for a critical application, which significantly improved our machinery\'s performance and reduced downtime. A truly valuable partner.' 
  },
];

function ReviewCard({ review }) { // Destructure review prop
  return (
    <div className="bg-alpha-200 rounded-[20px] px-[40px]">
          <div className="md:flex items-center justify-between">
            <div className="max-w-[920px] w-full py-[31px] md:border-r border-b md:border-b-0 my-[31px] border-neutral-200"> 
              <div className="lg:text-[28px] text-[14px] leading-[24px] lg:leading-[38px] font-[300] text-neutral-950 mb-[32px]">
                "{review.description}"
              </div>
              <div className="text-[12px] leading-[20px] lg:text-[16px] lg:leading-[24px] font-[500] text-neutral-950">
                - {review.name}, {review.designation}
              </div>
            </div>
            <div className="ml-[70px]">
              <Image
              src={review.image}
              alt={review.name} 
              width={150}
              height={150}
              className="rounded-full object-cover pb-8 md:pb-0"
              />
            </div>
          </div>
    </div>
  )
}

function CustomerFeedback() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = reviews.length;
  const slidesToShow = 1; // Display one review at a time

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
    <section className="py-[70px] w-full ">
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between items-center mb-[50px]">
          <div className="text-[40px] leading-[48px] font-[500] text-gray-800">Recent Customers Feedback</div>
          <div className="flex gap-3 items-center mt-5 md:mt-0"> {/* Grouped buttons and added items-center */}
            <button className="text-green-600 hover:text-green-700 flex items-center space-x-1 text-[18px] leading-[100%] font-[400]">
              <span>View All Review</span>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden"> 
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center justify-center gap-x-3 mt-[50px]">
          <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors disabled:bg-white disabled:border disabled:border-neutral-200 disabled:cursor-not-allowed"
            >
            <ArrowLeftSLineIcon color={currentSlide === 0 ? "#171717" : undefined} />
          </button>
          <div className="text-[16px] leading-[24px] font-[400]">
            <div>
              <span className="text-neutral-950">{(currentSlide + 1).toString().padStart(2, '0')}/</span>
              <span className="text-neutral-400">{totalSlides.toString().padStart(2, '0')}</span>
            </div>
          </div>
          <button
            onClick={nextSlide}
            disabled={currentSlide >= totalSlides - 1}
            className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors disabled:bg-white disabled:border disabled:border-neutral-200 disabled:cursor-not-allowed"
          >
            <ArrowRightSLineIcon color={currentSlide >= totalSlides - 1 ? "#171717" : undefined} />
          </button>
        </div>
       
      </div>
    </section>
  )
}
