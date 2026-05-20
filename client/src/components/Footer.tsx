import { useAuth } from '../context/AuthContext'

const navItems = [
  {
    page: 'home',
    label: 'Inicio',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  },
  {
    page: 'search',
    label: 'Buscar',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    )
  },
  {
    page: 'rating',
    label: 'Tasar',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><path d="M16 2h6v6"/>
      </svg>
    ),
    special: true
  },
  {
    page: 'contact',
    label: 'Contacto',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    )
  },
  {
    page: 'profile',
    authPage: 'login',
    label: 'Perfil',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    )
  }
]

export default function Footer({ navigate, currentPage }) {
  const { user } = useAuth()

  return (
    <nav className="tc-footer">
      {navItems.map(item => {
        const targetPage = item.authPage && !user ? item.authPage : item.page
        const isActive = currentPage === item.page || (item.authPage && currentPage === item.authPage)

        return (
          <button
            key={item.page}
            className={`tc-footer__item ${isActive ? 'is-active' : ''} ${item.special ? 'tc-footer__item--special' : ''}`}
            onClick={() => navigate(targetPage)}
          >
            <span className="tc-footer__icon">{item.icon}</span>
            <span className="tc-footer__label">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}