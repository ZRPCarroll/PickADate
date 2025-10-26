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
                  <li>Book me for a date? (Or set your friend up on a blind one)</li>
                  <li>Looking for a +1 to an event?</li>
                  <li>Need help building furniture or with a computer?</li>
                  <li>Just to hang?</li>
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
            <p>Looking forward to meeting you!</p>
          </footer>
        </>
      )}
    </>
  )
}

export default App
