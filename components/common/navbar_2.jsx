"use client"
import site_logo from "@/assets/site_logo.png"
import Image from "next/image";
import ListUnorderedIcon from "@/assets/icons/listUnordered";
import MapPinLineIcon from "@/assets/icons/mapPinLine";
import Heart3LineIcon from "@/assets/icons/heart3Line";
import UserLineIcon from "@/assets/icons/userLine";
import ShoppingCart2LineIcon from "@/assets/icons/shoppingCart2Line";
import SearchLineIcon from "@/assets/icons/serachLine";


export default function Navbar() {
  return (
    <section >
        <div className="bg-green-50 py-[10px]  md:px-[80px] px-[20px]">
            <div className="md:flex items-center justify-between">
                <div className="flex items-center max-w-[951px] w-full">
                    <Image src={site_logo} alt={'Logo'} className="mr-[17px]" />
                    <div className="border bg-neutral-0 border-neutral-200 rounded-[30px] max-w-[852px] w-full flex items-center justify-between">
                        <div className="ml-[20px]">
                            Select Box
                        </div>
                        <div className="bg-green-50 w-[32px] h-[32px] flex justify-center items-center rounded-full mr-[4px] my-[4px]">
                            <SearchLineIcon/>
                        </div>
                    </div>
                </div>
                <div className="flex items-center md:justify-end max-w-[300px] w-full mt-5 md:mt-0">
                    <div className="flex items-center px-[10px] border-r border-neutral-300 gap-x-[5px]">
                        <Heart3LineIcon />
                        Favourites
                    </div>
                    <div className="flex items-center pl-[10px] mr-[15px]">
                        <UserLineIcon />
                        Sign In
                    </div>
                    <div className="bg-green-500 w-[40px] h-[40px] overflow-hidden rounded-full flex justify-center items-center">
                        <ShoppingCart2LineIcon/>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-[#384E59] py-[10px] md:px-[80px] px-[20px] text-white">
            <div className="lg:flex items-center justify-between gap-x-4">
                <div className="md:flex items-center justify-between">
                    <div className="border bg-[#384E59] border-[#666666] rounded-[30px] py-[8px] px-[12px] min-w-[188px] w-full mr-[50px]">
                        Select Box
                    </div>
                    <div className="flex items-center gap-x-[20px] xl:gap-x-[50px] text-[14px] leading-[100%] font-[400] mt-5 md:mt-0">
                        <button >
                            Product
                        </button>
                        <button >
                            Brands
                        </button>
                        <button >
                            Services
                        </button>
                        <button >
                            Resource
                        </button>
                        <button >
                            Industries
                        </button>
                    </div>
                </div>
                
                <div className="flex items-center mt-5 lg:mt-0">
                    <div className="flex items-center pr-[10px] gap-x-[5px]">
                        <ListUnorderedIcon color="#FFFFFF" />
                        Quick Order
                    </div>
                    <div className="flex items-center px-[10px] gap-x-[5px]">
                        <MapPinLineIcon color="#FFFFFF" />
                        Location
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
