export default function TrendingSection() {
  const trendingItems = [
    {
      num: "01",
      category: "Founders",
      title: "The quiet epidemic: why 1 in 3 founders are walking away in 2026",
      author: "Marcus Chen",
      time: "12 min"
    },
    {
      num: "02",
      category: "Climate",
      title: "Climate tech just had its biggest quarter ever — here's the map",
      author: "Priya Subramaniam",
      time: "6 min"
    },
    {
      num: "03",
      category: "M & A",
      title: "Shopify quietly acquired Stitch for $1.2B. Here's what it changes.",
      author: "Jordan Reeves",
      time: "5 min"
    },
    {
      num: "04",
      category: "Analysis",
      title: "We read every pitch in YC W26.",
      author: "Staff",
      time: "8 min"
    }
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left: large featured image */}
        <div className="md:col-span-2 rounded-lg overflow-hidden bg-gray-800">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop"
            alt="Featured"
            className="w-full h-80 md:h-96 object-cover rounded-lg"
          />

          <div className="px-6 py-6 bg-black">
            <div className="flex items-center gap-4 mb-3">
              <span className="bg-orange-500 text-black px-3 py-1 rounded-full text-xs font-semibold">FUNDING</span>
              <span className="text-gray-400 uppercase tracking-wider text-xs">FEATURED STORY</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
              Inside the $450M raise that made Laumen AI the fastest unicorn of 2026
            </h3>

            <p className="text-gray-400">Discover what made this company raise a record-breaking amount in just 90 days.</p>
          </div>
        </div>

        {/* Right: trending list */}
        <aside className="md:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <a href="#" className="text-orange-500 font-semibold hover:text-orange-400">ALL NEWS</a>
          </div>

          <div className="space-y-6">
            {trendingItems.map((item, idx) => (
              <div key={idx} className="border-t border-gray-800 pt-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-4xl md:text-5xl font-bold text-orange-500">{item.num}</span>
                  </div>

                  <div className="flex-1">
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.category}</div>
                    <div className="font-serif text-lg md:text-xl font-bold leading-tight mb-1">{item.title}</div>
                    <div className="text-sm text-gray-400">{item.author} · {item.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
