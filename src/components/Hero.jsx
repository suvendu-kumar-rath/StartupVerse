import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../services/api'

export default function Hero() {
  const [hero, setHero] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await getAllPosts(1, 1)
        if (response.success && response.data?.posts && response.data.posts.length > 0) {
          setHero(response.data.posts[0])
        }
      } catch (error) {
        console.error('Error fetching hero:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHero()
  }, [])

  if (loading || !hero) return null

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        {hero.image && (
          <div className="rounded-lg overflow-hidden h-96 md:h-[520px] flex items-center justify-center bg-gray-900">
            <img
              src={hero.image}
              alt={hero.title}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Content */}
        <div className={`flex flex-col justify-center ${hero.image ? 'md:items-end md:text-right' : ''}`}>
          <div className="mb-4 flex items-center gap-4">
            <span className="bg-orange-500 text-black px-3 py-1 rounded-full text-xs font-semibold">{hero.category || 'FEATURED'}</span>
            <span className="text-gray-400 uppercase tracking-wider text-xs">FEATURED STORY</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight max-w-lg">
            {hero.title}
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-md">
            {hero.excerpt || hero.description || hero.content?.substring(0, 200)}
          </p>

          <div className={hero.image ? 'md:self-end' : ''}>
            <Link to={`/post/${hero.id}`}>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition">
                Read Full Story
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
