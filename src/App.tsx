import { useState, useEffect } from 'react'
import './App.css'
import AutoTheme from './components/AutoTheme'
import { getTimeOfDay } from './util/TimeUtils'

function App() {
  const [themeReady, setThemeReady] = useState(false)

  useEffect(() => {
    // Listen for when body gets the theme-ready class
    const checkThemeReady = () => {
      if (document.body.classList.contains('theme-ready')) {
        setThemeReady(true)
      }
    }
    
    // Check immediately
    checkThemeReady()
    
    // Also check after a short delay in case we missed it
    const timeout = setTimeout(checkThemeReady, 150)
    
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <AutoTheme />
      {themeReady && (
        <>
          <header className="header">
            <h1>Good {getTimeOfDay()}!</h1>
          </header>

          <main className="main-content">
            <section>
              <h2>Who am I?</h2>
              <p>
                Hi! I'm Zeph, and I've found myself with some extra time on my hands.
              </p>
              <p>
                Because of that, I've created this website to meet some new people! 
                You can tap the button below to book some time on my calendar.
              </p>
              <p>
                Just provide a bit of info about what you'd like to do, I'll reach out, and we'll take it from there.
              </p>
            </section>

            <section>
              <h4>Need ideas of what to book time for?</h4>
              <div className="ideas-section">
                <ul className="activity-list">
                  <li>Just to hang?</li>
                  <li>For a date? (Or set your friend up on a blind one)</li>
                  <li>As a +1 to an event?</li>
                  <li>Need help building furniture or with a computer?</li>
                  <li>Or something else? We can text and figure that out</li>
                </ul>
              </div>
            </section>
            
            <button 
              className="booking-button"
              onClick={() => window.open('https://calendar.app.google/5ESQseDcrtWT5Xvh9', '_blank', 'noopener,noreferrer')}
            >
              Book via Google Calendar
            </button>

          </main>

          <footer className="footer">
            <p>You can also follow my journey on Instagram!</p>
            <a 
              href="https://www.instagram.com/solocalx/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="instagram-link"
              aria-label="Follow @solocalx on Instagram"
            >
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="instagram-icon"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </footer>
        </>
      )}
    </>
  )
}

export default App
