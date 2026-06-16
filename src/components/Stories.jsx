export default function Stories() {
  const founderInterviews = [
    {
      id: 1,
      category: 'FOUNDERS',
      title: 'The quiet epidemic: why 1 in 3 founders are walking away in 2026',
      author: 'Marcus Chen',
      date: 'Jun 9, 2026',
      readTime: '12 min',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop'
    },
    {
      id: 2,
      category: 'ANALYSIS',
      title: 'We read every pitch in VC W26. Three patterns to watch.',
      author: 'Sofia Martinez',
      date: 'Jun 6, 2026',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1516534775068-bb8fce2fcc91?w=500&h=400&fit=crop'
    }
  ]

  const successStories = [
    {
      id: 3,
      category: 'FUNDING',
      title: 'Inside the $450M raise that made Lumen AI the fastest unicorn of 2026',
      author: 'Anarya Rao',
      date: 'Jun 10, 2026',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop'
    },
    {
      id: 4,
      category: 'CLIMATE',
      title: 'Climate tech just had its biggest quarter ever - here is the map',
      author: 'Priya Subramam',
      date: 'Jun 8, 2026',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1553531889-e6cf7d39bbb3?w=500&h=400&fit=crop'
    },
    {
      id: 5,
      category: 'HARDWARE',
      title: 'OpenAI India bet: inside the Mumbai office no one is talking about',
      author: 'Rohan Mehta',
      date: 'Jun 5, 2026',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop'
    },
    {
      id: 6,
      category: 'FUNDING',
      title: 'Stripe India files for IPO at $4B valuation',
      author: 'Anarya Rao',
      date: 'Jun 2, 2026',
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop'
    }
  ]

  const failureStories = [
    {
      id: 7,
      category: 'M&A',
      title: 'Shopify quietly acquired Stitch for $1.3B. Here is what it changes.',
      author: 'Jordan Reeves',
      date: 'Jul 7, 2026',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop'
    },
    {
      id: 8,
      category: 'FAILURES',
      title: 'Postmortem: the 72 hours that crashed a $4B fintech',
      author: 'Dana Wilford',
      date: 'Jun 4, 2026',
      readTime: '14 min',
      image: 'https://images.unsplash.com/photo-1452587344148-ce2e76319e12?w=500&h=400&fit=crop'
    }
  ]

  const StoryCard = ({ story }) => (
    <div className="card-dark hover:bg-gray-900 transition cursor-pointer group overflow-hidden">
      <div className="relative overflow-hidden h-56">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold text-orange-500">{story.category}</span>
        <h3 className="font-bold text-lg mt-2 mb-3 leading-tight">
          {story.title}
        </h3>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{story.author}</span>
          <span>{story.readTime}</span>
        </div>
      </div>
    </div>
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
