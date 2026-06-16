export default function LatestSection() {
  const articles = [
    {
      image: "https://images.unsplash.com/photo-1553531889-e6cf7d39bbb3?w=400&h=400&fit=crop",
      title: "Climate tech lead has biggest quarter — here's the data",
      author: "by Time Chambers",
      date: "5 min read",
      category: "SUSTAINABILITY"
    },
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
      title: "Startups weaponized Slack for B2B growth",
      author: "by Jane Ortiz",
      date: "8 min read",
      category: "INNOVATION"
    },
    {
      image: "https://images.unsplash.com/photo-1516534775068-bb8fce2fcc91?w=400&h=400&fit=crop",
      title: "The robot revolution will be televised this year. Here's what's coming.",
      author: "by Anna Rossi",
      date: "12 min read",
      category: "INNOVATION"
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
      title: "Expect hidden office on one Heartbeat island to close",
      author: "by Sarah Chen",
      date: "6 min read",
      category: "TECH TRENDS"
    },
    {
      image: "https://images.unsplash.com/photo-1452587344148-ce2e76319e12?w=400&h=400&fit=crop",
      title: "Why every pitch deck is a tell: What patterns in funding reveal",
      author: "by Michael Park",
      date: "9 min read",
      category: "VENTURE CAPITAL"
    },
    {
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop",
      title: "It finally happened in tech: 'The industry is at — and it's coming",
      author: "by Emily Watson",
      date: "7 min read",
      category: "MARKET INSIGHTS"
    }
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">The Latest</h2>
        <a href="#" className="text-orange-500 font-semibold hover:text-orange-400">SEE ALL</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, idx) => (
          <div key={idx} className="card-dark hover:bg-gray-800 transition overflow-hidden group">
            <div className="relative overflow-hidden h-48">
              <img 
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-orange-500">{article.category}</span>
              <h3 className="font-bold text-lg mt-2 mb-3 line-clamp-2">{article.title}</h3>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{article.author}</span>
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
