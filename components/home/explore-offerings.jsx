import Image from "next/image"
import offerings from '@/assets/offerings.png'
import ArrowRightLongLineIcon from "@/assets/icons/arrowRightLongLine"

export default function ExploreOfferings() {
  return (
    <section className="bg-[#384E59] md:py-[80px] py-[20px]">
      <div className="lg:flex items-start justify-between gap-x-5 container mx-auto px-4">
        <div className="max-w-[620px] w-full">
          <div className="text-[40px] leading-[48px] font-[500] text-white mb-[20px]">
            Explore Our Offerings
          </div>
          <div className="text-[16px] leading-[153%] font-[300] text-white">
            From everyday tools to specialized equipment, our offerings are built to support your work, your team, and your success. Browse our collection and see how we help industries stay equipped, safe, and ready for any challenge.
          </div>

          <div className="md:flex items-start gap-x-5 mt-[40px]">
            <div className="bg-[#EBF4F6] py-[20px] px-[15px] rounded-[10px] mb-5 md:mb-0">
              <div className="text-[20px] leading-[146%] font-[500] text-[#1F1F1F] mb-[10px]">
                Explore More Industries
              </div>
              <div className="text-[16px] leading-[153%] font-[400] text-[#5C5C5C] mb-[20px]">
                We understand the importance of reliable industrial supplies across all sectors. No matter the industry you serve, our top priority is getting you the quality products you need....
              </div>
              <button className="flex items-center gap-1 text-[16px] leading-[20px] font-[500] text-green-500 border border-neutral-200 rounded-[10px] px-[13px] py-[10px]">
                Shop by Industry
                <ArrowRightLongLineIcon />
              </button>
            </div>
            <div className="bg-[#EBF4F6] py-[20px] px-[15px] rounded-[10px]">
              <div className="text-[20px] leading-[146%] font-[500] text-[#1F1F1F] mb-[10px]">
                More Safety
              </div>
              <div className="text-[16px] leading-[153%] font-[400] text-[#5C5C5C] mb-[20px]">
                We understand the importance of reliable industrial supplies across all sectors. No matter the industry you serve, our top priority is getting you the quality products you need....
              </div>
              <button className="flex items-center gap-1 text-[16px] leading-[20px] font-[500] text-green-500 border border-neutral-200 rounded-[10px] px-[13px] py-[10px]">
                Shop by Safety
                <ArrowRightLongLineIcon />
              </button>
            </div>
          </div>
          <div className="bg-[#EBF4F6] py-[20px] px-[15px] rounded-[10px] mt-[20px]">
              <div className="text-[20px] leading-[146%] font-[500] text-[#1F1F1F] mb-[10px]">
                More Solutions
              </div>
              <div className="text-[16px] leading-[153%] font-[400] text-[#5C5C5C] mb-[20px]">
                We understand the importance of reliable industrial supplies across all sectors. No matter the industry you serve, our top priority is getting you the quality products you need....
              </div>
              <button className="flex items-center gap-1 text-[16px] leading-[20px] font-[500] text-green-500 border border-neutral-200 rounded-[10px] px-[13px] py-[10px]">
                Discover More About Us
                <ArrowRightLongLineIcon />
              </button>
            </div>
        </div>
        <div className="mt-5 lg:mt-0">
          <Image
            src={offerings}
            alt="Offerings Image"
          />
        </div>
      </div>
    </section>
  )
}
