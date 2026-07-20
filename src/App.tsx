import { useState, useEffect } from 'react'
import './App.css'

interface Cancha {
  id: number
  nombre: string
  tipo: string
  ubicacion: string
  precio: number
  disponible: boolean
}

interface Reserva {
  id: string
  canchaId: number
  nombre: string
  fecha: string
  hora: string
  telefono: string
}

function App() {
  const [canchas, setCanchas] = useState<Cancha[]>([])
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [activeMenu, setActiveMenu] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    hora: '',
    telefono: '',
    canchaId: 0
  })

  // Cargar canchas desde API
  useEffect(() => {
    fetchCanchas()
    loadReservas()
  }, [])

  const fetchCanchas = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://127.0.0.1:8000/api/canchas')
      if (!response.ok) throw new Error('Error al cargar las canchas')
      const data = await response.json()
      setCanchas(data)
      setError('')
    } catch (err) {
      setError('No se pudo conectar con el servidor. Intenta más tarde.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Cargar reservas del LocalStorage
  const loadReservas = () => {
    const stored = localStorage.getItem('reservas')
    if (stored) {
      setReservas(JSON.parse(stored))
    }
  }

  // Guardar reservas en LocalStorage
  const saveReservas = (nuevasReservas: Reserva[]) => {
    localStorage.setItem('reservas', JSON.stringify(nuevasReservas))
    setReservas(nuevasReservas)
  }

  // Crear nueva reserva
  const handleCrearReserva = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nombre || !formData.fecha || !formData.hora || !formData.telefono || !formData.canchaId) {
      setError('Por favor completa todos los campos')
      return
    }

    const nuevaReserva: Reserva = {
      id: Date.now().toString(),
      canchaId: formData.canchaId,
      nombre: formData.nombre,
      fecha: formData.fecha,
      hora: formData.hora,
      telefono: formData.telefono
    }

    const nuevasReservas = [...reservas, nuevaReserva]
    saveReservas(nuevasReservas)
    
    setFormData({
      nombre: '',
      fecha: '',
      hora: '',
      telefono: '',
      canchaId: 0
    })
    setShowForm(false)
    setError('')
  }

  // Cancelar reserva
  const handleCancelarReserva = (id: string) => {
    const nuevasReservas = reservas.filter(r => r.id !== id)
    saveReservas(nuevasReservas)
  }

  const getCanchaNombre = (canchaId: number) => {
    return canchas.find(c => c.id === canchaId)?.nombre || 'Cancha desconocida'
  }

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu)
    setMenuOpen(false)
  }

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>⚽ Complejo de Canchas</h1>
          </div>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰ Menú
          </button>
        </div>
      </header>

      {/* NAVEGACIÓN */}
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          <li>
            <button 
              className={`nav-link ${activeMenu === 'inicio' ? 'active' : ''}`}
              onClick={() => handleMenuClick('inicio')}
            >
              🏠 Inicio
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${activeMenu === 'canchas' ? 'active' : ''}`}
              onClick={() => handleMenuClick('canchas')}
            >
              📋 Canchas
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${activeMenu === 'reservas' ? 'active' : ''}`}
              onClick={() => handleMenuClick('reservas')}
            >
              📅 Mis Reservas
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${activeMenu === 'sobrenosotros' ? 'active' : ''}`}
              onClick={() => handleMenuClick('sobrenosotros')}
            >
              ℹ️ Sobre Nosotros
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${activeMenu === 'contacto' ? 'active' : ''}`}
              onClick={() => handleMenuClick('contacto')}
            >
              📞 Contacto
            </button>
          </li>
        </ul>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        {error && <div className="error-message">⚠️ {error}</div>}

        {/* PÁGINA: INICIO */}
        {activeMenu === 'inicio' && (
          <section className="section-hero">
            <div className="hero-content">
              <h2>Bienvenido al Complejo de Canchas</h2>
              <p>Reserva tu cancha favorita de forma fácil y rápida</p>
              <div className="hero-stats">
                <div className="stat">
                  <h3>{canchas.length}</h3>
                  <p>Canchas Disponibles</p>
                </div>
                <div className="stat">
                  <h3>{reservas.length}</h3>
                  <p>Mis Reservas</p>
                </div>
                <div className="stat">
                  <h3>24/7</h3>
                  <p>Atención</p>
                </div>
              </div>
              <button 
                className="btn-primary-large"
                onClick={() => handleMenuClick('reservas')}
              >
                Hacer una Reserva
              </button>
            </div>
          </section>
        )}

        {/* PÁGINA: CANCHAS */}
        {activeMenu === 'canchas' && (
          <section className="section-canchas">
            <div className="section-header">
              <h2>🎾 Nuestras Canchas</h2>
              <button className="btn-refresh" onClick={fetchCanchas}>
                🔄 Actualizar
              </button>
            </div>

            {loading ? (
              <div className="loading-spinner">
                <p>Cargando canchas...</p>
              </div>
            ) : canchas.length === 0 ? (
              <p className="no-data">No hay canchas disponibles</p>
            ) : (
              <div className="canchas-grid">
                {canchas.map(cancha => (
                  <div key={cancha.id} className={`cancha-card ${cancha.disponible ? 'disponible' : 'no-disponible'}`}>
                    <div className="cancha-header">
                      <h3>{cancha.nombre}</h3>
                      <span className={`badge ${cancha.disponible ? 'badge-success' : 'badge-danger'}`}>
                        {cancha.disponible ? '✅ Disponible' : '❌ No disponible'}
                      </span>
                    </div>
                    <div className="cancha-body">
                      <p><strong>🏟️ Tipo:</strong> {cancha.tipo}</p>
                      <p><strong>📍 Ubicación:</strong> {cancha.ubicacion}</p>
                      <p className="cancha-precio"><strong>💰 Precio:</strong> ${cancha.precio}</p>
                    </div>
                    <button 
                      className="btn-reserve-small"
                      onClick={() => {
                        handleMenuClick('reservas')
                        setFormData({...formData, canchaId: cancha.id})
                      }}
                    >
                      Reservar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* PÁGINA: MIS RESERVAS */}
        {activeMenu === 'reservas' && (
          <section className="section-reservas">
            <div className="reservas-header">
              <h2>📅 Mis Reservas</h2>
              <button 
                className={`btn-primary ${showForm ? 'btn-danger' : ''}`}
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? '✕ Cerrar' : '➕ Nueva Reserva'}
              </button>
            </div>

            {/* FORMULARIO DE RESERVA */}
            {showForm && (
              <form className="formulario-reserva" onSubmit={handleCrearReserva}>
                <h3>Nueva Reserva</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>👤 Nombre:</label>
                    <input 
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>🎾 Cancha:</label>
                    <select 
                      value={formData.canchaId}
                      onChange={(e) => setFormData({...formData, canchaId: Number(e.target.value)})}
                      required
                    >
                      <option value={0}>Selecciona una cancha</option>
                      {canchas.map(cancha => (
                        <option key={cancha.id} value={cancha.id}>
                          {cancha.nombre} - ${cancha.precio}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>📅 Fecha:</label>
                    <input 
                      type="date"
                      value={formData.fecha}
                      onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>⏰ Hora:</label>
                    <input 
                      type="time"
                      value={formData.hora}
                      onChange={(e) => setFormData({...formData, hora: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>📱 Teléfono:</label>
                    <input 
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      placeholder="Tu teléfono"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-submit">✓ Confirmar Reserva</button>
              </form>
            )}

            {/* LISTA DE RESERVAS */}
            <div className="reservas-container">
              <h3 className="reservas-count">Total: {reservas.length} reserva{reservas.length !== 1 ? 's' : ''}</h3>
              {reservas.length === 0 ? (
                <div className="no-data-container">
                  <p>📭 No tienes reservas aún</p>
                  <button 
                    className="btn-primary"
                    onClick={() => setShowForm(true)}
                  >
                    Crea tu primera reserva
                  </button>
                </div>
              ) : (
                <div className="reservas-lista">
                  {reservas.map(reserva => (
                    <div key={reserva.id} className="reserva-item">
                      <div className="reserva-info">
                        <h4>🎾 {getCanchaNombre(reserva.canchaId)}</h4>
                        <div className="reserva-details">
                          <p>👤 <strong>{reserva.nombre}</strong></p>
                          <p>📅 {reserva.fecha}</p>
                          <p>⏰ {reserva.hora}</p>
                          <p>📱 {reserva.telefono}</p>
                        </div>
                      </div>
                      <button 
                        className="btn-cancel"
                        onClick={() => {
                          if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
                            handleCancelarReserva(reserva.id)
                          }
                        }}
                      >
                        ✕ Cancelar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* PÁGINA: SOBRE NOSOTROS */}
        {activeMenu === 'sobrenosotros' && (
          <section className="section-info">
            <div className="info-content">
              <h2>Sobre Nosotros</h2>
              <p>
                El Complejo de Canchas es una plataforma de reserva de canchas deportivas 
                diseñada para brindarte la mejor experiencia en la gestión de tus actividades deportivas.
              </p>
              <h3>¿Por qué elegirnos?</h3>
              <ul>
                <li>✅ Fácil y rápido de usar</li>
                <li>✅ Múltiples opciones de canchas</li>
                <li>✅ Precios competitivos</li>
                <li>✅ Gestión local sin complicaciones</li>
                <li>✅ Disponibilidad 24/7</li>
              </ul>
              <h3>Nuestras Canchas</h3>
              <p>
                Contamos con canchas de fútbol, tenis, básquetbol y voleibol, 
                todas en excelente estado y con las mejores instalaciones.
              </p>
            </div>
          </section>
        )}

        {/* PÁGINA: CONTACTO */}
        {activeMenu === 'contacto' && (
          <section className="section-info">
            <div className="info-content">
              <h2>Contacto</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <h3>📍 Ubicación</h3>
                  <p>Calle Principal 123<br />Ciudad, País</p>
                </div>
                <div className="contact-item">
                  <h3>📞 Teléfono</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="contact-item">
                  <h3>📧 Email</h3>
                  <p>info@complejocanchas.com</p>
                </div>
                <div className="contact-item">
                  <h3>⏰ Horarios</h3>
                  <p>Lunes a Domingo<br />7:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>⚽ Complejo de Canchas</h4>
            <p>Tu plataforma de reservas deportivas</p>
          </div>
          <div className="footer-section">
            <h4>Menú Rápido</h4>
            <ul>
              <li><button onClick={() => handleMenuClick('canchas')} className="link-button">Canchas</button></li>
              <li><button onClick={() => handleMenuClick('reservas')} className="link-button">Reservas</button></li>
              <li><button onClick={() => handleMenuClick('contacto')} className="link-button">Contacto</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Síguenos</h4>
            <p>Facebook | Instagram | Twitter</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Complejo de Canchas. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
