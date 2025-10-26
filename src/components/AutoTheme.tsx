import { useEffect } from 'react'
import { getThemeByTime } from '../util/TimeUtils'

const applyTheme = (themeName: string) => {
  if (themeName === 'morning') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', themeName)
  }
}

export default function AutoTheme() {
  useEffect(() => {
    // Apply theme on mount
    const currentTheme = getThemeByTime()
    applyTheme(currentTheme)
    
    // Update theme every minute to catch time changes
    const interval = setInterval(() => {
      const newTheme = getThemeByTime()
      applyTheme(newTheme)
    }, 60000) // Check every minute
    
    return () => clearInterval(interval)
  }, [])

  // This component doesn't render anything
  return null
}
