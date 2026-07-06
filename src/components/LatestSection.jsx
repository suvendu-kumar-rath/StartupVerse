import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts, getPostImage } from '../services/api'

export default function LatestSection() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await getAllPosts(1, 6)
        if (response.success && response.data?.posts) {
          setArticles(response.data.posts)
        }
      } catch (error) {
        console.error('Error fetching latest articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatest()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">The Latest</h2>
        <Link to="/news" className="text-orange-500 font-semibold hover:text-orange-400">SEE ALL</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/post/${article.id}`}
            className="no-underline"
          >
            <div className="card-dark hover:bg-gray-800 transition overflow-hidden group h-full flex flex-col">
              {getPostImage(article) ? (
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={getPostImage(article)}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              ) : null}
              <div className="p-4 flex-1 flex flex-col">
                <span className="text-xs font-semibold text-orange-500">{article.category || 'NEWS'}</span>
                <h3 className="font-bold text-lg mt-2 mb-3 line-clamp-2">{article.title}</h3>
                {article.excerpt && <p className="text-gray-400 text-sm mb-3 line-clamp-2">{article.excerpt}</p>}
                <div className="flex justify-between text-xs text-gray-400 mt-auto">
                  <span>{typeof article.author === 'object' ? article.author?.name : article.author || 'Staff'}</span>
                  <span>{article.readTime || '5 min'}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
