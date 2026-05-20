import { useState, useEffect } from 'react'

const stats = [
  { value: '94%', label: 'Precisión IA', icon: '🎯' },
  { value: '+12K', label: 'Tasaciones', icon: '🏠' },
  { value: '€850M', label: 'En tasaciones', icon: '📊' },
]

const features = [
  {
    icon: '⚡',
    title: 'Tasación Instantánea',
    desc: 'Obtén el precio estimado de alquiler en segundos con nuestra IA entrenada en datos reales del mercado español.',
    color: 'blue'
  },
  {
    icon: '🗺️',
    title: 'Búsqueda por Provincia',
    desc: 'Explora viviendas disponibles en cualquier provincia de España con filtros inteligentes.',
    color: 'teal'
  },
  {
    icon: '📈',
    title: 'Datos del Mercado',
    desc: 'Accede a información actualizada sobre tendencias de precio en cada zona del país.',
    color: 'orange'
  },
]

export default function Home({ navigate }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`tc-home ${visible ? 'is-visible' : ''}`}>
      {/* Hero */}
      <section className="tc-hero">
        <div className="tc-hero__bg">
          <div className="tc-hero__orb tc-hero__orb--1" />
          <div className="tc-hero__orb tc-hero__orb--2" />
          <div className="tc-hero__grid" />
        </div>
        <div className="tc-hero__content">
          <div className="tc-hero__badge">
            <span className="tc-pulse" />
            IA Predictiva · Mercado Español
          </div>
          <h1 className="tc-hero__title">
            El precio justo<br />
            <span className="tc-hero__accent">de tu vivienda</span>
          </h1>
          <p className="tc-hero__subtitle">
            Inteligencia artificial entrenada con millones de datos del mercado inmobiliario español para darte la tasación más precisa del sector.
          </p>
          <div className="tc-hero__actions">
            <button className="tc-btn tc-btn--primary tc-btn--lg" onClick={() => navigate('rating')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><path d="M16 2h6v6"/>
              </svg>
              Tasar mi vivienda
            </button>
            <button className="tc-btn tc-btn--ghost" onClick={() => navigate('search')}>
              Explorar pisos →
            </button>
          </div>
        </div>

        {/* Floating card */}
        <div className="tc-hero__card">
          <div className="tc-hero__card-header">
            <div className="tc-hero__card-dot" />
            <span>Tasación en tiempo real</span>
          </div>
          <div className="tc-hero__card-price">€1.240<span>/mes</span></div>
          <div className="tc-hero__card-meta">
            <span>🏠 80m²  ·  3 hab  ·  Bizkaia</span>
          </div>
          <div className="tc-hero__card-bar">
            <div className="tc-hero__card-fill" />
          </div>
          <div className="tc-hero__card-range">
            <span>€1.050</span><span>Confianza 94%</span><span>€1.430</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="tc-stats">
        {stats.map((s, i) => (
          <div key={i} className="tc-stat" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="tc-stat__icon">{s.icon}</span>
            <strong className="tc-stat__value">{s.value}</strong>
            <span className="tc-stat__label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="tc-features">
        <div className="tc-section-header">
          <h2 className="tc-section-title">¿Por qué TasaCasa?</h2>
          <p className="tc-section-subtitle">La plataforma de referencia para el mercado inmobiliario español</p>
        </div>
        <div className="tc-features__grid">
          {features.map((f, i) => (
            <div key={i} className={`tc-feature-card tc-feature-card--${f.color}`} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="tc-feature-card__icon">{f.icon}</div>
              <h3 className="tc-feature-card__title">{f.title}</h3>
              <p className="tc-feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="tc-cta">
        <div className="tc-cta__inner">
          <h2 className="tc-cta__title">Comienza ahora, gratis</h2>
          <p className="tc-cta__subtitle">Sin registro. Sin tarjeta. Solo la IA más precisa del mercado.</p>
          <button className="tc-btn tc-btn--primary tc-btn--lg" onClick={() => navigate('rating')}>
            Obtener mi tasación gratuita
          </button>
        </div>
      </section>
    </div>
  )
}