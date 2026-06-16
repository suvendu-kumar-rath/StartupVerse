import { useContext } from 'react'
import { ThemeContext } from '../App'

export default function Header() {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  return (
    <header className={`${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${isDark ? 'bg-white text-black' : 'bg-black text-white'} font-bold rounded flex items-center justify-center`}>
            S
          </div>
          <span className="text-xl font-bold">StartupVerse</span>
        </div>
        
        <nav className={`flex gap-8 text-sm ${isDark ? '' : 'text-gray-800'}`}>
          <a href="/" className="hover:text-orange-500 transition">Home</a>
          <a href="/news" className="hover:text-orange-500 transition">News</a>
          <a href="/stories" className="hover:text-orange-500 transition">Stories</a>
          <a href="/directory" className="hover:text-orange-500 transition">Directory</a>
          <a href="/magazine" className="hover:text-orange-500 transition">Magazine</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className={`${isDark ? 'text-white' : 'text-gray-800'} hover:text-orange-500 transition text-xl`}>
            🔍
          </button>
          <button className={`${isDark ? 'text-white' : 'text-gray-800'} hover:text-orange-500 transition text-xl`}>
            ⚙️
          </button>
          <button 
            onClick={toggleTheme}
            className={`${isDark ? 'text-white' : 'text-gray-800'} hover:text-orange-500 transition text-2xl`}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? '🌙' : '☀️'}
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold text-sm transition">
            Subscribe
          </button>
        </div>
      </div>
    </header>
  )
}
