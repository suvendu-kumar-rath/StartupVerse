import { useState, useEffect } from 'react'
import { getAllPosts } from '../services/api'

export default function EventsSection() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch posts marked as events
        const response = await getAllPosts(1, 3, 'EVENTS')
        if (response.success && response.data?.posts) {
          setEvents(response.data.posts.map(post => ({
            badge: post.eventType || "EVENT",
            title: post.title,
            date: post.eventDate || new Date().toLocaleDateString(),
            location: post.location || "TBA",
            attendees: post.attendees || "TBA"
          })))
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading || events.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Upcoming Events</h2>
        <a href="#" className="text-orange-500 font-semibold hover:text-orange-400">VIEW ALL</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event, idx) => (
          <div key={idx} className="card-dark p-6 hover:bg-gray-800 transition">
            <span className="orange-badge mb-4 inline-block">{event.badge}</span>
            <h3 className="font-bold text-xl mb-3">{event.title}</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📅 {event.date}</p>
              <p>📍 {event.location}</p>
              <p>👥 {event.attendees}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
