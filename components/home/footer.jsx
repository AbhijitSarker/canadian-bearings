import Image from 'next/image'
import Link from 'next/link'
import facebook from '@/assets/facebook.png'
import instagram from '@/assets/instagram.png'
import twitter from '@/assets/twitter.png'
import linkedin from '@/assets/linkedin.png'
import siteLogo from '@/assets/site_logo.svg'
import MapIcon from '@/assets/icons/map'
import CallIcon from '@/assets/icons/call'
import EmailIcon from '@/assets/icons/email'

export default function Footer() {
  return (
    <footer className="">
      {/* <div className=''> */}
      <div className=" px-4 bg-[#384E59] text-white py-[20px] sm:py-[60px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-start justify-between border-b border-[#333333] pb-[40px] mb-[40px]">
            <div className="max-w-[620px] w-full">
              <div className="text-[40px] leading-[100%] font-[300] mb-[20px]">
                Sign Up For Email
              </div>
              <div className="sm:flex items-start gap-x-4">
                <input placeholder="Email Address" type="text" className="border border-[#FFFFFF4D] rounded-[10px] bg-transparent px-[20px] py-[15px] max-w-[460px] w-full" />
                <button className="px-[32px] py-[15px] rounded-[10px] bg-green-500 text-[16px] leading-[20px] font-[600] mt-3 sm:mt-0">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="mb-4 lg:mb-0">
              Follow Us
              <div className="flex items-center gap-x-[15px] mt-[15px]">
                <button className="bg-[#FFFFFF33] rounded-full w-[36px] h-[36px] flex items-center justify-center hover:bg-green-500">
                  <Image src={facebook} alt="Facebook" />
                </button>
                <button className="bg-[#FFFFFF33] rounded-full w-[36px] h-[36px] flex items-center justify-center hover:bg-green-500">
                  <Image src={instagram} alt="Instagram" />
                </button>
                <button className="bg-[#FFFFFF33] rounded-full w-[36px] h-[36px] flex items-center justify-center hover:bg-green-500">
                  <Image src={twitter} alt="Twitter" />
                </button>
                <a 
                  href="https://www.linkedin.com/company/canadian-bearings-ltd-/?viewAsMember=true" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#FFFFFF33] rounded-full w-[36px] h-[36px] flex items-center justify-center hover:bg-green-500"
                >
                  <Image src={linkedin} alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
          <div className="md:flex items-start gap-x-6">
            <div className="md:border-r border-b md:border-b-0 border-[#8C8C8C] mb-[32px] md:mb-0 md:pb-0 pb-[32px]">
              <Image src={siteLogo} alt="Site Logo" className="mb-[15px]" />
              <div className="max-w-[319px] w-full text-[16px] leading-[24px] font-[300] pr-[40px]">
                Canadian Bearings (CB) has been at the forefront of innovation, offering solutions that prioritize safety, reliability, efficiency and sustainability.
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 w-full">
              {/* <div className="sm:flex items-start gap-x-10 mt-5 sm:mt-0"> */}
                <div className="min-w-[180px] w-full mb-3 xs:mb-0">
                  <div className="text-[20px] leading-[100%] font-[500] mb-[18px]">
                    Service
                  </div>
                  <div className="flex flex-col gap-y-[15px]">
                    <button className="text-[16px] leading-[100%] font-[300] text-left">
                      Track Orders
                    </button>
                    <Link href="/rfq" className="text-[16px] leading-[100%] font-[300] text-left hover:underline">
                      Request a Quote
                    </Link>
                    <Link href="/locations" className="text-[16px] leading-[100%] font-[300] text-left hover:underline">
                      Our Locations
                    </Link>                   
                    <button className="text-[16px] leading-[100%] font-[300] text-left">
                      Support Center
                    </button>
                    <button className="text-[16px] leading-[100%] font-[300] text-left">
                      FAQs
                    </button>
                  </div>
                </div>
                <div className="min-w-[180px] w-full">
                  <div className="text-[20px] leading-[100%] font-[500] mb-[18px]">
                    Company Info
                  </div>
                  <div className="flex flex-col gap-y-[15px]">
                    <button className="text-[16px] leading-[100%] font-[300] text-left">
                      Contact Us
                    </button>
                    <button className="text-[16px] leading-[100%] font-[300] text-left">
                      About Us
                    </button>
                    <button className="text-[16px] leading-[100%] font-[300] text-left">
                      Press Releases
                    </button>
                    <button className="text-[16px] leading-[100%] font-[300] text-left">
                      Careers
                    </button>
                  </div>
                </div>
              {/* </div> */}
              {/* <div className="sm:flex items-start gap-x-10 mt-5 sm:mt-0"> */}
                <div className="min-w-[195px] w-full mb-4 xs:mb-0">
                  <div className="text-[20px] leading-[100%] font-[500] mb-[18px]">
                    Support + Resources
                  </div>
                  <div className="flex flex-col gap-y-[15px]">
                    <button className="text-[16px] leading-[100%] font-[300] text-left">
                      Feedback
                    </button>
                    <button className="text-[16px] leading-[100%] font-[300] text-left">
                      Canadian Bearings Login
                    </button>
                    <button className="text-[16px] leading-[100%] font-[300] text-left">
                      Terms & Conditions
                    </button>
                  </div>
                </div>
                <div className="max-w-[235px] w-full">
                  <div className="text-[20px] leading-[100%] font-[500] mb-[18px]">
                    We're Here To Help
                  </div>
                  <div className="flex flex-col gap-y-[15px]">
                    <button className="text-[16px] leading-[20px] font-[300] text-left flex items-center gap-x-2">
                      <EmailIcon />
                      <div>
                        Chat with us
                      </div>
                    </button>
                    <button className="text-[16px] leading-[20px] font-[300] text-left flex items-center gap-x-2">
                      <EmailIcon />
                      <div>
                        info@canadianbearings.com
                      </div>
                    </button>
                    <button className="text-[16px] leading-[20px] font-[300] text-left flex items-start gap-x-2">
                      <CallIcon />
                      <div>
                        <p>1-800-229-2327</p>
                        <p>Mon-Fri: 8am-4:30pm EST</p>                        
                      </div>
                    </button>
                    <button className="text-[16px] leading-[20px] font-[300] text-left flex items-center gap-x-2">
                      <MapIcon />
                      <div>
                        1600 Drew Rd Mississauga, ON, L5S 1S5
                      </div>
                    </button>
                  </div>
                </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200 bg-[#D3E1E8] py-[16px]">
        <div className="container mx-auto px-4 md:flex items-center justify-between text-[12px] leading-[100%] font-[400]">
          <div className="mb-4 md:mb-0">
            Copyright © 2004 Canadian Bearings Ltd. All Rights Reserved.
          </div>
          <div className="flex items-center">
            <button className="pr-[11px] border-r border-neutral-300">
              Privacy Policy
            </button>
            {/* <button className="px-[11px] border-r border-neutral-300">
              Customer Support
            </button> */}
            <button className="pl-[11px]">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </footer>
  )
}
