import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Share2, Copy, Share, MessageCircle, Mail } from 'lucide-react'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  // Mock post data - replace with actual API call
  const post = {
    id: id,
    title: 'Inside the $450M raise that made Lumen AI the fastest unicorn of 2026',
    author: 'Anarya Rao',
    date: 'Jun 10, 2026',
    readTime: '8 min',
    category: 'FUNDING',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    content: `A deep dive into how Lumen AI secured one of the largest Series C rounds in AI infrastructure history. 
    
This $450M funding round, led by Sequoia Capital, marks a significant milestone in the AI industry. The company has grown from its founding in 2023 to becoming the fastest unicorn in the space, achieving a $3B valuation in record time.

Key highlights from the funding round:
• Led by Sequoia Capital with participation from leading VCs
• Used for expanding AI infrastructure and R&D
• Plans to expand operations to 15 new countries
• Strategic partnerships with major cloud providers

The interview reveals insights from both the founders and the investment team about what this milestone means for the future of AI infrastructure and the broader startup ecosystem.`
  }

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
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime} read</span>
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
          src={post.image}
          alt={post.title}
          className="w-full rounded-lg mb-12 object-cover h-96"
        />

        {/* Post Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
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
