"use client"

export default function PopularReads() {
  const articles = [
    {
      id: 1,
      title: "Complete vs. Crew Tool Kits: Which Should You Choose?",
      date: "May 25, 2024",
      image: "/placeholder.svg?height=200&width=300",
      excerpt: "Comparing different tool kit options for industrial applications...",
    },
    {
      id: 2,
      title: "Taking Lessons From How Libraries Maximize Storage Space (High-Density)",
      date: "May 20, 2024",
      image: "/placeholder.svg?height=200&width=300",
      excerpt: "Learn efficient storage solutions from library science...",
    },
    {
      id: 3,
      title: "What to Wire Shelving: How Engineers is Right for You",
      date: "May 15, 2024",
      image: "/placeholder.svg?height=200&width=300",
      excerpt: "Engineering considerations for industrial shelving systems...",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Reads</h2>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">1</button>
            <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center">2</button>
            <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center">3</button>
            <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center">4</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="group cursor-pointer">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-sm text-gray-500 mb-2">{article.date}</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm">{article.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
