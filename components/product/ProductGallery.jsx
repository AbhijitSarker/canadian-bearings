"use client";
import React, { useState } from "react";

export default function ProductGallery({ images, title }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="flex items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-8">
        <img
          src={images[selectedImageIndex]}
          alt={title}
          className="max-h-[400px] w-auto object-contain mix-blend-multiply"
        />
      </div>

      {/* Thumbnails */}
      {/* FIX: 
         1. Changed 'flex' to 'grid grid-cols-4' (forces 4 columns, no scrolling).
         2. Removed 'overflow-x-auto' (removes scrollbar).
         3. Removed 'pb-2' (padding for scrollbar no longer needed).
      */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImageIndex(idx)}
            /* FIX: 
               1. Removed fixed width 'w-24 min-w-[6rem]' 
               2. Added 'w-full aspect-square' so it fills the grid cell perfectly.
            */
            className={`relative flex w-full aspect-square cursor-pointer items-center justify-center rounded-lg border bg-gray-50/50 p-2 transition-all ${
              selectedImageIndex === idx
                ? "border-blue-600 ring-1 ring-blue-600"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx}`}
              className="h-full w-full object-contain mix-blend-multiply"
            />
          </button>
        ))}
      </div>
    </div>
  );
}