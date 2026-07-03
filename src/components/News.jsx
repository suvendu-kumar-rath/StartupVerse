import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts, getAllCategories } from '../services/api'

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState(['ALL', 'FUNDING', 'AI', 'FOUNDERS', 'CLIMATE', 'M&A', 'ANALYSIS', 'FAILURES', 'HARDWARE'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch posts and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch posts
        const postsResponse = await getAllPosts(1, 50)
        if (postsResponse.success && postsResponse.data) {
          setArticles(postsResponse.data.posts || [])
        } else {
          console.warn('Failed to fetch posts, using empty array')
          setArticles([])
        }
        
        // Fetch categories
        const categoriesResponse = await getAllCategories()
        if (categoriesResponse.success && categoriesResponse.data) {
          const categoryNames = categoriesResponse.data.map(cat => cat.name || cat).filter(Boolean)
          setCategories(['ALL', ...categoryNames])
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err.message)
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredArticles = selectedCategory === 'ALL' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-400">Loading news...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-2 max-w-6xl mx-auto mt-4 rounded">
          Note: Using cached data. API Error: {error}
        </div>
      )}
      {/* Header Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-6">
          <span className="text-orange-500 font-semibold text-sm">NEWSROOM</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-serif font-bold mb-4">The News</h1>
        <p className="text-gray-400 text-lg mb-8">
          Reporting from the startup ecosystem — funding, founders, AI, climate, M&A.
        </p>
        <div className="border-t border-gray-700"></div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Articles and Filters */}
          <div className="md:col-span-2">
            {/* Search and Category Filters */}
            <div className="mb-8">
              <div className="relative mb-6">
                <span className="absolute left-3 top-3 text-gray-500">🔍</span>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900 text-white pl-10 pr-4 py-3 rounded border border-gray-700 focus:border-orange-500 focus:outline-none transition"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                      selectedCategory === category
                        ? 'bg-white text-black'
                        : 'bg-transparent border border-gray-600 text-gray-300 hover:border-orange-500'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.slice(0, 8).map(article => (
                <Link
                  key={article.id}
                  to={`/post/${article.id}`}
                  className="no-underline"
                >
                  <div className="card-dark hover:bg-gray-900 transition cursor-pointer group overflow-hidden rounded-lg h-full">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-semibold text-orange-500">{article.category}</span>
                      <h3 className="font-bold text-base mt-2 mb-3 leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{article.author}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <button className="px-8 py-3 border-2 border-gray-600 text-white hover:border-orange-500 hover:text-orange-500 rounded font-semibold transition">
                Load more stories
              </button>
            </div>
          </div>

          {/* Right: Trending Sidebar */}
          <aside className="md:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">Trending</h2>
              
              <div className="space-y-6">
                {articles.slice(0, 5).map((item, idx) => (
                  <Link
                    key={item.id}
                    to={`/post/${item.id}`}
                    className="no-underline"
                  >
                    <div className="border-t border-gray-800 pt-4 hover:bg-gray-900/50 p-3 rounded transition cursor-pointer group">
                      <div className="flex gap-4">
                        <div className="text-orange-500 font-bold text-3xl flex-shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-semibold text-gray-400 uppercase">{item.category}</span>
                          <h3 className="font-serif font-bold text-lg mt-1 leading-tight group-hover:text-orange-500 transition">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
