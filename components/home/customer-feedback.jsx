"use client"

import { Star, ArrowRight } from "lucide-react"

export default function CustomerFeedback() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Recent Customers Feedback</h2>
          <button className="text-green-600 hover:text-green-700 flex items-center space-x-1">
            <span>View All Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <div className="flex items-start space-x-6">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Customer"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 text-lg mb-4 leading-relaxed">
                "We've been sourcing our industrial components from Canadian Bearings for over a year now, and the
                experience has been consistently excellent. Their wide range of bearings and other mechanical
                components, combined with competitive pricing, makes it easy to find a supplier that combines quality,
                service, and reliability so well. Highly recommended for any industrial business."
              </blockquote>
              <div className="text-sm text-gray-600">
                <div className="font-semibold">John Smith, Operations Manager at Northwest Manufacturing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
