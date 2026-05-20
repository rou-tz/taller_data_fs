import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Header({ navigate, currentPage }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) navigate('search')
  }

  const menuItems = [
    { label: 'Inicio', page: 'home' },
    { label: 'Buscar', page: 'search' },
    { label: 'Tasar', page: 'rating' },
    { label: 'Contacto', page: 'contact' },
    user ? { label: 'Mi Perfil', page: 'profile' } : { label: 'Acceder', page: 'login' },
  ]

  return (
    <>
      <header className="tc-header">
        <div className="tc-header__inner">
          {/* Logo */}
          <button className="tc-logo" onClick={() => navigate('home')}>
            <span className="tc-logo__icon">⬡</span>
            <span className="tc-logo__text">Tasa<strong>Casa</strong></span>
          </button>

          {/* Search */}
          <form className="tc-search" onSubmit={handleSearch}>
            <div className="tc-search__wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Buscar por ciudad..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="tc-search__input"
              />
            </div>
          </form>

          {/* Hamburger */}
          <button
            className={`tc-hamburger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Overlay menu */}
      {menuOpen && (
        <div className="tc-menu-overlay" onClick={() => setMenuOpen(false)}>
          <nav className="tc-menu" onClick={e => e.stopPropagation()}>
            <div className="tc-menu__header">
              <span className="tc-menu__brand">⬡ TasaCasa</span>
              <button className="tc-menu__close" onClick={() => setMenuOpen(false)}>✕</button>
            </div>
            {user && (
              <div className="tc-menu__user">
                <div className="tc-menu__avatar">{user.name?.charAt(0).toUpperCase() || 'U'}</div>
                <div>
                  <p className="tc-menu__username">{user.name}</p>
                  <p className="tc-menu__useremail">{user.email}</p>
                </div>
              </div>
            )}
            <ul className="tc-menu__items">
              {menuItems.map(item => (
                <li key={item.page}>
                  <button
                    className={`tc-menu__item ${currentPage === item.page ? 'is-active' : ''}`}
                    onClick={() => { navigate(item.page); setMenuOpen(false) }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              {user && (
                <li>
                  <button className="tc-menu__item tc-menu__item--danger" onClick={() => { logout(); setMenuOpen(false); navigate('home') }}>
                    Cerrar sesión
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}