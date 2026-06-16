export default function ArticleSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-semibold text-orange-500">IN CONVERSATION</span>
        <a href="#" className="text-orange-500 font-semibold hover:text-orange-400">DISCOVER MORE</a>
      </div>

      <div className="bg-gray-900 rounded-lg p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">
            Inside the $450M raise that made Laumen AI the fastest unicorn of 2026
          </h2>
          <p className="text-gray-400 mb-6">
            A deep dive interview with our team of researchers in conversation with VCs and founders about what this milestone means for AI infrastructure.
          </p>
          <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold">Read the report →</a>
        </div>

        <div className="w-full md:w-1/3 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop"
            alt="Interview"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
