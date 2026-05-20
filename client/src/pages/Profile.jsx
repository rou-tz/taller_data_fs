import { useAuth } from '../context/AuthContext'

export default function Profile({ navigate }) {
  const { user, logout } = useAuth()

  if (!user) {
    navigate('login')
    return null
  }

  const memberSince = new Date(user.createdAt || Date.now()).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  const stats = [
    { label: 'Tasaciones', value: Math.floor(Math.random() * 12) + 1, icon: '📊' },
    { label: 'Favoritos', value: Math.floor(Math.random() * 8), icon: '❤️' },
    { label: 'Búsquedas', value: Math.floor(Math.random() * 30) + 5, icon: '🔍' },
  ]

  const recentActivity = [
    { text: 'Tasación en Bizkaia · 80m²', price: '€1.240/mes', date: 'Hace 2 días', icon: '🏠' },
    { text: 'Búsqueda en Barcelona', price: '---', date: 'Hace 4 días', icon: '🔍' },
    { text: 'Tasación en Madrid · 65m²', price: '€1.050/mes', date: 'Hace 1 semana', icon: '🏠' },
  ]

  return (
    <div className="tc-profile">
      {/* Hero card */}
      <div className="tc-profile__hero">
        <div className="tc-profile__avatar">
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="tc-profile__info">
          <h1 className="tc-profile__name">{user.name}</h1>
          <p className="tc-profile__email">{user.email}</p>
          <p className="tc-profile__since">Miembro desde {memberSince}</p>
        </div>
        <div className="tc-profile__badge">✓ Verificado</div>
      </div>

      {/* Stats */}
      <div className="tc-profile__stats">
        {stats.map((s, i) => (
          <div key={i} className="tc-profile__stat">
            <span className="tc-profile__stat-icon">{s.icon}</span>
            <strong className="tc-profile__stat-val">{s.value}</strong>
            <span className="tc-profile__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="tc-profile__section">
        <h2 className="tc-profile__section-title">Acciones rápidas</h2>
        <div className="tc-profile__actions">
          {[
            { label: 'Nueva tasación', icon: '⚡', page: 'rating' },
            { label: 'Buscar pisos', icon: '🔍', page: 'search' },
            { label: 'Contactar', icon: '💬', page: 'contact' },
          ].map((a, i) => (
            <button key={i} className="tc-profile__action" onClick={() => navigate(a.page)}>
              <span className="tc-profile__action-icon">{a.icon}</span>
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="tc-profile__section">
        <h2 className="tc-profile__section-title">Actividad reciente</h2>
        <div className="tc-profile__activity">
          {recentActivity.map((item, i) => (
            <div key={i} className="tc-activity-item">
              <div className="tc-activity-item__icon">{item.icon}</div>
              <div className="tc-activity-item__body">
                <p className="tc-activity-item__text">{item.text}</p>
                <p className="tc-activity-item__date">{item.date}</p>
              </div>
              {item.price !== '---' && (
                <span className="tc-activity-item__price">{item.price}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Account settings */}
      <div className="tc-profile__section">
        <h2 className="tc-profile__section-title">Cuenta</h2>
        <div className="tc-profile__menu">
          {[
            { label: 'Configuración', icon: '⚙️' },
            { label: 'Notificaciones', icon: '🔔' },
            { label: 'Privacidad', icon: '🔒' },
            { label: 'Ayuda', icon: '❓' },
          ].map((item, i) => (
            <button key={i} className="tc-profile__menu-item">
              <span>{item.icon}</span>
              <span>{item.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          ))}
        </div>
      </div>

      <button
        className="tc-btn tc-btn--logout"
        onClick={() => { logout(); navigate('home') }}
      >
        Cerrar sesión
      </button>
    </div>
  )
}