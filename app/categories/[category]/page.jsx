import React from "react";
import PageBanner from "@/components/search/PageBanner";
import CategoryCard from "@/components/ui/category-card";
import SearchShell from "@/components/search/SearchShell";
import { notFound } from "next/navigation";
import { allowedNames, slugify } from "../allowed-names";

// Subcategory icons (reuse existing category assets as placeholders)
import cat1 from "@/assets/categories/category1.png";
import cat2 from "@/assets/categories/category2.svg";
import cat3 from "@/assets/categories/category3.svg";
import cat4 from "@/assets/categories/category4.svg";
import cat5 from "@/assets/categories/category5.svg";
import cat6 from "@/assets/categories/category6.svg";
import cat7 from "@/assets/categories/category7.svg";
import cat8 from "@/assets/categories/category8.svg";
import cat9 from "@/assets/categories/category9.svg";
import cat10 from "@/assets/categories/category10.svg";

const subcategoryMap = {
  abrasives: [
    { name: "Abrasives Brush", icon: cat1 },
    { name: "Adapters", icon: cat2 },
    { name: "Back-Up Pads", icon: cat3 },
    { name: "Belts", icon: cat4 },
    { name: "Cones & Plugs", icon: cat5 },
    { name: "Discs", icon: cat6 },
    { name: "Dressing Tools", icon: cat7 },
    { name: "Expanding Drums", icon: cat8 },
    { name: "Pads & Sheets", icon: cat9 },
    { name: "Other Abrasives", icon: cat10 },
  ],
  // fallback example for bearings (reuse icons)
  bearings: [
    { name: "Ball Bearings", icon: cat2 },
    { name: "Roller Bearings", icon: cat3 },
    { name: "Sealed Bearings", icon: cat4 },
  ],
};

function titleFromSlug(slug) {
  if (!slug) return "Category";
  // replace dashes/underscores and title case
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
}

const CategoryPage = async ({ params }) => {
  // `params` is a promise-like object in Next's app router for some usages —
  // await it before accessing properties to avoid the runtime warning.
  const p = await params;
  const slug = (p?.category || "").toLowerCase();

  const slugToName = Object.fromEntries(allowedNames.map((n) => [slugify(n), n]));

  if (!slugToName[slug]) {
    // Unknown category -> render the app-level not-found
    notFound();
  }

  const title = slugToName[slug] || titleFromSlug(slug);
  const subcats = subcategoryMap[slug] || [];

  return (
    <div className="w-full">
      <div className="container mx-auto p-4">
        <PageBanner title={title} subtitle={`Choose from Canadian Bearing's wide range of ${title.toLowerCase()}.`} />

        {/* Subcategories */}
        <div className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {subcats.map((s, i) => (
              <div key={i} className="p-1">
                <CategoryCard icon={s.icon} name={s.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Search results / product listing shell */}
        <div className="mt-8">
          <SearchShell />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
