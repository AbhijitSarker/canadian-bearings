"use client"

import { ArrowRight } from "lucide-react"

export default function ExploreOfferings() {
  return (
    <section className="py-16 bg-slate-700 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Explore Our Offerings</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-slate-600 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Explore More Industries</h3>
            <p className="text-slate-300 mb-6">
              We understand the importance of reliable industrial solutions across various sectors. From manufacturing
              to energy, we provide specialized components.
            </p>
            <button className="text-green-400 hover:text-green-300 flex items-center space-x-2">
              <span>Explore Industries</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-600 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Work Safety</h3>
            <p className="text-slate-300 mb-6">
              Prioritizing workplace safety through quality products and comprehensive safety solutions for industrial
              environments.
            </p>
            <button className="text-green-400 hover:text-green-300 flex items-center space-x-2">
              <span>Shop for Safety</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:row-span-2">
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Industrial worker in safety gear"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
