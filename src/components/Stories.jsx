import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../services/api'

export default function Stories() {
  const [founderInterviews, setFounderInterviews] = useState([])
  const [successStories, setSuccessStories] = useState([])
  const [failureStories, setFailureStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await getAllPosts(1, 8)
        if (response.success && response.data?.posts) {
          setFounderInterviews(response.data.posts.slice(0, 2))
          setSuccessStories(response.data.posts.slice(2, 6))
          setFailureStories(response.data.posts.slice(6, 8))
        }
      } catch (error) {
        console.error('Error fetching stories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  const StoryCard = ({ story }) => (
    <Link
      to={`/post/${story.id}`}
      className="no-underline"
    >
      <div className="card-dark hover:bg-gray-900 transition cursor-pointer group overflow-hidden h-full">
        <div className="relative overflow-hidden h-56">
          <img
            src={story.image || story.thumbnail || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop'}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="p-4">
          <span className="text-xs font-semibold text-orange-500">{story.category || 'STORY'}</span>
          <h3 className="font-bold text-lg mt-2 mb-3 leading-tight">
            {story.title}
          </h3>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{story.author || 'Staff'}</span>
            <span>{story.readTime || '5 min'}</span>
          </div>
        </div>
      </div>
    </Link>
  )

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-8">
          <span className="text-orange-500 font-semibold text-sm">LONG READS</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Startup Stories</h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          The interviews, deconstructions and postmortems that explain how startups actually win - and lose.
        </p>
        <div className="mt-8 border-t border-gray-700"></div>
      </section>

      {/* Founder Interviews */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Founder Interviews</h2>
          <span className="text-orange-500 font-semibold text-sm">{founderInterviews.length} STORIES</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founderInterviews.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Success Stories</h2>
          <span className="text-orange-500 font-semibold text-sm">{successStories.length} STORIES</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {successStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* Failure Stories */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Failure Stories</h2>
          <span className="text-orange-500 font-semibold text-sm">{failureStories.length} STORIES</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {failureStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* Footer Spacer */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="border-t border-gray-800"></div>
      </section>
    </div>
  )
}
