import { useState, useEffect } from 'react'
import { getAllPosts } from '../services/api'

const fallbackFundingItems = [
  { company: 'Lumen AI', amount: '$450M', round: 'Series C', note: 'led by Sequoia' },
  { company: 'Volta Grid', amount: '$120M', round: 'Series B', note: 'led by Khosla' },
  { company: 'Northwind Robotics', amount: '$78M', round: 'Series A', note: 'led by Accel' },
  { company: 'Helio Foods', amount: '$30M', round: 'Series A', note: 'led by Indie VC' }
]

export default function LiveFunding() {
  const [fundingItems, setFundingItems] = useState([])

  useEffect(() => {
    const fetchFundingData = async () => {
      try {
        // Fetch trending/funding posts from API
        const response = await getAllPosts(1, 10, null, true)
        if (response.success && response.data?.posts) {
          // Map API posts to funding items format
          const items = response.data.posts.map(post => ({
            company: post.title?.split(' ')[0] || 'Company',
            amount: post.amount || '$0M',
            round: post.round || 'N/A',
            note: post.note || ''
          }))
          setFundingItems(items.length > 0 ? items : fallbackFundingItems)
        } else {
          setFundingItems(fallbackFundingItems)
        }
      } catch (error) {
        console.error('Error fetching funding data:', error)
        setFundingItems(fallbackFundingItems)
      }
    }

    fetchFundingData()
  }, [])
  // Duplicate items for seamless loop
  const repeatedItems = [...fundingItems, ...fundingItems]

  return (
    <section className="bg-gray-100 text-black py-3 overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .funding-scroll {
          animation: scroll 30s linear infinite;
        }
        .funding-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 flex items-center gap-6">
        {/* <div className="bg-orange-500 text-white px-4 py-2 rounded font-semibold flex-shrink-0 text-sm">
          ▲ LIVE FUNDING
        </div> */}

        <div className="flex-1 overflow-hidden">
          <div className="funding-scroll flex gap-8">
            {repeatedItems.map((item, idx) => (
              <div key={idx} className="flex-shrink-0 whitespace-nowrap">
                <div className="text-sm text-gray-600">{item.note}</div>
                <div className="flex items-baseline gap-3">
                  <div className="text-lg font-bold">{item.company}</div>
                  <div className="text-orange-500 font-semibold">{item.amount}</div>
                  <div className="text-sm text-gray-600">•</div>
                  <div className="text-sm text-gray-600">{item.round}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
  //comment out the below code for now, as we are not using it currently. We can uncomment it later if needed.
}
