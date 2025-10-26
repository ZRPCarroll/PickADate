import { useState, useEffect } from 'react'
import './ThemeSwitcher.css'

const themes = [
  { name: 'Warm Sunset', value: 'warm-sunset' },
  { name: 'Dark Mode', value: 'dark' },
  { name: 'Ocean Breeze', value: 'ocean' },
  { name: 'Forest', value: 'forest' },
  { name: 'Lavender Dream', value: 'lavender' },
  { name: 'Sunset Glow', value: 'sunset' },
]

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('warm-sunset')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('site-theme') || 'warm-sunset'
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (themeName: string) => {
    if (themeName === 'warm-sunset') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', themeName)
    }
    localStorage.setItem('site-theme', themeName)
  }

  const handleThemeChange = (themeValue: string) => {
    setCurrentTheme(themeValue)
    applyTheme(themeValue)
    setIsOpen(false)
  }

  const currentThemeName = themes.find(t => t.value === currentTheme)?.name || 'Warm Sunset'

  return (
    <div className="theme-switcher">
      <button 
        className="theme-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
      >
        🎨 {currentThemeName}
      </button>
      
      {isOpen && (
        <div className="theme-menu">
          {themes.map((theme) => (
            <button
              key={theme.value}
              className={`theme-option ${currentTheme === theme.value ? 'active' : ''}`}
              onClick={() => handleThemeChange(theme.value)}
            >
              {theme.name}
              {currentTheme === theme.value && ' ✓'}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
