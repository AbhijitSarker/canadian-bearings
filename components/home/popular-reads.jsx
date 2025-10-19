"use client"

import { useState } from "react" 
import Image from "next/image"
import blog1 from '@/assets/blogs/blog_1.png'
import blog2 from '@/assets/blogs/blog_2.png'
import ArrowRightIcon from "@/assets/icons/arrowRight"

export default function PopularReads() {
  // Extended the articles array to better demonstrate pagination
  const allArticles = [
    {
      id: 1,
      title: "Complete vs. Crew Tool Kits: Which Should You Choose?",
      date: "May 25, 2024",
      image: blog1,
      excerpt: "Comparing different tool kit options for industrial applications...",
    },
    {
      id: 2,
      title: "Taking Lessons From How Libraries Maximize Storage Space (High-Density)",
      date: "May 20, 2024",
      image: blog2,
      excerpt: "Learn efficient storage solutions from library science...",
    },
    {
      id: 3,
      title: "Complete vs. Crew Tool Kits: Which Should You Choose?",
      date: "May 25, 2024",
      image: blog1,
      excerpt: "Comparing different tool kit options for industrial applications...",
    },
    {
      id: 4,
      title: "Taking Lessons From How Libraries Maximize Storage Space (High-Density)",
      date: "May 20, 2024",
      image: blog2,
      excerpt: "Learn efficient storage solutions from library science...",
    },
    {
      id: 5,
      title: "Complete vs. Crew Tool Kits: Which Should You Choose?",
      date: "May 25, 2024",
      image: blog1,
      excerpt: "Comparing different tool kit options for industrial applications...",
    },
    {
      id: 6,
      title: "Taking Lessons From How Libraries Maximize Storage Space (High-Density)",
      date: "May 20, 2024",
      image: blog2,
      excerpt: "Learn efficient storage solutions from library science...",
    },
    {
      id: 7,
      title: "Complete vs. Crew Tool Kits: Which Should You Choose?",
      date: "May 25, 2024",
      image: blog1,
      excerpt: "Comparing different tool kit options for industrial applications...",
    },
  ]

  const [currentPage, setCurrentPage] = useState(1); // State to manage the current page
  const articlesPerPage = 3; // Number of articles to display per page

  // Calculate total number of pages
  const totalPages = Math.ceil(allArticles.length / articlesPerPage);

  // Calculate the articles to display on the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = allArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Handler for changing the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="py-[70px] bg-white">
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between items-center mb-8">
          <div className="text-[40px] leading-[48px] font-[500] text-neutral-950">Popular Reads</div>
          <div className="flex items-center space-x-2 mt-5 md:mt-0">
            {/* Dynamically render pagination buttons */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1} // Unique key for each button
                onClick={() => handlePageChange(index + 1)} // Update current page on click
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200
                  ${currentPage === index + 1 ? "bg-green-600 text-white" : "bg-neutral-50 text-neutral-950 hover:bg-gray-100 font-[300]"}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {/* Map over currentArticles to display only articles for the active page */}
          {currentArticles.map((article) => (
            <article key={article.id} className="group cursor-pointer border p-[10px] rounded-[10px]">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-[15px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={380}
                  height={250}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center gap-x-[15px] mb-[15px]">
                <div className="bg-green-50 rounded-[30px] px-[16px] py-[8px] text-[16px] leading-[128%] font-[500] text-green-500">
                  Buying Guides
                </div>
                <div className="text-sm text-gray-500 py-[6px]">5 min read · Mar 20, 2024</div>
              </div>
              <div className="mb-[20px]">
                <div className="text-[20px] leading-[148%] font-[500] text-neutral-950 mb-[8px]">
                  {article.title}
                </div>
                <p className="text-[16px] leading-[153%] font-[300] text-neutral-600">{article.excerpt}</p>
              </div>
              <div className="flex items-center gap-x-2 text-[16px] leading-[153%] font-[400] text-green-500">
                Read More
                <ArrowRightIcon />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
