import { useState } from 'react'
import './App.css'

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState({})

  const toggleSubmenu = (key: string) => {
    setSubmenuOpen(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { 
      id: 'projects', 
      label: '📁 Proyectos', 
      icon: '📁',
      submenu: [
        { id: 'project-list', label: 'Ver Proyectos' },
        { id: 'new-project', label: 'Nuevo Proyecto' }
      ]
    },
    { id: 'team', label: '👥 Equipo', icon: '👥' },
    { 
      id: 'settings', 
      label: '⚙️ Configuración', 
      icon: '⚙️',
      submenu: [
        { id: 'profile', label: 'Perfil' },
        { id: 'preferences', label: 'Preferencias' },
        { id: 'security', label: 'Seguridad' }
      ]
    },
    { id: 'about', label: 'ℹ️ Acerca de', icon: 'ℹ️' }
  ]

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId)
    setSidebarOpen(false)
  }

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-wrapper">
          <button 
            className="hamburger-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
          <div className="header-logo">
            <h1>⚛️ React App</h1>
          </div>
          <div className="header-user">
            <span className="user-icon">👤</span>
          </div>
        </div>
      </header>

      <div className="main-wrapper">
        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2>Menú</h2>
            <button 
              className="close-sidebar"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
          </div>
          <nav className="sidebar-nav">
            <ul className="menu-list">
              {menuItems.map(item => (
                <li key={item.id} className="menu-item">
                  <button
                    className={`menu-link ${activeMenu === item.id ? 'active' : ''}`}
                    onClick={() => {
                      if (item.submenu) {
                        toggleSubmenu(item.id)
                      } else {
                        handleMenuClick(item.id)
                      }
                    }}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-text">{item.label}</span>
                    {item.submenu && (
                      <span className={`arrow ${submenuOpen[item.id] ? 'open' : ''}`}>▼</span>
                    )}
                  </button>
                  {item.submenu && (
                    <ul className={`submenu ${submenuOpen[item.id] ? 'open' : ''}`}>
                      {item.submenu.map(subitem => (
                        <li key={subitem.id}>
                          <button
                            className={`submenu-link ${activeMenu === subitem.id ? 'active' : ''}`}
                            onClick={() => handleMenuClick(subitem.id)}
                          >
                            {subitem.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
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
                <p>Bienvenido a tu panel de control</p>
              </div>
              <div className="cards-grid">
                <div className="card">
                  <div className="card-icon">📈</div>
                  <h3>Proyectos Activos</h3>
                  <p className="card-value">12</p>
                  <p className="card-desc">En desarrollo</p>
                </div>
                <div className="card">
                  <div className="card-icon">👥</div>
                  <h3>Miembros del Equipo</h3>
                  <p className="card-value">8</p>
                  <p className="card-desc">Activos</p>
                </div>
                <div className="card">
                  <div className="card-icon">✅</div>
                  <h3>Tareas Completadas</h3>
                  <p className="card-value">156</p>
                  <p className="card-desc">Este mes</p>
                </div>
                <div className="card">
                  <div className="card-icon">⏰</div>
                  <h3>Horas Trabajadas</h3>
                  <p className="card-value">284</p>
                  <p className="card-desc">Esta semana</p>
                </div>
              </div>
              <div className="dashboard-chart">
                <h2>Actividad Reciente</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-dot">●</span>
                    <p>Nuevo proyecto creado - React App v2.0</p>
                    <span className="activity-time">Hace 2 horas</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-dot">●</span>
                    <p>Se agregó nuevo miembro al equipo</p>
                    <span className="activity-time">Hace 5 horas</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-dot">●</span>
                    <p>Actualización de sistema completada</p>
                    <span className="activity-time">Hace 1 día</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* PROYECTOS */}
          {activeMenu === 'project-list' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Proyectos</h1>
                <p>Gestiona todos tus proyectos</p>
              </div>
              <div className="projects-grid">
                <div className="project-card">
                  <div className="project-header">
                    <h3>React Dashboard</h3>
                    <span className="status-badge active">Activo</span>
                  </div>
                  <p className="project-desc">Panel de control interactivo con Vite + React</p>
                  <div className="project-footer">
                    <span className="team-members">👥 4 miembros</span>
                    <span className="progress">80%</span>
                  </div>
                </div>
                <div className="project-card">
                  <div className="project-header">
                    <h3>Mobile App</h3>
                    <span className="status-badge in-progress">En Progreso</span>
                  </div>
                  <p className="project-desc">Aplicación móvil multiplataforma</p>
                  <div className="project-footer">
                    <span className="team-members">👥 3 miembros</span>
                    <span className="progress">60%</span>
                  </div>
                </div>
                <div className="project-card">
                  <div className="project-header">
                    <h3>API Backend</h3>
                    <span className="status-badge planning">Planificación</span>
                  </div>
                  <p className="project-desc">Servidor API RESTful con Python</p>
                  <div className="project-footer">
                    <span className="team-members">👥 2 miembros</span>
                    <span className="progress">30%</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* NUEVO PROYECTO */}
          {activeMenu === 'new-project' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Crear Nuevo Proyecto</h1>
                <p>Inicia un nuevo proyecto ahora</p>
              </div>
              <form className="project-form">
                <div className="form-group">
                  <label>Nombre del Proyecto</label>
                  <input type="text" placeholder="Ingresa el nombre" />
                </div>
                <div className="form-group">
                  <label>Descripci��n</label>
                  <textarea placeholder="Describe tu proyecto" rows={4}></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Equipo</label>
                    <select>
                      <option>Selecciona un equipo</option>
                      <option>Frontend Team</option>
                      <option>Backend Team</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tecnología</label>
                    <select>
                      <option>React + Vite</option>
                      <option>Vue + Vite</option>
                      <option>Python Django</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="submit-btn">Crear Proyecto</button>
              </form>
            </section>
          )}

          {/* EQUIPO */}
          {activeMenu === 'team' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Equipo</h1>
                <p>Gestiona los miembros de tu equipo</p>
              </div>
              <div className="team-grid">
                <div className="team-member">
                  <div className="member-avatar">👨‍💼</div>
                  <h3>Juan García</h3>
                  <p className="member-role">Frontend Developer</p>
                  <p className="member-email">juan@example.com</p>
                  <button className="member-btn">Ver Perfil</button>
                </div>
                <div className="team-member">
                  <div className="member-avatar">👩‍💻</div>
                  <h3>María López</h3>
                  <p className="member-role">Backend Developer</p>
                  <p className="member-email">maria@example.com</p>
                  <button className="member-btn">Ver Perfil</button>
                </div>
                <div className="team-member">
                  <div className="member-avatar">👨‍🎨</div>
                  <h3>Carlos Rodríguez</h3>
                  <p className="member-role">UI/UX Designer</p>
                  <p className="member-email">carlos@example.com</p>
                  <button className="member-btn">Ver Perfil</button>
                </div>
                <div className="team-member">
                  <div className="member-avatar">👩‍🔬</div>
                  <h3>Ana Martínez</h3>
                  <p className="member-role">QA Engineer</p>
                  <p className="member-email">ana@example.com</p>
                  <button className="member-btn">Ver Perfil</button>
                </div>
              </div>
            </section>
          )}

          {/* PERFIL */}
          {activeMenu === 'profile' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Mi Perfil</h1>
                <p>Administra tu información personal</p>
              </div>
              <div className="profile-container">
                <div className="profile-card">
                  <div className="profile-avatar">👤</div>
                  <h2>Tu Nombre</h2>
                  <p className="profile-role">Administrador</p>
                  <form className="profile-form">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="tu@email.com" />
                    </div>
                    <div className="form-group">
                      <label>Teléfono</label>
                      <input type="tel" placeholder="+1234567890" />
                    </div>
                    <div className="form-group">
                      <label>Ubicación</label>
                      <input type="text" placeholder="Tu ciudad" />
                    </div>
                    <button type="submit" className="submit-btn">Guardar Cambios</button>
                  </form>
                </div>
              </div>
            </section>
          )}

          {/* PREFERENCIAS */}
          {activeMenu === 'preferences' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Preferencias</h1>
                <p>Personaliza tu experiencia</p>
              </div>
              <div className="preferences-container">
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Tema Oscuro</h3>
                    <p>Activa el modo oscuro para la interfaz</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Notificaciones</h3>
                    <p>Recibe notificaciones de tu equipo</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Correos Semanales</h3>
                    <p>Recibe resumen semanal por correo</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </section>
          )}

          {/* SEGURIDAD */}
          {activeMenu === 'security' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Seguridad</h1>
                <p>Mantén tu cuenta segura</p>
              </div>
              <div className="security-container">
                <div className="security-item">
                  <h3>🔐 Cambiar Contraseña</h3>
                  <form className="security-form">
                    <div className="form-group">
                      <label>Contraseña Actual</label>
                      <input type="password" />
                    </div>
                    <div className="form-group">
                      <label>Nueva Contraseña</label>
                      <input type="password" />
                    </div>
                    <div className="form-group">
                      <label>Confirmar Contraseña</label>
                      <input type="password" />
                    </div>
                    <button type="submit" className="submit-btn">Actualizar Contraseña</button>
                  </form>
                </div>
                <div className="security-item">
                  <h3>🛡️ Autenticación de Dos Factores</h3>
                  <p>Añade una capa extra de seguridad a tu cuenta</p>
                  <button className="enable-btn">Habilitar 2FA</button>
                </div>
              </div>
            </section>
          )}

          {/* ACERCA DE */}
          {activeMenu === 'about' && (
            <section className="page-section">
              <div className="page-header">
                <h1>Acerca de</h1>
                <p>Información sobre esta aplicación</p>
              </div>
              <div className="about-container">
                <div className="about-card">
                  <h2>React App Dashboard</h2>
                  <p className="version">Versión 2.0.0</p>
                  <p className="description">
                    Una aplicación de panel de control moderna construida con React y Vite. 
                    Diseñada para proporcionar una experiencia de usuario rápida y responsiva.
                  </p>
                </div>
                <div className="features-list">
                  <h3>Características Incluidas:</h3>
                  <ul>
                    <li>✅ Menú interactivo con submenús</li>
                    <li>✅ Dashboard con estadísticas</li>
                    <li>✅ Gestión de proyectos</li>
                    <li>✅ Gestión de equipo</li>
                    <li>✅ Perfil y preferencias</li>
                    <li>✅ Seguridad mejorada</li>
                    <li>✅ Interfaz responsive</li>
                    <li>✅ Construcción con Vite para máximo rendimiento</li>
                  </ul>
                </div>
                <div className="tech-stack">
                  <h3>Stack Tecnológico:</h3>
                  <div className="tech-badges">
                    <span className="tech-badge">React</span>
                    <span className="tech-badge">Vite</span>
                    <span className="tech-badge">TypeScript</span>
                    <span className="tech-badge">CSS3</span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2024 React Dashboard. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App
