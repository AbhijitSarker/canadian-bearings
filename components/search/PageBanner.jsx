import React from "react";
import greenBanner from "@/assets/greenBanner.svg";

const PageBanner = ({ title = 'Showing search result...', subtitle }) => {
  // Imported assets can be either a URL string or an object (e.g. { src, height, width })
  const bgUrl = typeof greenBanner === "string" ? greenBanner : (greenBanner?.src ?? greenBanner?.default ?? null);

  return (
    <header
      className="relative container mx-auto p-4 bg-cover bg-no-repeat rounded-3xl"
    >
      <div className="p-8 container mx-auto "
        style={{
          backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
          backgroundPosition: 'center',
          backgroundColor: bgUrl ? undefined : '#f6fef3'
        }}
        >
        <div className="max-w-5xl">
          <h1 className="text-[46px] font-semibold text-neutral-950">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-base text-[#5c5c5c] font-light">{subtitle}</p>
          ) : (
              <p className="mt-4 text-base text-[#5c5c5c]  font-light tracking-wider">
              Explore <span className="font-bold text-neutral-950">21 diverse categories</span> featuring{' '}
              <span className="font-bold text-neutral-950">over 10 million products</span> tailored to your needs.
              Find everything you're looking for—quickly, easily, and all in one place.
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageBanner;
