"use client";
import React, { useState } from "react";

const TABS = ["Technical Specifications", "Packaging Details", "Resources", "Customer Specific Info", "Order History"];

export default function ProductTabs({ specs }) {
  const [activeTab, setActiveTab] = useState("Technical Specifications");

  return (
    <section className="my-16">
      <h2 className="mb-8 text-3xl font-bold text-slate-900">Overview</h2>

      {/* Tab Headers */}
      <div className="mb-0 flex w-full overflow-x-auto border-b border-gray-200 bg-gray-50/50 scrollbar-hide">
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative min-w-fit px-8 py-4 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white font-bold text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-orange-600"
                  : "text-gray-500 hover:bg-gray-100 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab Content (Technical Specs Table) */}
      <div className="overflow-hidden rounded-b-lg border border-t-0 border-gray-200 bg-white">
        {activeTab === "Technical Specifications" && (
          <table className="w-full text-left">
            <tbody>
              {specs.map((spec, index) => (
                <tr key={index} className="group hover:bg-inherit odd:bg-white even:bg-gray-50">
                  <td className="w-1/3 border-b border-gray-100 py-5 pl-8 font-bold text-slate-900 group-last:border-0">
                    {spec.label}
                  </td>
                  <td className="border-b border-gray-100 py-5 pr-8 font-medium text-slate-700 group-last:border-0">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Placeholder for other tabs */}
        {activeTab !== "Technical Specifications" && (
          <div className="p-8 text-center text-gray-500">
            Content for {activeTab} goes here.
          </div>
        )}
      </div>

      <button className="mt-8 h-12 rounded-md border border-gray-300 px-8 font-bold text-slate-700 hover:bg-gray-50">
        See More
      </button>
    </section>
  );
}