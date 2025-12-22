"use client"

import { useState } from "react"
import Image from "next/image"
import HeartLike21Icon from '@/assets/icons/heartLike21';
import { useFavorite } from '@/contexts/FavoriteContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import toast from 'react-hot-toast';

import ShoppingCartLineIcon from '@/assets/icons/shoppingCartLine';
import { ShoppingCart } from "lucide-react";

export default function ProductListCard({
    product
}) {
    const [quantity, setQuantity] = useState(1);
    const { openSidebar, isFavorite } = useFavorite();
    const { isAuthenticated } = useAuth();
    const { addItem, openCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleFavoriteClick = () => {
        if (!isAuthenticated) {
            toast.error("Please sign in to add favorites");
            return;
        }
        openSidebar(product);
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.error("Please sign in to add items to cart");
            return;
        }

        setIsAdding(true);
        // Use mfgSKU if available, otherwise fallback to cbSKU or itemNumber
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
        <div className={`bg-white rounded-[10px] border border-neutral-300 p-[10px] relative transition-all hover:shadow-md flex flex-col md:flex-row gap-6`}>
            {/* Left: Product Image */}
            <div className="w-full md:w-48 h-48 bg-gray-100 rounded-[8px] flex-shrink-0 relative flex items-center justify-center overflow-hidden">
                {/* Favorite Icon */}
                 <button
                    onClick={handleFavoriteClick}
                    className="absolute top-2 right-2 z-10"
                >
                    <div className={`w-[36px] h-[36px] flex items-center justify-center rounded-full transition-colors ${isFavorite ? 'bg-red-50' : 'bg-white'}`}>
                        <HeartLike21Icon className={isFavorite ? 'text-red-500 fill-current' : ''} />
                    </div>
                </button>

                <Image
                src={product.image}
                alt={product.name}
                width={153}
                height={141}
                className="w-full h-full object-contain p-4"
                />
            </div>

            {/* Middle: Product Details */}
            <div className="flex-1 flex flex-col justify-center min-w-0 py-1">
                {/* Category */}
                <p className="text-neutral-800 text-[14px] font-[400] leading-[100%] mb-[10px]">{product.categoryName}</p>

                {/* Product Name */}
                <h3 className="text-neutral-950 font-[500] text-[22px] leading-[100%] mb-3">{product.name}</h3>

                {/* Description */}
                <p className="text-neutral-950 text-[14px] font-[300] leading-[100%] mb-3">{product.description} | {product.descriptionShort}</p>
                
                {/* Item Number */}
                <p className="text-neutral-950 text-[14px] font-[300] leading-[100%] mt-auto mb-3">Item #{product.itemNumber}</p>

                {/* Attributes - List View Exclusive Details */}
                {product.attributes && product.attributes.length > 0 && (
                    <div className="mb-4">
                         <ul className="text-[13px] leading-[160%] text-neutral-600 space-y-1">
                            {product.attributes.slice(0, 5).map((attr, idx) => (
                                <li key={idx} className="flex items-start">
                                     <span className="text-neutral-400 mr-2">•</span>
                                     <span>
                                         {attr.value} {attr.unitName || ''}
                                         <span className="text-neutral-400 ml-1">{attr.attributeName}</span>
                                     </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>

            {/* Right: Pricing & Actions */}
            <div className="w-full md:w-64 flex-shrink-0 flex flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-neutral-100 pt-4 md:pt-0 md:pl-6">
                
                <div className="flex flex-col items-start md:items-end gap-1">
                    <div className="flex items-baseline">
                        <span className="text-[22px] font-[500] leading-[100%] text-neutral-950">${product.price}</span>
                        <span className="text-[14px] font-[300] leading-[100%] text-neutral-950">/{product.unitName || 'each'}</span>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-3 w-full">
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

                    <button 
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="w-full bg-white border border-[#ebebeb] text-neutral-600 hover:text-white py-3 rounded-[10px] hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShoppingCart fill="currentColor"/>
                        <span className="text-[16px] leading-[20px]  font-[500]">
                            {isAdding ? 'Adding...' : 'Add to Cart'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
