import { useState, useEffect } from 'react'
import { getAllPosts } from '../services/api'

export default function Testimonial() {
  const [testimonial, setTestimonial] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        // Fetch posts marked as testimonials
        const response = await getAllPosts(1, 1, 'TESTIMONIALS')
        if (response.success && response.data?.posts && response.data.posts.length > 0) {
          const post = response.data.posts[0]
          setTestimonial({
            name: post.author?.name || post.author || 'Expert',
            title: post.authorTitle || 'Industry Expert',
            quote: post.content || post.excerpt || post.title
          })
        }
      } catch (error) {
        console.error('Error fetching testimonial:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonial()
  }, [])

  if (loading || !testimonial) return null

  const initials = testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-gray-100 text-gray-900 rounded-lg p-8">
        <span className="inline-block text-sm font-semibold text-orange-500 mb-4">EXPERT INSIGHTS</span>
        
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
            {initials}
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{testimonial.name}</h3>
            <p className="text-gray-600 font-semibold mb-3">{testimonial.title}</p>
            <p className="text-gray-800">
              "{testimonial.quote}"
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
