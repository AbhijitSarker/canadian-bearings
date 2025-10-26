import React from "react";

const SearchHero = ({ title = 'Search for "2 bolt flange bearing"', subtitle }) => {
  return (
    <header className="relative bg-emerald-50/70 dark:bg-emerald-900/20 rounded-b-3xl">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-900 dark:text-white leading-tight">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-lg md:text-xl text-emerald-800/80 dark:text-emerald-200">
              {subtitle}
            </p>
          ) : (
            <p className="mt-4 text-lg md:text-xl text-emerald-800/80 dark:text-emerald-200">
              Choose from Canadian Bearing's wide range of abrasives—brushes, pads, cones, and more—for
              efficient grinding, polishing, and cleaning.
            </p>
          )}
        </div>
      </div>

      {/* subtle decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 md:h-56 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50 to-transparent opacity-60" />
    </header>
  );
};

export default SearchHero;
