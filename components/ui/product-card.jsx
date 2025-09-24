"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Plus, Minus } from "lucide-react"

export default function ProductCard({
    category = "Ball Bearings",
    title = "SKF 6203 2ZJEM",
    description = "6203 2ZJEM | Single Row Cylindrical Bore Deep Groove Ball Bearing",
    itemNumber = "#101525229",
    price = 31.89,
    image = "/placeholder.svg?height=300&width=300",
    imageAlt = "Ball bearing product",
    onAddToCart,
    onToggleFavorite,
    className = "",
}) {
    const [quantity, setQuantity] = useState(3)
    const [isFavorite, setIsFavorite] = useState(false)

    const handleQuantityChange = (change) => {
        const newQuantity = Math.max(1, quantity + change)
        setQuantity(newQuantity)
    }

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite)
        if (onToggleFavorite) {
            onToggleFavorite(!isFavorite)
        }
    }

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart({ title, price, quantity, itemNumber })
        }
    }

    return (
        <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-4 max-w-sm mx-auto ${className}`}>
            {/* Product Image with Heart Icon Overlay */}
            <div className="relative flex justify-center mb-6">
                <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                    <Image
                        src={image || "/placeholder.svg"}
                        alt={imageAlt}
                        width={192}
                        height={192}
                        className="object-contain w-full h-full"
                    />
                    {/* Heart Icon Overlay */}
                    <button
                        onClick={handleToggleFavorite}
                        className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-gray-50 rounded-full transition-colors shadow"
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        style={{ zIndex: 2 }}
                    >
                        <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
                <p className="text-gray-600 text-sm font-medium">{category}</p>

                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

                <p className="text-gray-500 text-sm">{`Item ${itemNumber}`}</p>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Price and Quantity */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</span>
                    <span className="text-gray-500 text-sm ml-1">/each</span>
                </div>

                <div className="flex items-center space-x-3">
                    <span className="text-gray-600 text-sm font-medium">QTY:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className="p-2 hover:bg-gray-50 transition-colors rounded-l-lg"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="px-4 py-2 text-center min-w-[3rem] font-medium">{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className="p-2 hover:bg-gray-50 transition-colors rounded-r-lg"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
            >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
            </button>
        </div>
    )
}
