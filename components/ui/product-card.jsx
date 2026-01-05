"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import HeartLike21Icon from '@/assets/icons/heartLike21';
import { useFavorite } from '@/contexts/FavoriteContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import toast from 'react-hot-toast';

import ShoppingCartLineIcon from '@/assets/icons/shoppingCartLine';
import { ShoppingCart, Eye, Loader2 } from "lucide-react";
import { getProductPrice } from "@/lib/api/services/products";

export default function ProductCard({
    product
}) {
    const [quantity, setQuantity] = useState(1);
    const { openSidebar, isFavorite } = useFavorite();
    const { isAuthenticated } = useAuth();
    const { addItem, openCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [priceData, setPriceData] = useState(null);
    const [isPriceRevealed, setIsPriceRevealed] = useState(false);
    const [isLoadingPrice, setIsLoadingPrice] = useState(false);

    const handleFavoriteClick = () => {
        if (!isAuthenticated) {
            toast.error("Please sign in to add favorites");
            return;
        }
        openSidebar(product);
    };

    const handleRevealPrice = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        setIsLoadingPrice(true);
        
        // Determine which part number to use
        const partNo = product.custSKU || product.cbSKU;
        
        if (!partNo) {
            // No part number available, show "On Request"
            setPriceData({ por: true });
            setIsPriceRevealed(true);
            setIsLoadingPrice(false);
            return;
        }

        try {
            const data = await getProductPrice(partNo);
            if (data.success) {
                setPriceData(data.product);
            } else {
                setPriceData({ por: true });
            }
            setIsPriceRevealed(true);
        } catch (error) {
            console.error("Error fetching price:", error);
            setPriceData({ por: true });
            setIsPriceRevealed(true);
        } finally {
            setIsLoadingPrice(false);
        }
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.error("Please sign in to add items to cart");
            return;
        }

        setIsAdding(true);
        const sku = product.mfgSKU || product.cbSKU || product.itemNumber;
        
        try {
            const result = await addItem(product.id, sku, quantity);
            if (result.success) {
                openCart();
            }
        } finally {
            setIsAdding(false);
        }
    };

    const decreaseQty = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQty = () => {
        setQuantity(quantity + 1);
    };

    return (
        /* 1. Added 'h-full', 'flex', and 'flex-col' to the main wrapper. 
              This ensures the card stretches to fill the grid cell and acts as a flex container.
        */
        <div className={`bg-white rounded-[10px] border border-neutral-300 p-[10px] hover:shadow-md relative h-full flex flex-col`}>
            {/* Favorite Icon */}
            <button
                onClick={handleFavoriteClick}
                className="absolute top-4 right-4 z-10"
            >
                <div className={`w-[36px] h-[36px] flex items-center justify-center rounded-full transition-colors ${isFavorite ? 'bg-red-50' : 'bg-white'}`}>
                    <HeartLike21Icon className={isFavorite ? 'text-red-500 fill-current' : ''} />
                </div>
            </button>

                {/* Product Image */}
                <div className="bg-gray-100 rounded-[8px] mb-4 h-48 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={153}
                        height={141}
                        className="w-full h-full object-contain p-4"
                    />
                </div>

                {/* Category */}
                <p className="text-neutral-800 text-[14px] font-[400] leading-[100%] mb-[10px] mt-[12px] truncate">
                    {product.categoryName}
                </p>

            {/* Clickable Product Link */}
            <Link href={`/products/${product.uniqueId}`} className="block">
                {/* Product Name - Added line-clamp-2 to ensure consistent height */}
                <h3 className="text-neutral-950 hover:text-green-500 hover:underline font-semibold text-[22px] leading-[110%] mb-3 line-clamp-2 h-[50px]">
                    {product.name}
                </h3>

            </Link>
                {/* Description - Added line-clamp to prevent overflowing cards */}
                <p className="text-neutral-600 text-[14px] font-[300] leading-[100%] mb-4 line-clamp-2">
                    {product.description} | {product.descriptionShort}
                </p>

                {/* Item Number */}
                <p className="text-neutral-600 text-[14px] font-[300] leading-[100%] mb-[10px]">
                    Item #{product.itemNumber}
                </p>

            {/* 2. Added 'mt-auto' here. 
                  This pushes the Price section (and everything below it) to the bottom of the card.
            */}
            <div className="mt-auto pt-[10px]">
                <div className="flex items-center justify-between border-t py-[10px]">
                    {!isPriceRevealed ? (
                        <button
                            onClick={handleRevealPrice}
                            disabled={isLoadingPrice}
                            className="flex items-center gap-1.5 rounded-md bg-orange-50 px-3 py-2 text-xs font-medium text-[#E65100] transition-all hover:bg-orange-100 disabled:opacity-50"
                        >
                            {isLoadingPrice ? (
                                <>
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <>
                                    <Eye className="h-3 w-3" />
                                    <span>Reveal Price</span>
                                </>
                            )}
                        </button>
                    ) : (
                        <div className="flex items-baseline">
                            {priceData?.por || !priceData?.price ? (
                                <span className="text-[14px] font-[500] leading-[100%] text-slate-600">On Request</span>
                            ) : (
                                <>
                                    <span className="text-[22px] font-[500] leading-[100%] text-neutral-950">
                                        ${priceData.price.toFixed(2)}
                                    </span>
                                    <span className="text-[14px] font-[300] leading-[100%] text-neutral-950">
                                        /{priceData.uomName || 'each'}
                                    </span>
                                </>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <span className="text-[14px] font-[300] leading-[100%] text-neutral-800">QTY:</span>
                        <div className="flex items-center justify-center bg-neutral-50 rounded-[36px] p-[3px] max-w-[96px]">
                            <button
                                onClick={decreaseQty}
                                className="w-[31px] h-[31px] bg-white border border-grey-50 rounded-[34px] flex items-center justify-center"
                            >
                                −
                            </button>
                            <span className="text-center px-[7px]">
                                {quantity}
                            </span>
                            <button
                                onClick={increaseQty}
                                className="w-[31px] h-[31px] bg-white border border-grey-50 rounded-[34px] flex items-center justify-center"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-full bg-green-500 border border-[#ebebeb] text-white hover:text-white py-3 rounded-[10px] hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ShoppingCart size={20} />
                    <span className="text-[16px] leading-[20px] font-[500]">
                        {isAdding ? 'Adding...' : 'Add to Cart'}
                    </span>
                </button>
            </div>
        </div>
    );
}