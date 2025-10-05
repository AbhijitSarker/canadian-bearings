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
    <section className="bg-green-50 py-[10px] xl:px-[80px] px-[20px]">
        <div className="lg:flex items-center gap-x-2 justify-between">
            <div className="flex items-center lg:max-w-[743px] w-full">
                <Image src={site_logo} alt={'Logo'} className="mr-[17px]" />
                <div className="border bg-neutral-0 border-neutral-200 rounded-[30px] py-[8px] px-[12px] lg:max-w-[188px] w-full mr-[10px]">
                    Select Box
                </div>
                <div className="border bg-neutral-0 border-neutral-200 rounded-[30px] lg:max-w-[439px] w-full flex items-center justify-between">
                    <div className="ml-[20px]">
                        Select Box
                    </div>
                    <div className="bg-green-50 w-[32px] h-[32px] flex justify-center items-center  rounded-full mr-[4px] my-[4px]">
                        <SearchLineIcon/>
                    </div>
                </div>
            </div>
            <div className="flex items-center mt-3 lg:max-w-[467px] w-full lg:mt-0 justify-center">
                <div className="flex items-center pr-[10px] border-r border-neutral-300 gap-x-[5px] text-[14px] leading-[100%] text-neutral-950 font-[400]">
                    <ListUnorderedIcon />
                    Quick Order
                </div>
                <div className="flex items-center px-[10px] border-r border-neutral-300 gap-x-[5px]  text-[14px] leading-[100%] text-neutral-950 font-[400]">
                    <MapPinLineIcon />
                    Location
                </div>
                <div className="flex items-center px-[10px] border-r border-neutral-300 gap-x-[5px]  text-[14px] leading-[100%] text-neutral-950 font-[400]">
                    <Heart3LineIcon />
                    Favourites
                </div>
                <div className="flex items-center pl-[10px] mr-[15px]  text-[14px] leading-[100%] text-neutral-950 font-[400]">
                    <UserLineIcon />
                    Sign In
                </div>
                <div className="bg-green-500 w-[40px] h-[40px] overflow-hidden rounded-full flex justify-center items-center">
                    <ShoppingCart2LineIcon/>
                </div>
            </div>
        </div>
    </section>
  )
}
