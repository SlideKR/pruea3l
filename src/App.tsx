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

  return (
    <div className="app-container">
      <header className="header">
        <h1>⚽ Complejo de Canchas</h1>
        <p>Sistema de Reservas - Gestión Local</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main className="main-content">
        {/* Sección de Canchas Disponibles */}
        <section className="section-canchas">
          <h2>Canchas Disponibles</h2>
          {loading ? (
            <p className="loading">Cargando canchas...</p>
          ) : canchas.length === 0 ? (
            <p className="no-data">No hay canchas disponibles</p>
          ) : (
            <div className="canchas-grid">
              {canchas.map(cancha => (
                <div key={cancha.id} className={`cancha-card ${cancha.disponible ? 'disponible' : 'no-disponible'}`}>
                  <h3>{cancha.nombre}</h3>
                  <p><strong>Tipo:</strong> {cancha.tipo}</p>
                  <p><strong>Ubicación:</strong> {cancha.ubicacion}</p>
                  <p><strong>Precio:</strong> ${cancha.precio}</p>
                  <p className={`status ${cancha.disponible ? 'available' : 'unavailable'}`}>
                    {cancha.disponible ? '✅ Disponible' : '❌ No disponible'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Sección de Reservas */}
        <section className="section-reservas">
          <div className="reservas-header">
            <h2>Mis Reservas ({reservas.length})</h2>
            <button 
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancelar' : '+ Nueva Reserva'}
            </button>
          </div>

          {/* Formulario de Nueva Reserva */}
          {showForm && (
            <form className="formulario-reserva" onSubmit={handleCrearReserva}>
              <div className="form-group">
                <label>Nombre:</label>
                <input 
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label>Cancha:</label>
                <select 
                  value={formData.canchaId}
                  onChange={(e) => setFormData({...formData, canchaId: Number(e.target.value)})}
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
                <label>Fecha:</label>
                <input 
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Hora:</label>
                <input 
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({...formData, hora: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Teléfono:</label>
                <input 
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  placeholder="Tu teléfono"
                />
              </div>

              <button type="submit" className="btn-submit">Reservar</button>
            </form>
          )}

          {/* Lista de Reservas */}
          {reservas.length === 0 ? (
            <p className="no-data">No tienes reservas aún</p>
          ) : (
            <div className="reservas-lista">
              {reservas.map(reserva => (
                <div key={reserva.id} className="reserva-item">
                  <div className="reserva-info">
                    <h4>{getCanchaNombre(reserva.canchaId)}</h4>
                    <p><strong>Nombre:</strong> {reserva.nombre}</p>
                    <p><strong>Fecha:</strong> {reserva.fecha}</p>
                    <p><strong>Hora:</strong> {reserva.hora}</p>
                    <p><strong>Teléfono:</strong> {reserva.telefono}</p>
                  </div>
                  <button 
                    className="btn-cancel"
                    onClick={() => handleCancelarReserva(reserva.id)}
                  >
                    Cancelar
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 Complejo de Canchas - Reservas Locales</p>
        <button className="btn-refresh" onClick={fetchCanchas}>🔄 Actualizar Canchas</button>
      </footer>
    </div>
  )
}

export default App
