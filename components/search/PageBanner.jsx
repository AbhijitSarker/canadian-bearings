import React from "react";

const PageBanner = ({ title = 'Showing search result...', subtitle }) => {
  return (
    <header className="relative container mx-auto bg-[#f6fef3] rounded-3xl">
      <div className="p-8 container mx-auto ">
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
