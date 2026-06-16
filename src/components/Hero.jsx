export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=900&fit=crop"
            alt="Team workshop"
            className="w-full h-96 md:h-[520px] object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center md:items-end md:text-right">
          <div className="mb-4 flex items-center gap-4">
            <span className="bg-orange-500 text-black px-3 py-1 rounded-full text-xs font-semibold">FUNDING</span>
            <span className="text-gray-400 uppercase tracking-wider text-xs">FEATURED STORY</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight max-w-lg">
            Inside the $450M raise that made Laumen AI the fastest unicorn of 2026
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Discover what made this company raise a record-breaking amount in just 90 days. Here's what experts are saying and how it could reshape the industry forever.
          </p>

          <div className="md:self-end">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition">
              Read Full Story
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
