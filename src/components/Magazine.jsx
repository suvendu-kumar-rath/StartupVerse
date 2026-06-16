export default function Magazine() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">Coming Soon</h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          Our Magazine section is under development. Check back soon for in-depth stories and insights.
        </p>
        <a 
          href="/" 
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded font-semibold transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
