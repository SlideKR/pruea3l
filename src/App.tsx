import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState('home')

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleNavClick = (page: string) => {
    setActivePage(page)
    setMenuOpen(false)
  }

  return (
    <>
      {/* HEADER Y MENÚ */}
      <header className="app-header">
        <div className="header-container">
          <div className="logo-brand">
            <h1>Vite + React</h1>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li><button className={`nav-link ${activePage === 'home' ? 'active' : ''}`} onClick={() => handleNavClick('home')}>Home</button></li>
            <li><button className={`nav-link ${activePage === 'docs' ? 'active' : ''}`} onClick={() => handleNavClick('docs')}>Documentation</button></li>
            <li><button className={`nav-link ${activePage === 'social' ? 'active' : ''}`} onClick={() => handleNavClick('social')}>Community</button></li>
            <li><button className={`nav-link ${activePage === 'about' ? 'active' : ''}`} onClick={() => handleNavClick('about')}>About</button></li>
          </ul>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div className="app-background">
        {activePage === 'home' && (
          <>
            <section id="center">
              <div className="hero">
                <img src={heroImg} className="base" width="170" height="179" alt="" />
                <img src={reactLogo} className="framework" alt="React logo" />
                <img src={viteLogo} className="vite" alt="Vite logo" />
              </div>
              <div>
                <h1>Get started</h1>
                <p>
                  Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
                </p>
              </div>
              <button
                type="button"
                className="counter"
                onClick={() => setCount((count) => count + 1)}
              >
                Count is {count}
              </button>
            </section>

            <div className="ticks"></div>

            <section id="next-steps">
              <div id="docs">
                <svg className="icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#documentation-icon"></use>
                </svg>
                <h2>Documentation</h2>
                <p>Your questions, answered</p>
                <ul>
                  <li>
                    <a href="https://vite.dev/" target="_blank">
                      <img className="logo" src={viteLogo} alt="" />
                      Explore Vite
                    </a>
                  </li>
                  <li>
                    <a href="https://react.dev/" target="_blank">
                      <img className="button-icon" src={reactLogo} alt="" />
                      Learn more
                    </a>
                  </li>
                </ul>
              </div>
              <div id="social">
                <svg className="icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#social-icon"></use>
                </svg>
                <h2>Connect with us</h2>
                <p>Join the Vite community</p>
                <ul>
                  <li>
                    <a href="https://github.com/vitejs/vite" target="_blank">
                      <svg
                        className="button-icon"
                        role="presentation"
                        aria-hidden="true"
                      >
                        <use href="/icons.svg#github-icon"></use>
                      </svg>
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="https://chat.vite.dev/" target="_blank">
                      <svg
                        className="button-icon"
                        role="presentation"
                        aria-hidden="true"
                      >
                        <use href="/icons.svg#discord-icon"></use>
                      </svg>
                      Discord
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/vite_js" target="_blank">
                      <svg
                        className="button-icon"
                        role="presentation"
                        aria-hidden="true"
                      >
                        <use href="/icons.svg#x-icon"></use>
                      </svg>
                      X.com
                    </a>
                  </li>
                  <li>
                    <a href="https://bsky.app/profile/vite.dev" target="_blank">
                      <svg
                        className="button-icon"
                        role="presentation"
                        aria-hidden="true"
                      >
                        <use href="/icons.svg#bluesky-icon"></use>
                      </svg>
                      Bluesky
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            <div className="ticks"></div>
            <section id="spacer"></section>
          </>
        )}

        {activePage === 'docs' && (
          <section className="page-section docs-page">
            <h2>Documentation</h2>
            <p>Learn more about Vite and React</p>
            <ul className="docs-list">
              <li><a href="https://vite.dev/" target="_blank">Vite Documentation</a></li>
              <li><a href="https://react.dev/" target="_blank">React Documentation</a></li>
            </ul>
          </section>
        )}

        {activePage === 'social' && (
          <section className="page-section social-page">
            <h2>Join Our Community</h2>
            <p>Connect with developers around the world</p>
            <div className="social-links">
              <a href="https://github.com/vitejs/vite" target="_blank" className="social-card">GitHub</a>
              <a href="https://chat.vite.dev/" target="_blank" className="social-card">Discord</a>
              <a href="https://x.com/vite_js" target="_blank" className="social-card">X.com</a>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" className="social-card">Bluesky</a>
            </div>
          </section>
        )}

        {activePage === 'about' && (
          <section className="page-section about-page">
            <h2>About Vite + React</h2>
            <p>Build fast and modern web applications with Vite and React</p>
            <div className="about-content">
              <h3>Why Vite?</h3>
              <ul>
                <li>⚡ Lightning fast HMR (Hot Module Replacement)</li>
                <li>📦 Optimized production builds</li>
                <li>🎯 Framework agnostic</li>
              </ul>
            </div>
          </section>
        )}
      </div>
    </>
  )
}

export default App
