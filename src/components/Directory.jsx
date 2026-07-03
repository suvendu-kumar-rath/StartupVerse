import { useState, useEffect } from 'react'
import { getAllPosts } from '../services/api'

export default function Directory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStage, setFilterStage] = useState('All')
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllPosts(1, 100)
        if (response.success && response.data?.posts) {
          // Map posts to company format
          const mappedCompanies = response.data.posts.map((post) => ({
            id: post.id,
            initials: post.title?.substring(0, 2).toUpperCase() || 'CO',
            name: post.title?.split(' ')[0] || 'Company',
            founder: typeof post.author === 'object' ? post.author?.name : post.author || 'Unknown',
            location: post.category || 'Unknown',
            funding: '$0M',
            stage: 'Series A'
          }))
          setCompanies(mappedCompanies)
        }
      } catch (error) {
        console.error('Error fetching companies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  const stages = ['All', 'Seed', 'Seed+', 'Series A', 'Series B', 'Series C', 'Series D']

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.founder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterStage === 'All' || company.stage === filterStage
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-8">
          <span className="text-orange-500 font-semibold text-sm">DATABASE</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Startup Directory</h1>
        <p className="text-gray-400 text-lg">
          {companies.length} hand-curated companies. Founders, industries, funding, stage.
        </p>
        <div className="mt-8 border-t border-gray-700"></div>
      </section>

      {/* Search and Filter */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <span className="absolute left-3 top-3 text-gray-500 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search by company, founder, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 text-white pl-10 pr-4 py-3 rounded border border-gray-700 focus:border-orange-500 focus:outline-none transition"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full md:w-32">
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="w-full bg-gray-900 text-white px-4 py-3 rounded border border-gray-700 focus:border-orange-500 focus:outline-none transition appearance-none cursor-pointer"
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
            <span className="absolute right-3 top-3 pointer-events-none text-gray-400">▼</span>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Company</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Founder</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Location</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Funding</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Stage</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company, idx) => (
                <tr key={company.id} className="border-b border-gray-800 hover:bg-gray-900 transition">
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white text-black rounded font-bold flex items-center justify-center text-sm">
                        {company.initials}
                      </div>
                      <span className="font-semibold">{company.name}</span>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-gray-300">{company.founder}</td>
                  <td className="py-6 px-4 text-gray-300">
                    <span className="mr-2">📍</span>
                    {company.location}
                  </td>
                  <td className="py-6 px-4">
                    <span className="font-bold text-orange-500">{company.funding}</span>
                  </td>
                  <td className="py-6 px-4">
                    <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm">
                      {company.stage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No companies found matching your search criteria.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
