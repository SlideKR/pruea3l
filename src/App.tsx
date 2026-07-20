import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [activeMenu, setActiveMenu] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu)
    setMenuOpen(false)
  }

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src={viteLogo} alt="Vite" className="logo-img" />
            <span className="plus">+</span>
            <img src={reactLogo} alt="React" className="logo-img" />
          </div>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* NAVEGACIÓN */}
      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li><button className={`nav-item ${activeMenu === 'home' ? 'active' : ''}`} onClick={() => handleMenuClick('home')}>Inicio</button></li>
          <li><button className={`nav-item ${activeMenu === 'services' ? 'active' : ''}`} onClick={() => handleMenuClick('services')}>Servicios</button></li>
          <li><button className={`nav-item ${activeMenu === 'about' ? 'active' : ''}`} onClick={() => handleMenuClick('about')}>Acerca de</button></li>
          <li><button className={`nav-item ${activeMenu === 'contact' ? 'active' : ''}`} onClick={() => handleMenuClick('contact')}>Contacto</button></li>
        </ul>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        {/* HOME */}
        {activeMenu === 'home' && (
          <section className="section home-section">
            <div className="container">
              <h1 className="title">Bienvenido a Vite + React</h1>
              <p className="subtitle">Una forma rápida y moderna de construir aplicaciones web</p>
              <div className="features">
                <div className="feature-card">
                  <h3>⚡ Rápido</h3>
                  <p>Desarrollo instantáneo con HMR (Hot Module Replacement)</p>
                </div>
                <div className="feature-card">
                  <h3>🎯 Eficiente</h3>
                  <p>Optimizado para el máximo rendimiento en producción</p>
                </div>
                <div className="feature-card">
                  <h3>🚀 Moderno</h3>
                  <p>Utiliza las últimas tecnologías web</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SERVICIOS */}
        {activeMenu === 'services' && (
          <section className="section services-section">
            <div className="container">
              <h1 className="title">Nuestros Servicios</h1>
              <div className="services-grid">
                <div className="service-item">
                  <div className="service-icon">📦</div>
                  <h3>Build Optimizado</h3>
                  <p>Compilación rápida y eficiente para producción</p>
                </div>
                <div className="service-item">
                  <div className="service-icon">🔥</div>
                  <h3>HMR Instantáneo</h3>
                  <p>Recarga de módulos en tiempo real durante el desarrollo</p>
                </div>
                <div className="service-item">
                  <div className="service-icon">🎨</div>
                  <h3>Soporte CSS</h3>
                  <p>Manejo completo de estilos CSS y preprocesadores</p>
                </div>
                <div className="service-item">
                  <div className="service-icon">🔌</div>
                  <h3>Plugins</h3>
                  <p>Sistema extensible con plugins personalizados</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ACERCA DE */}
        {activeMenu === 'about' && (
          <section className="section about-section">
            <div className="container">
              <h1 className="title">Acerca de Vite + React</h1>
              <div className="about-content">
                <div className="about-text">
                  <h2>¿Qué es Vite?</h2>
                  <p>
                    Vite es una herramienta de construcción frontend que tiene como objetivo proporcionar una experiencia de desarrollo más rápida y ágil. Consta de dos partes principales:
                  </p>
                  <ul className="about-list">
                    <li>Un servidor de desarrollo que ofrece mejoras ricas de características sobre los módulos ES nativos</li>
                    <li>Un comando de compilación que agrupa tu código con Rollup</li>
                  </ul>
                </div>
                <div className="about-text">
                  <h2>React con Vite</h2>
                  <p>
                    React es una biblioteca JavaScript para construir interfaces de usuario con componentes reutilizables. Cuando se combina con Vite, obtienes una configuración de desarrollo extremadamente rápida y eficiente.
                  </p>
                  <ul className="about-list">
                    <li>Componentes funcionales y hooks</li>
                    <li>Estado reactivo y actualización rápida</li>
                    <li>Desarrollo sin configuración</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CONTACTO */}
        {activeMenu === 'contact' && (
          <section className="section contact-section">
            <div className="container">
              <h1 className="title">Contacto</h1>
              <div className="contact-wrapper">
                <form className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" placeholder="Tu nombre" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Tu email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Mensaje</label>
                    <textarea id="message" placeholder="Tu mensaje" rows={5}></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Enviar</button>
                </form>
                <div className="contact-info">
                  <div className="info-item">
                    <h3>📧 Email</h3>
                    <p>info@vitereact.com</p>
                  </div>
                  <div className="info-item">
                    <h3>📱 Teléfono</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                  <div className="info-item">
                    <h3>📍 Ubicación</h3>
                    <p>San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Vite + React. Todos los derechos reservados.</p>
          <div className="footer-links">
            <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
