"use client"
import TelephoneIcon from "@/assets/icons/telephoneIcon"

const dummy_languages = [
    {
        name: 'English',
        flagIcon: '',
    },
    {
        name: 'Spanish',
        flagIcon: ''
    }
]

export default function TopHeader({bgColor = "bg-green-50", textColor = "text-neutral-600", iconColor = "#4E9647"}) {
  return (
    <section className={`${bgColor} ${textColor} py-[10px] md:px-[80px] px-[20px] border-b border-neutral-200`}>
          <div className="lg:flex justify-between items-center container mx-auto">
            <div className="flex items-center gap-x-[8px] mb-3 lg:mb-0">
                <TelephoneIcon color={iconColor} />
                <div>
                    Sales : (250) 555-0199
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <div className="px-[11px] border-r border-neutral-300">
                    Request a Quote
                </div>
                <div className="px-[11px] border-r border-neutral-300">
                    Customer Support
                </div>
                <div className="px-[11px]">
                    Knowledge Center
                </div>
                <div>
                    <div className="border border-neutral-300 rounded-[8px] p-[8px]">
                        WORK IN PROGRESS
                    </div>
                </div>
            </div>
        </div>
        

    </section>
  )
}
