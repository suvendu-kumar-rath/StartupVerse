export default function EventsSection() {
  const events = [
    {
      badge: "CONFERENCE",
      title: "StartupVerse Summit",
      date: "Aug 15-16",
      location: "San Francisco",
      attendees: "2,400+"
    },
    {
      badge: "NETWORKING",
      title: "AI Founders Hack",
      date: "Sep 20",
      location: "Hybrid",
      attendees: "500+"
    },
    {
      badge: "WEBINAR",
      title: "Climate Capital Night",
      date: "Oct 08",
      location: "NYC",
      attendees: "300+"
    }
  ]

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
