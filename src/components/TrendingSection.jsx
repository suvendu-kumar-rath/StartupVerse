import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../services/api'

export default function TrendingSection() {
  const [trendingItems, setTrendingItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await getAllPosts(1, 5, null, true)
        if (response.success && response.data?.posts) {
          setTrendingItems(response.data.posts)
        }
      } catch (error) {
        console.error('Error fetching trending items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrending()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left: large featured image */}
        {trendingItems.length > 0 && (
          <Link
            to={`/post/${trendingItems[0].id}`}
            className="no-underline md:col-span-2"
          >
            <div className="rounded-lg overflow-hidden bg-gray-800 hover:opacity-90 transition cursor-pointer">
              {trendingItems[0].image && (
                <img
                  src={trendingItems[0].image}
                  alt="Featured"
                  className="w-full h-80 md:h-96 object-cover rounded-lg"
                />
              )}

              <div className={`px-6 py-6 ${trendingItems[0].image ? 'bg-black' : 'bg-gray-900'}`}>
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-orange-500 text-black px-3 py-1 rounded-full text-xs font-semibold">{trendingItems[0].category || 'FEATURED'}</span>
                  <span className="text-gray-400 uppercase tracking-wider text-xs">FEATURED STORY</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                  {trendingItems[0].title}
                </h3>

                <p className="text-gray-400">{trendingItems[0].description || trendingItems[0].excerpt || 'Read this featured story'}</p>
              </div>
            </div>
          </Link>
        )}

        {/* Right: trending list */}
        <aside className="md:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <Link to="/news" className="text-orange-500 font-semibold hover:text-orange-400">ALL NEWS</Link>
          </div>

          <div className="space-y-6">
            {trendingItems.map((item, idx) => (
              <Link
                key={item.id}
                to={`/post/${item.id}`}
                className="no-underline"
              >
                <div className="border-t border-gray-800 pt-4 hover:bg-gray-900/30 px-3 py-1 rounded transition cursor-pointer">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <span className="text-4xl md:text-5xl font-bold text-orange-500">{String(idx + 1).padStart(2, '0')}</span>
                    </div>

                    <div className="flex-1">
                      <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.category}</div>
                      <div className="font-serif text-lg md:text-xl font-bold leading-tight mb-1 hover:text-orange-500 transition">{item.title}</div>
                      <div className="text-sm text-gray-400">{typeof item.author === 'object' ? item.author?.name : item.author || 'Staff'} · {item.readTime || '5 min'}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
