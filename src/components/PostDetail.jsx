import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Share2, Copy, Share, MessageCircle, Mail } from 'lucide-react'
import { getPostById } from '../services/api'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await getPostById(id)
        if (response.success && response.data) {
          setPost(response.data)
        } else {
          setError('Failed to load post')
        }
      } catch (err) {
        console.error('Error fetching post:', err)
        setError('Error loading post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToSocial = (platform) => {
    const encodedUrl = encodeURIComponent(currentUrl)
    const encodedTitle = encodeURIComponent(post.title)
    let shareUrl = ''

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      default:
        return
    }

    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-400">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate(-1)}
            className="text-orange-500 hover:text-orange-400 mb-6 font-semibold"
          >
            ← Back
          </button>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Post not found</h2>
            <p className="text-gray-400 mb-6">{error || 'The post you are looking for does not exist.'}</p>
            <button
              onClick={() => navigate('/news')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold transition"
            >
              Go to News
            </button>
          </div>
        </div>
      </div>
    )
  }

  const authorName = typeof post.author === 'object' ? post.author?.name : post.author || 'Staff'

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-orange-500 hover:text-orange-400 mb-6 font-semibold"
        >
          ← Back
        </button>

        {/* Post Header */}
        <div className="mb-8">
          <span className="text-orange-500 text-sm font-semibold">{post.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">{post.title}</h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-gray-400 mb-6">
            <span>{authorName}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString() || post.date}</span>
            <span>•</span>
            <span>{post.readTime || '5'} min read</span>
          </div>

          {/* Share Button */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              <Share2 size={20} />
              Share
            </button>

            {/* Share Menu */}
            {showShareMenu && (
              <div className="absolute top-full left-0 mt-2 bg-gray-900 rounded-lg shadow-lg border border-gray-700 p-3 z-10 w-48">
                <div className="space-y-2">
                  {/* Copy Link */}
                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded transition text-left"
                  >
                    <Copy size={18} />
                    <span>{copied ? 'Copied!' : 'Copy link'}</span>
                  </button>

                  {/* Twitter */}
                  <button
                    onClick={() => shareToSocial('twitter')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded transition text-left"
                  >
                    <MessageCircle size={18} />
                    <span>Share on Twitter</span>
                  </button>

                  {/* LinkedIn */}
                  <button
                    onClick={() => shareToSocial('linkedin')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded transition text-left"
                  >
                    <Mail size={18} />
                    <span>Share on LinkedIn</span>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={() => shareToSocial('facebook')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded transition text-left"
                  >
                    <Share size={18} />
                    <span>Share on Facebook</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        <img
          src={post.image || post.thumbnail || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop'}
          alt={post.title}
          className="w-full rounded-lg mb-12 object-cover h-96"
        />

        {/* Post Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content || post.description || 'No content available for this post.'}
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-2">Share this article</p>
              <div className="flex gap-4">
                <button
                  onClick={() => shareToSocial('twitter')}
                  className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition"
                  title="Share on Twitter"
                >
                  <MessageCircle size={20} className="text-blue-400" />
                </button>
                <button
                  onClick={() => shareToSocial('linkedin')}
                  className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition"
                  title="Share on LinkedIn"
                >
                  <Mail size={20} className="text-blue-600" />
                </button>
                <button
                  onClick={() => shareToSocial('facebook')}
                  className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition"
                  title="Share on Facebook"
                >
                  <Share size={20} className="text-blue-500" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition"
                  title="Copy link"
                >
                  <Copy size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
