import React from "react";
import CategoryCard from "@/components/ui/category-card";
import PageBanner from "@/components/search/PageBanner";
import Link from "next/link";

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
import cat11 from "@/assets/categories/category11.svg";
import cat12 from "@/assets/categories/category12.svg";
import cat13 from "@/assets/categories/category13.svg";
import cat14 from "@/assets/categories/category14.svg";
import cat15 from "@/assets/categories/category15.svg";
import cat16 from "@/assets/categories/category16.svg";
import cat17 from "@/assets/categories/category17.svg";
import cat18 from "@/assets/categories/category18.svg";
import cat19 from "@/assets/categories/category19.svg";
import cat20 from "@/assets/categories/category20.svg";
import ExploreOfferings from "@/components/home/explore-offerings";
import CTASection from "@/components/home/cta-section";

const categories = [
  { name: "Abrasives", icon: cat1 },
  { name: "Bearings", icon: cat2 },
  { name: "Cutting Tools", icon: cat3 },
  { name: "Electrical Supplies", icon: cat4 },
  { name: "Fasteners", icon: cat5 },
  { name: "Hardware & Material", icon: cat6 },
  { name: "Mechanical Power Transmission", icon: cat7 },
  { name: "Facility Supplies", icon: cat8 },
  { name: "Hydraulics", icon: cat9 },
  { name: "Lab Supplies", icon: cat10 },
  { name: "Linear Motion Systems", icon: cat11 },
  { name: "Lubrication Systems & Lubricants", icon: cat12 },
  { name: "Material Handling", icon: cat13 },
  { name: "Motors & Drives", icon: cat14 },
  { name: "MRO Chemicals", icon: cat15 },
  { name: "Pneumatics", icon: cat16 },
  { name: "Process Equipment", icon: cat17 },
  { name: "Safety & Environment", icon: cat18 },
  { name: "Tools", icon: cat19 },
  { name: "Seals", icon: cat20 },
];

const CategoriesPage = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto p-4">
        <PageBanner title="Categories" subtitle="Explore 21 diverse categories featuring over 10 million products tailored to your needs. Find everything you're looking for—quickly, easily, and all in one place." />

        {/* Simple responsive wrapping list of categories */}
        <div className="mt-6 mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((cat, idx) => {
              // generate a consistent slug for linking
              const slug = cat.name
                .toLowerCase()
                .replace(/&/g, "and")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

              return (
                <Link key={idx} href={`/categories/${slug}`} className="p-1 block">
                  <CategoryCard icon={cat.icon} name={cat.name} />
                </Link>
              );
            })}
          </div>
        </div>
             
      </div>
      <ExploreOfferings /><br />
      <CTASection />
    </div>
  );
};

export default CategoriesPage;
