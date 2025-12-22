"use client"

import { useState } from "react"
import Image from "next/image"
import HeartLike21Icon from '@/assets/icons/heartLike21';
import { useFavorite } from '@/contexts/FavoriteContext';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

import ShoppingCartLineIcon from '@/assets/icons/shoppingCartLine';
import { ShoppingCart } from "lucide-react";

export default function ProductCard({
    product
}) {
    const [quantity, setQuantity] = useState(3);
    const { openSidebar, isFavorite } = useFavorite();
    const { isAuthenticated } = useAuth();

    const handleFavoriteClick = () => {
        if (!isAuthenticated) {
            toast.error("Please sign in to add favorites");
            return;
        }
        openSidebar(product);
    };

    const decreaseQty = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQty = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className={`bg-white rounded-[10px] border border-neutral-300 p-[10px] relative`}>
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
        <div className="bg-gray-100 rounded-[8px] mb-4 h-48 flex items-center justify-center overflow-hidden">
            <Image
            src={product.image}
            alt={product.name}
            width={153} // Assuming a fixed width/height for optimization, matching the parent div's height (h-48 = 192px)
            height={141} // Assuming a fixed width/height for optimization, matching the parent div's height (h-48 = 192px)
            className="w-full h-full object-contain p-4"
            />
        </div>

        {/* Category */}
        <p className="text-neutral-800 text-[14px] font-[400] leading-[100%] mb-[10px] mt-[12px] ">{product.categoryName}</p>

        {/* Product Name */}
        <h3 className="text-neutral-950 font-semibold text-[22px] leading-[100%] mb-3">{product.name}</h3>

        {/* Description */}
            <p className="text-neutral-600 text-[14px] font-[300] leading-[100%] mb-4">{product.description} | {product.descriptionShort}</p>

        {/* Item Number */}
        <p className="text-neutral-600 text-[14px] font-[300] leading-[100%] mb-[10px]">Item #{product.itemNumber}</p>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between border-t py-[10px]">
            <div className="flex items-baseline">
            <span className="text-[22px] font-[500] leading-[100%] text-neutral-950">${product.price}</span>
            <span className="text-[14px] font-[300] leading-[100%] text-neutral-950">/each</span>
            </div>

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
            <button className="w-full bg-white border border-[#ebebeb] text-neutral-600 hover:text-white py-3 rounded-[10px] hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                <ShoppingCart fill="currentColor" />
                <span className="text-[16px] leading-[20px]  font-[500]">
                    Add to Cart
                </span>
            </button>
        </div>
    );
}
