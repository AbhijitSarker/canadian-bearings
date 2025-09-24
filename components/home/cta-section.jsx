"use client"

export default function CTASection() {
  return (
    <section className="py-20 bg-slate-800 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Business partnership"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold mb-6 leading-tight">WE'RE BETTER TOGETHER</h2>
          <p className="text-xl text-slate-300 mb-8">
            Partner with us for reliable industrial solutions and exceptional service.
          </p>
          <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}
