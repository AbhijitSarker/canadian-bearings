"use client"
import { useState } from "react"
import site_logo from "@/assets/site_logo.svg"
import Image from "next/image";
import ListUnorderedIcon from "@/assets/icons/listUnordered";
import MapPinLineIcon from "@/assets/icons/mapPinLine";
import Heart3LineIcon from "@/assets/icons/heart3Line";
import UserLineIcon from "@/assets/icons/userLine";
import ShoppingCart2LineIcon from "@/assets/icons/shoppingCart2Line";
import SearchLineIcon from "@/assets/icons/serachLine";
import { ChevronDown } from "lucide-react";

import { Menu } from 'lucide-react';
import Link from "next/link";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <section className="bg-green-50 py-[10px]">
            <div className="container mx-auto px-4">
                {/* Desktop & Tablet Layout */}
                <div className="hidden md:flex items-center gap-x-2 justify-between">
                    <div className="flex items-center lg:max-w-[743px] w-full gap-x-2">
                        <Link href="/">
                            <Image src={site_logo} alt={'Logo'} className="flex-shrink-0" />
                        </Link>
                        <div className="border bg-neutral-0 border-neutral-200 rounded-[30px] w-full flex items-center justify-between">
                            <div className="ml-[20px] text-sm">
                                Search...
                            </div>
                            <div className="bg-green-50 w-[24px] h-[24px] flex justify-center items-center rounded-full mr-[4px] my-[4px]">
                                <SearchLineIcon />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center lg:max-w-[467px] w-full justify-end">
                        <div className="flex items-center px-[10px] border-r border-neutral-300 gap-x-[5px] text-[14px] leading-[100%] text-neutral-950 font-[400] whitespace-nowrap">
                            <Heart3LineIcon />
                            Favourites
                        </div>
                        <Link href="/auth/signin" className="flex items-center pl-[10px] mr-[15px] text-[14px] leading-[100%] text-neutral-950 font-[400] whitespace-nowrap hover:underline">
                            <UserLineIcon />
                            Sign In
                        </Link>
                        <div className="bg-green-500 w-[34px] h-[34px] overflow-hidden rounded-full flex justify-center items-center flex-shrink-0">
                            <ShoppingCart2LineIcon />
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <Image src={site_logo} alt={'Logo'} className="flex-shrink-0" />
                        </Link>
                        <div className="flex items-center gap-x-2 w-full px-4">
                            <div className="border bg-neutral-0 border-neutral-200 rounded-[30px] w-full flex items-center justify-between">
                                <div className="ml-[20px] text-sm text-gray-400">
                                    Search...
                                </div>
                                <div className="bg-green-50 w-[32px] h-[32px] flex justify-center items-center rounded-full mr-[4px] my-[4px]">
                                    <SearchLineIcon />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <Link href="/auth/signin" className="flex items-center gap-x-[5px] text-[14px] text-neutral-950 font-[400] py-2 bg-white rounded-full px-2 hover:bg-green-50">
                                <Heart3LineIcon />

                            </Link>
                            <Link href="/auth/signin" className="flex items-center gap-x-[5px] text-[14px] text-neutral-950 font-[400] py-2 bg-white rounded-full px-2 hover:bg-green-50">
                                <UserLineIcon />

                            </Link>
                            <div className="bg-green-500 w-[40px] h-[40px] rounded-full flex justify-center items-center">
                                <ShoppingCart2LineIcon />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="mt-3 bg-white rounded-lg shadow-lg p-4 space-y-3">
                            <div className="flex items-center gap-x-[5px] text-[14px] text-neutral-950 font-[400] py-2">
                                <ListUnorderedIcon />
                                Quick Order
                            </div>
                            <div className="flex items-center gap-x-[5px] text-[14px] text-neutral-950 font-[400] py-2">
                                <MapPinLineIcon />
                                Location
                            </div>
                            <div className="flex items-center gap-x-[5px] text-[14px] text-neutral-950 font-[400] py-2">
                                <Heart3LineIcon />
                                Favourites
                            </div>
                            <Link href="/auth/signin" className="flex items-center gap-x-[5px] text-[14px] text-neutral-950 font-[400] py-2">
                                <UserLineIcon />
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}