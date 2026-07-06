import { useState, useEffect } from 'react'
import { getAllPosts, getPostImage } from '../services/api'

export default function ArticleSection() {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getAllPosts(1, 1)
        if (response.success && response.data?.posts && response.data.posts.length > 0) {
          setArticle(response.data.posts[0])
        }
      } catch (error) {
        console.error('Error fetching featured article:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [])

  if (loading || !article) return null

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-semibold text-orange-500">IN CONVERSATION</span>
        <a href="#" className="text-orange-500 font-semibold hover:text-orange-400">DISCOVER MORE</a>
      </div>

      <div className="bg-gray-900 rounded-lg p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">
            {article.title}
          </h2>
          <p className="text-gray-400 mb-6">
            {article.excerpt || article.description || article.content?.substring(0, 200)}
          </p>
          <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold">Read the report →</a>
        </div>

        {getPostImage(article) && (
          <div className="w-full md:w-1/3 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={getPostImage(article)}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
