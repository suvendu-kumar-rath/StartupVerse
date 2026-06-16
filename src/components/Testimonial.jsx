export default function Testimonial() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-gray-100 text-gray-900 rounded-lg p-8">
        <span className="inline-block text-sm font-semibold text-orange-500 mb-4">EXPERT INSIGHTS</span>
        
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
            RK
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Ritza Kaplan</h3>
            <p className="text-gray-600 font-semibold mb-3">Founder & CEO, InnovateTech</p>
            <p className="text-gray-800">
              "The shift in raise patterns this year isn't just about numbers. It's about a fundamental re-evaluation of infrastructure and the role it plays in scaling AI products."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
