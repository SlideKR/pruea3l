import { useState } from 'react'
import './App.css'

interface Cancha {
  id: number
  nombre: string
  tipo: string
  precio: number
  disponible: boolean
  capacidad: number
}

interface Reserva {
  id: string
  canchaId: number
  cliente: string
  fecha: string
  horaInicio: string
  horaFin: string
  telefono: string
  total: number
}

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState({})
  const [canchas, setCanchas] = useState<Cancha[]>([
    { id: 1, nombre: 'Cancha 1 - Fútbol', tipo: 'Fútbol', precio: 50, disponible: true, capacidad: 10 },
    { id: 2, nombre: 'Cancha 2 - Fútbol', tipo: 'Fútbol', precio: 50, disponible: false, capacidad: 10 },
    { id: 3, nombre: 'Cancha 3 - Tenis', tipo: 'Tenis', precio: 40, disponible: true, capacidad: 4 },
    { id: 4, nombre: 'Cancha 4 - Básquetbol', tipo: 'Básquetbol', precio: 45, disponible: true, capacidad: 10 },
  ])
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [showReservaForm, setShowReservaForm] = useState(false)
  const [formReserva, setFormReserva] = useState({
    canchaId: 0,
    cliente: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
    telefono: ''
  })
  const [showCanchaForm, setShowCanchaForm] = useState(false)
  const [formCancha, setFormCancha] = useState({
    nombre: '',
    tipo: '',
    precio: 0,
    capacidad: 0
  })

  const toggleSubmenu = (key: string) => {
    setSubmenuOpen(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu)
    setSidebarOpen(false)
  }

  const handleCrearReserva = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formReserva.canchaId || !formReserva.cliente || !formReserva.fecha || !formReserva.horaInicio || !formReserva.horaFin) {
      alert('Por favor completa todos los campos')
      return
    }

    const cancha = canchas.find(c => c.id === formReserva.canchaId)
    if (!cancha) return

    const horas = parseInt(formReserva.horaFin.split(':')[0]) - parseInt(formReserva.horaInicio.split(':')[0])
    const total = horas * cancha.precio

    const nuevaReserva: Reserva = {
      id: Date.now().toString(),
      canchaId: formReserva.canchaId,
      cliente: formReserva.cliente,
      fecha: formReserva.fecha,
      horaInicio: formReserva.horaInicio,
      horaFin: formReserva.horaFin,
      telefono: formReserva.telefono,
      total
    }

    setReservas([...reservas, nuevaReserva])
    setFormReserva({
      canchaId: 0,
      cliente: '',
      fecha: '',
      horaInicio: '',
      horaFin: '',
      telefono: ''
    })
    setShowReservaForm(false)
  }

  const handleAgregarCancha = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formCancha.nombre || !formCancha.tipo || formCancha.precio === 0) {
      alert('Por favor completa todos los campos')
      return
    }

    const nuevaCancha: Cancha = {
      id: Math.max(...canchas.map(c => c.id), 0) + 1,
      nombre: formCancha.nombre,
      tipo: formCancha.tipo,
      precio: formCancha.precio,
      disponible: true,
      capacidad: formCancha.capacidad
    }

    setCanchas([...canchas, nuevaCancha])
    setFormCancha({ nombre: '', tipo: '', precio: 0, capacidad: 0 })
    setShowCanchaForm(false)
  }

  const handleCancelarReserva = (id: string) => {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      setReservas(reservas.filter(r => r.id !== id))
    }
  }

  const handleEliminarCancha = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta cancha?')) {
      setCanchas(canchas.filter(c => c.id !== id))
    }
  }

  const getCanchaNombre = (canchaId: number) => {
    return canchas.find(c => c.id === canchaId)?.nombre || 'Cancha desconocida'
  }

  const totalIngresos = reservas.reduce((sum, r) => sum + r.total, 0)
  const reservasHoy = reservas.filter(r => r.fecha === new Date().toISOString().split('T')[0]).length
  const canchasDisponibles = canchas.filter(c => c.disponible).length

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-wrapper">
          <button className="hamburger-menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
          <div className="header-logo">
            <h1>🏟️ Complejo de Canchas</h1>
          </div>
          <div className="header-user">
            <span className="user-icon">👨‍💼</span>
          </div>
        </div>
      </header>

      <div className="main-wrapper">
        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2>Menú</h2>
            <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>✕</button>
          </div>
          <nav className="sidebar-nav">
            <ul className="menu-list">
              <li className="menu-item">
                <button
                  className={`menu-link ${activeMenu === 'dashboard' ? 'active' : ''}`}
                  onClick={() => handleMenuClick('dashboard')}
                >
                  <span className="menu-icon">📊</span>
                  <span className="menu-text">Dashboard</span>
                </button>
              </li>
              <li className="menu-item">
                <button
                  className={`menu-link ${submenuOpen.canchas ? 'active' : ''}`}
                  onClick={() => toggleSubmenu('canchas')}
                >
                  <span className="menu-icon">🎾</span>
                  <span className="menu-text">Canchas</span>
                  <span className={`arrow ${submenuOpen.canchas ? 'open' : ''}`}>▼</span>
                </button>
                <ul className={`submenu ${submenuOpen.canchas ? 'open' : ''}`}>
                  <li><button className={`submenu-link ${activeMenu === 'canchas-list' ? 'active' : ''}`} onClick={() => handleMenuClick('canchas-list')}>Ver Canchas</button></li>
                  <li><button className={`submenu-link ${activeMenu === 'agregar-cancha' ? 'active' : ''}`} onClick={() => handleMenuClick('agregar-cancha')}>Agregar Cancha</button></li>
                </ul>
              </li>
              <li className="menu-item">
                <button
                  className={`menu-link ${submenuOpen.reservas ? 'active' : ''}`}
                  onClick={() => toggleSubmenu('reservas')}
                >
                  <span className="menu-icon">📅</span>
                  <span className="menu-text">Reservas</span>
                  <span className={`arrow ${submenuOpen.reservas ? 'open' : ''}`}>▼</span>
                </button>
                <ul className={`submenu ${submenuOpen.reservas ? 'open' : ''}`}>
                  <li><button className={`submenu-link ${activeMenu === 'reservas-list' ? 'active' : ''}`} onClick={() => handleMenuClick('reservas-list')}>Ver Reservas</button></li>
                  <li><button className={`submenu-link ${activeMenu === 'nueva-reserva' ? 'active' : ''}`} onClick={() => handleMenuClick('nueva-reserva')}>Nueva Reserva</button></li>
                </ul>
              </li>
              <li className="menu-item">
                <button
                  className={`menu-link ${activeMenu === 'reportes' ? 'active' : ''}`}
                  onClick={() => handleMenuClick('reportes')}
                >
                  <span className="menu-icon">📈</span>
                  <span className="menu-text">Reportes</span>
                </button>
              </li>
              <li className="menu-item">
                <button
                  className={`menu-link ${submenuOpen.config ? 'active' : ''}`}
                  onClick={() => toggleSubmenu('config')}
                >
                  <span className="menu-icon">⚙️</span>
                  <span className="menu-text">Configuración</span>
                  <span className={`arrow ${submenuOpen.config ? 'open' : ''}`}>▼</span>
                </button>
                <ul className={`submenu ${submenuOpen.config ? 'open' : ''}`}>
                  <li><button className={`submenu-link ${activeMenu === 'config-general' ? 'active' : ''}`} onClick={() => handleMenuClick('config-general')}>General</button></li>
                  <li><button className={`submenu-link ${activeMenu === 'usuarios' ? 'active' : ''}`} onClick={() => handleMenuClick('usuarios')}>Usuarios</button></li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>

        {/* CONTENT */}
        <main className="content">
          {/* DASHBOARD */}
          {activeMenu === 'dashboard' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Dashboard</h1>
                <p>Bienvenido al Complejo de Canchas Deportivas</p>
              </div>
              <div className="cards-grid">
                <div className="card">
                  <div className="card-icon">🎾</div>
                  <h3>Canchas Disponibles</h3>
                  <p className="card-value">{canchasDisponibles}/{canchas.length}</p>
                  <p className="card-desc">En este momento</p>
                </div>
                <div className="card">
                  <div className="card-icon">📅</div>
                  <h3>Reservas Hoy</h3>
                  <p className="card-value">{reservasHoy}</p>
                  <p className="card-desc">Reservaciones activas</p>
                </div>
                <div className="card">
                  <div className="card-icon">💰</div>
                  <h3>Ingresos Totales</h3>
                  <p className="card-value">${totalIngresos}</p>
                  <p className="card-desc">De todas las reservas</p>
                </div>
                <div className="card">
                  <div className="card-icon">📊</div>
                  <h3>Total de Reservas</h3>
                  <p className="card-value">{reservas.length}</p>
                  <p className="card-desc">Todas las reservaciones</p>
                </div>
              </div>

              <div className="dashboard-info">
                <div className="info-section">
                  <h2>Canchas Disponibles</h2>
                  <div className="canchas-preview">
                    {canchas.map(cancha => (
                      <div key={cancha.id} className={`cancha-badge ${cancha.disponible ? 'available' : 'unavailable'}`}>
                        <span className="cancha-name">{cancha.nombre}</span>
                        <span className="cancha-status">{cancha.disponible ? '✅ Disponible' : '❌ Ocupada'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="info-section">
                  <h2>Próximas Reservas</h2>
                  <div className="reservas-preview">
                    {reservas.slice(0, 5).map(reserva => (
                      <div key={reserva.id} className="reserva-preview-item">
                        <span className="preview-time">{reserva.horaInicio}</span>
                        <span className="preview-cancha">{getCanchaNombre(reserva.canchaId)}</span>
                        <span className="preview-cliente">{reserva.cliente}</span>
                      </div>
                    ))}
                    {reservas.length === 0 && <p className="no-data">No hay reservas programadas</p>}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CANCHAS - LIST */}
          {activeMenu === 'canchas-list' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Gestión de Canchas</h1>
                <p>Administra todas tus canchas deportivas</p>
              </div>
              <div className="canchas-table">
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Precio/Hora</th>
                      <th>Capacidad</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {canchas.map(cancha => (
                      <tr key={cancha.id}>
                        <td>{cancha.nombre}</td>
                        <td>{cancha.tipo}</td>
                        <td>${cancha.precio}</td>
                        <td>{cancha.capacidad} personas</td>
                        <td>
                          <span className={`status-badge ${cancha.disponible ? 'available' : 'unavailable'}`}>
                            {cancha.disponible ? '✅ Disponible' : '❌ Ocupada'}
                          </span>
                        </td>
                        <td>
                          <button className="btn-small edit">Editar</button>
                          <button className="btn-small delete" onClick={() => handleEliminarCancha(cancha.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* CANCHAS - AGREGAR */}
          {activeMenu === 'agregar-cancha' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Agregar Nueva Cancha</h1>
                <p>Añade una nueva cancha al complejo</p>
              </div>
              <form className="form-container" onSubmit={handleAgregarCancha}>
                <div className="form-group">
                  <label>Nombre de la Cancha</label>
                  <input
                    type="text"
                    placeholder="Ej: Cancha 5 - Fútbol"
                    value={formCancha.nombre}
                    onChange={(e) => setFormCancha({...formCancha, nombre: e.target.value})}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tipo de Deporte</label>
                    <select value={formCancha.tipo} onChange={(e) => setFormCancha({...formCancha, tipo: e.target.value})}>
                      <option value="">Selecciona un tipo</option>
                      <option value="Fútbol">⚽ Fútbol</option>
                      <option value="Tenis">🎾 Tenis</option>
                      <option value="Básquetbol">🏀 Básquetbol</option>
                      <option value="Voleibol">🏐 Voleibol</option>
                      <option value="Badmintón">🏸 Badmintón</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Precio por Hora ($)</label>
                    <input
                      type="number"
                      placeholder="40"
                      value={formCancha.precio}
                      onChange={(e) => setFormCancha({...formCancha, precio: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Capacidad (personas)</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={formCancha.capacidad}
                    onChange={(e) => setFormCancha({...formCancha, capacidad: Number(e.target.value)})}
                  />
                </div>
                <button type="submit" className="submit-btn">Agregar Cancha</button>
              </form>
            </section>
          )}

          {/* RESERVAS - LIST */}
          {activeMenu === 'reservas-list' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Todas las Reservas</h1>
                <p>Historial de reservaciones</p>
              </div>
              <div className="reservas-table">
                <table>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Cancha</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Teléfono</th>
                      <th>Total</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservas.map(reserva => (
                      <tr key={reserva.id}>
                        <td>{reserva.cliente}</td>
                        <td>{getCanchaNombre(reserva.canchaId)}</td>
                        <td>{reserva.fecha}</td>
                        <td>{reserva.horaInicio} - {reserva.horaFin}</td>
                        <td>{reserva.telefono}</td>
                        <td>${reserva.total}</td>
                        <td>
                          <button className="btn-small edit">Ver</button>
                          <button className="btn-small delete" onClick={() => handleCancelarReserva(reserva.id)}>Cancelar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {reservas.length === 0 && <p className="no-data">No hay reservas registradas</p>}
              </div>
            </section>
          )}

          {/* RESERVAS - NUEVA */}
          {activeMenu === 'nueva-reserva' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Nueva Reserva</h1>
                <p>Crea una nueva reservación</p>
              </div>
              <form className="form-container" onSubmit={handleCrearReserva}>
                <div className="form-group">
                  <label>Selecciona una Cancha</label>
                  <select
                    value={formReserva.canchaId}
                    onChange={(e) => setFormReserva({...formReserva, canchaId: Number(e.target.value)})}
                  >
                    <option value={0}>Selecciona una cancha</option>
                    {canchas.map(cancha => (
                      <option key={cancha.id} value={cancha.id}>
                        {cancha.nombre} - ${cancha.precio}/hora
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Nombre del Cliente</label>
                  <input
                    type="text"
                    placeholder="Ej: Juan García"
                    value={formReserva.cliente}
                    onChange={(e) => setFormReserva({...formReserva, cliente: e.target.value})}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha</label>
                    <input
                      type="date"
                      value={formReserva.fecha}
                      onChange={(e) => setFormReserva({...formReserva, fecha: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Hora Inicio</label>
                    <input
                      type="time"
                      value={formReserva.horaInicio}
                      onChange={(e) => setFormReserva({...formReserva, horaInicio: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Hora Fin</label>
                    <input
                      type="time"
                      value={formReserva.horaFin}
                      onChange={(e) => setFormReserva({...formReserva, horaFin: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formReserva.telefono}
                    onChange={(e) => setFormReserva({...formReserva, telefono: e.target.value})}
                  />
                </div>
                <button type="submit" className="submit-btn">Crear Reserva</button>
              </form>
            </section>
          )}

          {/* REPORTES */}
          {activeMenu === 'reportes' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Reportes</h1>
                <p>Análisis y estadísticas del complejo</p>
              </div>
              <div className="reports-container">
                <div className="report-card">
                  <h3>Ocupación por Cancha</h3>
                  <div className="chart-placeholder">
                    {canchas.map(cancha => {
                      const reservasCancha = reservas.filter(r => r.canchaId === cancha.id).length
                      return (
                        <div key={cancha.id} className="chart-item">
                          <span>{cancha.nombre}</span>
                          <div className="bar" style={{width: `${(reservasCancha / Math.max(reservas.length, 1)) * 100}%`}}>
                            {reservasCancha}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="report-card">
                  <h3>Ingresos por Tipo</h3>
                  <div className="summary-list">
                    {canchas.map(cancha => {
                      const ingresoCancha = reservas
                        .filter(r => r.canchaId === cancha.id)
                        .reduce((sum, r) => sum + r.total, 0)
                      return (
                        <div key={cancha.id} className="summary-item">
                          <span>{cancha.nombre}</span>
                          <strong>${ingresoCancha}</strong>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CONFIGURACIÓN GENERAL */}
          {activeMenu === 'config-general' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Configuración General</h1>
                <p>Ajusta la configuración del complejo</p>
              </div>
              <form className="form-container">
                <div className="form-group">
                  <label>Nombre del Complejo</label>
                  <input type="text" defaultValue="Complejo de Canchas Deportivas" />
                </div>
                <div className="form-group">
                  <label>Dirección</label>
                  <input type="text" placeholder="Tu dirección aquí" />
                </div>
                <div className="form-group">
                  <label>Teléfono de Contacto</label>
                  <input type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="contacto@complejo.com" />
                </div>
                <button type="submit" className="submit-btn">Guardar Cambios</button>
              </form>
            </section>
          )}

          {/* USUARIOS */}
          {activeMenu === 'usuarios' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Usuarios</h1>
                <p>Gestiona los usuarios del sistema</p>
              </div>
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Admin</td>
                      <td>admin@complejo.com</td>
                      <td>Administrador</td>
                      <td><span className="status-badge available">Activo</span></td>
                      <td>
                        <button className="btn-small edit">Editar</button>
                        <button className="btn-small delete">Eliminar</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Recepción</td>
                      <td>recepcion@complejo.com</td>
                      <td>Recepcionista</td>
                      <td><span className="status-badge available">Activo</span></td>
                      <td>
                        <button className="btn-small edit">Editar</button>
                        <button className="btn-small delete">Eliminar</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2024 Complejo de Canchas Deportivas. Sistema de Reservas</p>
      </footer>
    </div>
  )
}

export default App
