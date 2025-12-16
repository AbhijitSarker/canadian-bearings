"use client"
import { useState, useRef, useEffect } from "react"
import site_logo from "@/assets/site_logo.svg"
import Image from "next/image";
import ListUnorderedIcon from "@/assets/icons/listUnordered";
import MapPinLineIcon from "@/assets/icons/mapPinLine";
import Heart3LineIcon from "@/assets/icons/heart3Line";
import UserLineIcon from "@/assets/icons/userLine";
import ShoppingCart2LineIcon from "@/assets/icons/shoppingCart2Line";
import SearchBar from '../search/SearchBar';
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorite } from "@/contexts/FavoriteContext";
import CategoryDropdown from "./CategoryDropdown";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const mobileButtonRef = useRef(null);
    const userMenuRef = useRef(null);
    const userButtonRef = useRef(null);
    const { user, isAuthenticated, logout } = useAuth();
    const { openSidebar } = useFavorite();

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                mobileMenuRef.current &&
                mobileButtonRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                !mobileButtonRef.current.contains(event.target)
            ) {
                setMobileMenuOpen(false);
            }
        };

        if (mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [mobileMenuOpen]);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userMenuRef.current &&
                userButtonRef.current &&
                !userMenuRef.current.contains(event.target) &&
                !userButtonRef.current.contains(event.target)
            ) {
                setUserMenuOpen(false);
            }
        };

        if (userMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [userMenuOpen]);

    return (
        <>
            <section className="bg-green-50 py-[10px]">
                <div className="container mx-auto px-4">
                    {/* Desktop & Tablet Layout */}
                    <div className="hidden md:flex items-center gap-x-4 justify-between">
                        <div className="flex items-center gap-x-4 flex-1">
                            <Link href="/" className="flex-shrink-0">
                                <Image src={site_logo} alt={'Logo'} className="w-auto h-10" />
                            </Link>

                            {isAuthenticated && <>
                                <CategoryDropdown />

                                <div className="flex-1 min-w-0 max-w-xl">
                                    <SearchBar />
                                </div>
                            </>
                            }
                            {isAuthenticated && (
                                <div className="flex items-center gap-4 xl:gap-6 flex-shrink-0">
                                    <Link href="#" className="text-neutral-700 text-sm font-medium hover:text-green-600 transition-colors">
                                        Product
                                    </Link>
                                    <Link href="#" className="text-neutral-700 text-sm font-medium hover:text-green-600 transition-colors">
                                        Brands
                                    </Link>
                                    <Link href="#" className="text-neutral-700 text-sm font-medium hover:text-green-600 transition-colors">
                                        Services
                                    </Link>
                                    <Link href="#" className="text-neutral-700 text-sm font-medium hover:text-green-600 transition-colors">
                                        Resource
                                    </Link>
                                    <Link href="#" className="text-neutral-700 text-sm font-medium hover:text-green-600 transition-colors">
                                        Industries
                                    </Link>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-x-2 justify-end flex-shrink-0 ml-4">
                            {isAuthenticated && (
                                <Link 
                                    href="/favorites"
                                    className="flex items-center px-[10px] border-r border-neutral-300 gap-x-[5px] text-[14px] leading-[100%] text-neutral-950 font-[400] whitespace-nowrap hover:text-red-600 transition-colors"
                                >
                                    <Heart3LineIcon />
                                Favourites
                            </Link>
                            )}
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        ref={userButtonRef}
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center pl-[10px] mr-[15px] text-[14px] leading-[100%] text-neutral-950 font-[400] whitespace-nowrap hover:underline gap-1"
                                    >
                                        <UserLineIcon />
                                        {user?.firstName || user?.username}
                                        <ChevronDown size={14} />
                                    </button>

                                    {userMenuOpen && (
                                        <div ref={userMenuRef} className="absolute right-0 top-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 min-w-[180px] overflow-hidden">
                                            <div className="px-4 py-3 border-b border-neutral-200">
                                                <p className="text-sm font-medium text-neutral-950">{user?.firstName} {user?.lastName}</p>
                                                <p className="text-xs text-neutral-600">{user?.email}</p>
                                            </div>
                                            <Link
                                                href="/account"
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

                            <div className="bg-green-500 w-[40px] h-[40px] overflow-hidden rounded-full flex justify-center items-center flex-shrink-0 shadow-sm hover:bg-green-600 transition-colors">
                                <Link href="/cart">
                                    <ShoppingCart2LineIcon className="text-white" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden">
                        {/* Top Row - Hamburger + Logo on left, Categories + Cart on right */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <button
                                    ref={mobileButtonRef}
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="p-2 hover:bg-neutral-100 rounded-md transition-colors -ml-2"
                                    aria-label="Toggle menu"
                                >
                                    <ListUnorderedIcon />
                                </button>
                                <Link href="/">
                                    <Image src={site_logo} alt={'Logo'} className="h-8 w-auto" />
                                </Link>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                {isAuthenticated && (
                                    <CategoryDropdown />
                                )}
                                <Link href="/cart" className="bg-green-500 w-[40px] h-[40px] rounded-full flex justify-center items-center shadow-sm hover:bg-green-600 transition-colors">
                                    <ShoppingCart2LineIcon className="text-white" />
                                </Link>
                            </div>
                        </div>

                        {/* Second Row - Full Width Search */}
                        <div className="mb-2">
                            <SearchBar />
                        </div>

                        {/* Mobile Menu Drawer */}
                        {mobileMenuOpen && (
                            <>
                                {/* Backdrop */}
                                <div 
                                    className="fixed inset-0 bg-black/50 z-[60]"
                                    onClick={() => setMobileMenuOpen(false)}
                                />
                                
                                {/* Slide-in Drawer */}
                                <div 
                                    ref={mobileMenuRef}
                                    className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl z-[70] overflow-y-auto animate-in slide-in-from-left duration-200"
                                >
                                    {/* Drawer Header */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-green-500 text-white sticky top-0">
                                        <h2 className="font-semibold text-lg">Menu</h2>
                                        <button 
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="p-1 hover:bg-green-600 rounded-full transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* User Info */}
                                    {isAuthenticated && (
                                        <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200">
                                            <p className="text-sm font-semibold text-neutral-950">{user?.firstName} {user?.lastName}</p>
                                            <p className="text-xs text-neutral-600 mt-0.5">{user?.email}</p>
                                        </div>
                                    )}

                                    {/* Navigation Links */}
                                    <div className="py-2">
                                        {isAuthenticated && (
                                            <>
                                                <div className="px-2 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                                    Browse
                                                </div>
                                                <Link href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                    All Products
                                                </Link>
                                                <Link href="#" className="flex items-center px-4 py-2.5 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                    Products
                                                </Link>
                                                <Link href="#" className="flex items-center px-4 py-2.5 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                    Brands
                                                </Link>
                                                <Link href="#" className="flex items-center px-4 py-2.5 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                    Services
                                                </Link>
                                                <Link href="#" className="flex items-center px-4 py-2.5 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                    Resources
                                                </Link>
                                                <Link href="#" className="flex items-center px-4 py-2.5 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                    Industries
                                                </Link>

                                                <div className="h-px bg-neutral-200 my-2"></div>

                                                <div className="px-2 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                                    Quick Actions
                                                </div>
                                            </>
                                        )}

                                        <button onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors w-full">
                                            <ListUnorderedIcon />
                                            Quick Order
                                        </button>
                                        <button onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors w-full">
                                            <MapPinLineIcon />
                                            Location
                                        </button>
                                        {isAuthenticated && (
                                            <Link href="/favorites" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                                                <Heart3LineIcon />
                                                Favourites
                                            </Link>
                                        )}

                                        {/* Account Section */}
                                        {isAuthenticated && (
                                            <>
                                                <div className="h-px bg-neutral-200 my-2"></div>
                                                <div className="px-2 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                                    Account
                                                </div>
                                                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                                                    <UserLineIcon />
                                                    My Profile
                                                </Link>
                                                <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                    </svg>
                                                    My Orders
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        handleLogout();
                                                        setMobileMenuOpen(false);
                                                    }}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full mt-2"
                                                >
                                                    <LogOut size={16} />
                                                    Logout
                                                </button>
                                            </>
                                        )}

                                        {!isAuthenticated && (
                                            <>
                                                <div className="h-px bg-neutral-200 my-2"></div>
                                                <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-green-600 hover:bg-green-50 transition-colors">
                                                    <UserLineIcon />
                                                    Sign In
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}