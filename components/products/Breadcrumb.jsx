"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * Breadcrumb Component
 * Displays hierarchical category navigation
 */
const Breadcrumb = ({ categoryPath = [], onCategoryClick }) => {
  return (
    <nav className="flex items-center gap-2 text-sm mb-4">
      <Link 
        href="/products" 
        className="text-neutral-600 hover:text-emerald-600 transition-colors"
      >
        Home
      </Link>
      
      {categoryPath.map((category, index) => (
        <React.Fragment key={category.key || index}>
          <ChevronRight size={16} className="text-neutral-400" />
          {index === categoryPath.length - 1 ? (
            <span className="text-neutral-900 font-medium">{category.name}</span>
          ) : (
            <button
              onClick={() => onCategoryClick(index)}
              className="text-neutral-600 hover:text-emerald-600 transition-colors"
            >
              {category.name}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
