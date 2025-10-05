"use client"

import Image from "next/image"
import ctaBackground from '@/assets/cta_background.png'

export default function CTASection() {
  return (
    <section className="mb-[70px]">
      <div className="relative md:px-[80px] px-[20px] w-full mx-auto ">
        <div className="absolute inset-0 z-[-99] ">
          <Image
            src={ctaBackground}
            alt="Business partnership"
            className="w-full h-full object-cover rounded-[20px]"
          />
        </div>
        <div className="py-[80px] px-[30px]">
          <div className="mb-[30px] max-w-[563px] w-full">
            <div className="md:text-[70px] text-[32px] leading-[100%] font-[500] text-white mb-[15px]">WE'RE BETTER TOGETHER</div>
            <p className="md:text-[16px] text-[10px] leading-[18px] md:leading-[24px] font-[300] text-white">
              Sign up today and get the benefit of ordering faster, saving product lists and submitting online quotes.
            </p>
          </div>
          <button className="bg-green-500 text-white md:px-[20px] md:py-[15px] px-[12px] py-[8px] rounded-[10px] font-[600] md:text-[16px] text-[10px] leading-[18px] md:leading-[24px]">
            Register Now
          </button>
        </div>
      </div>
    </section>
  )
}
