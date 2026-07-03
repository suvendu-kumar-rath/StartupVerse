import { useState, useEffect } from 'react'
import { getAllPosts } from '../services/api'

export default function VoltaGrid() {
  const [spotlight, setSpotlight] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSpotlight = async () => {
      try {
        const response = await getAllPosts(1, 1)
        if (response.success && response.data?.posts && response.data.posts.length > 0) {
          setSpotlight(response.data.posts[0])
        }
      } catch (error) {
        console.error('Error fetching spotlight:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSpotlight()
  }, [])

  if (loading || !spotlight) return null

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-8 text-white">
        <span className="orange-badge mb-4 inline-block">SPOTLIGHT</span>
        <h2 className="text-3xl font-bold mb-2">{spotlight.title}</h2>
        <p className="text-blue-200 mb-4">{spotlight.excerpt || spotlight.description || spotlight.content?.substring(0, 100)}</p>
        
        {spotlight.metric && (
          <div className="text-orange-400 font-bold text-2xl">
            {spotlight.metric}
          </div>
        )}
      </div>
    </section>
  )
}
