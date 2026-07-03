import { Routes, Route } from 'react-router-dom'
import { useState, createContext } from 'react'
import Header from './components/Header'
import TrendingSection from './components/TrendingSection'
import LiveFunding from './components/LiveFunding'
import VoltaGrid from './components/VoltaGrid'
import Testimonial from './components/Testimonial'
import ArticleSection from './components/ArticleSection'
import LatestSection from './components/LatestSection'
import EventsSection from './components/EventsSection'
import Footer from './components/Footer'
import News from './components/News'
import Stories from './components/Stories'
import Directory from './components/Directory'
import Magazine from './components/Magazine'
import PostDetail from './components/PostDetail'

export const ThemeContext = createContext()

function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <TrendingSection />
      <LiveFunding />
      <VoltaGrid />
      <Testimonial />
      <ArticleSection />
      <LatestSection />
      <EventsSection />
      <Footer />
    </div>
  )
}

function App() {
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/magazine" element={<Magazine />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
