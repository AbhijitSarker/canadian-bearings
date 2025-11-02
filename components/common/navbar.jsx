"use client"
import { useState } from "react"
import site_logo from "@/assets/site_logo.svg"
import Image from "next/image";
import ListUnorderedIcon from "@/assets/icons/listUnordered";
import MapPinLineIcon from "@/assets/icons/mapPinLine";
import LowerNavbar from "./LowerNavbar";
import Heart3LineIcon from "@/assets/icons/heart3Line";
import UserLineIcon from "@/assets/icons/userLine";
import ShoppingCart2LineIcon from "@/assets/icons/shoppingCart2Line";
import SearchBar from '../search/SearchBar';
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
    };

    return (
        <>
        <section className="bg-green-50 py-[10px]">
            <div className="container mx-auto px-4">
                {/* Desktop & Tablet Layout */}
                <div className="hidden md:flex items-center gap-x-4 justify-between">
                    <div className="flex items-center gap-x-4 flex-1 max-w-[75%]">
                        <Link href="/" className="flex-shrink-0">
                            <Image src={site_logo} alt={'Logo'} className="w-auto" />
                        </Link>
                        <div className="flex-1 min-w-0">
                            <SearchBar />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2 justify-end flex-shrink-0">
                        <div className="flex items-center px-[10px] border-r border-neutral-300 gap-x-[5px] text-[14px] leading-[100%] text-neutral-950 font-[400] whitespace-nowrap">
                            <Heart3LineIcon />
                            Favourites
                        </div>

                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center pl-[10px] mr-[15px] text-[14px] leading-[100%] text-neutral-950 font-[400] whitespace-nowrap hover:underline gap-1"
                                >
                                    <UserLineIcon />
                                    {user?.firstName || user?.username}
                                    <ChevronDown size={14} />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 min-w-[180px] overflow-hidden">
                                        <div className="px-4 py-3 border-b border-neutral-200">
                                            <p className="text-sm font-medium text-neutral-950">{user?.firstName} {user?.lastName}</p>
                                            <p className="text-xs text-neutral-600">{user?.email}</p>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/orders"
                                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            My Orders
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-50 flex items-center gap-2"
                                        >
                                            <LogOut size={14} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/auth/signin" className="flex items-center pl-[10px] mr-[15px] text-[14px] leading-[100%] text-neutral-950 font-[400] whitespace-nowrap hover:underline">
                                <UserLineIcon />
                                Sign In
                            </Link>
                        )}

                        <div className="bg-green-500 w-[40px] h-[40px] overflow-hidden rounded-full flex justify-center items-center flex-shrink-0">
                            <ShoppingCart2LineIcon />
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-3">
                        <Link href="/">
                            <Image src={site_logo} alt={'Logo'} className="flex-shrink-0" />
                        </Link>
                        <div className="flex items-center gap-x-3">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2"
                                aria-label="Toggle menu"
                            >
                                <ListUnorderedIcon />
                            </button>
                            <div className="bg-green-500 w-[40px] h-[40px] rounded-full flex justify-center items-center">
                                <ShoppingCart2LineIcon />
                            </div>
                        </div>
                    </div>
                    {/* Search Row */}
                    <div className="flex items-center gap-x-2 mb-3 relative z-[9999] -mx-4 px-4">
                        <SearchBar />
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

                            {isAuthenticated ? (
                                <>
                                    <div className="border-t pt-3">
                                        <p className="text-sm font-medium text-neutral-950 mb-1">{user?.firstName} {user?.lastName}</p>
                                        <p className="text-xs text-neutral-600 mb-3">{user?.email}</p>
                                    </div>
                                    <Link href="/profile" className="flex items-center gap-x-[5px] text-[14px] text-neutral-950 font-[400] py-2">
                                        <UserLineIcon />
                                        My Profile
                                    </Link>
                                    <Link href="/orders" className="flex items-center gap-x-[5px] text-[14px] text-neutral-950 font-[400] py-2">
                                        My Orders
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-x-[5px] text-[14px] text-red-600 font-[400] py-2 w-full"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link href="/auth/signin" className="flex items-center gap-x-[5px] text-[14px] text-neutral-950 font-[400] py-2">
                                    <UserLineIcon />
                                    Sign In
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
        {isAuthenticated && <LowerNavbar />}
        </>
    )
}