import { useEffect, useState } from 'react'
import { getThemeByTime } from '../util/TimeUtils'
import Loading from './Loading'

const applyTheme = (themeName: string) => {
  if (themeName === 'morning') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', themeName)
  }
}

export default function AutoTheme() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Apply theme immediately on mount
    const currentTheme = getThemeByTime()
    applyTheme(currentTheme)
    
    // Small delay to ensure theme is applied before hiding loader
    setTimeout(() => {
      setIsLoading(false)
      document.body.classList.add('theme-ready')
    }, 100)
    
    // Update theme every minute to catch time changes
    const interval = setInterval(() => {
      const newTheme = getThemeByTime()
      applyTheme(newTheme)
    }, 60000) // Check every minute
    
    return () => clearInterval(interval)
  }, [])

  // Show loading screen while theme is being applied
  if (isLoading) {
    return <Loading />
  }

  // Once loaded, render nothing
  return null
}
