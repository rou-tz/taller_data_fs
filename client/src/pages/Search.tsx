import { useState } from 'react'

const API_BASE = 'http://192.168.1.48:5000'

const provinces = [
  'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos',
  'Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','Coruña','Cuenca',
  'Girona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén',
  'La Rioja','Las Palmas','León','Lleida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Ourense','Palencia','Pontevedra','Salamanca','Santa Cruz de Tenerife','Segovia','Sevilla',
  'Soria','Tarragona','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza','Bizkaia'
]

// Mock data generator for demo
function generateMockProperties(province, count = 8) {
  const types = ['Piso', 'Apartamento', 'Dúplex', 'Ático', 'Estudio']
  const neighborhoods = ['Centro', 'Ensanche', 'Casco Viejo', 'Urduliz', 'Las Arenas', 'Getxo', 'Algorta', 'Indautxu']
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    type: types[i % types.length],
    title: `${types[i % types.length]} en ${neighborhoods[i % neighborhoods.length]}`,
    province,
    neighborhood: neighborhoods[i % neighborhoods.length],
    surface: 45 + Math.floor(Math.random() * 120),
    bedrooms: 1 + Math.floor(Math.random() * 4),
    bathrooms: 1 + Math.floor(Math.random() * 2),
    price: 600 + Math.floor(Math.random() * 1400),
    floor: Math.floor(Math.random() * 8),
    hasElevator: Math.random() > 0.4,
    hasParking: Math.random() > 0.6,
    hasBalcony: Math.random() > 0.5,
    image: `https://picsum.photos/seed/${i + 10}/400/280`,
    rating: (3.5 + Math.random() * 1.5).toFixed(1),
  }))
}

export default function Search({ navigate }) {
  const [province, setProvince] = useState('Bizkaia')
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [sortBy, setSortBy] = useState('price')

  const handleSearch = async (e) => {
    e?.preventDefault()
    setLoading(true)
    setSearched(false)

    try {
      const res = await fetch(`${API_BASE}/properties?province=${encodeURIComponent(province)}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setProperties(data)
    } catch {
      // Demo fallback
      await new Promise(r => setTimeout(r, 900))
      setProperties(generateMockProperties(province))
    } finally {
      setLoading(false)
      setSearched(true)
    }
  }

  const sorted = [...properties].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'surface') return b.surface - a.surface
    return 0
  })

  return (
    <div className="tc-search-page">
      <div className="tc-page-header">
        <h1 className="tc-page-title">Buscar Pisos</h1>
        <p className="tc-page-subtitle">Encuentra tu hogar ideal en España</p>
      </div>

      <form className="tc-search-bar" onSubmit={handleSearch}>
        <div className="tc-search-bar__select-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <select
            className="tc-search-bar__select"
            value={province}
            onChange={e => setProvince(e.target.value)}
          >
            {provinces.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <button type="submit" className="tc-btn tc-btn--primary" disabled={loading}>
          {loading ? <span className="tc-spinner" /> : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Buscar
            </>
          )}
        </button>
      </form>

      {loading && (
        <div className="tc-loading">
          <div className="tc-loading__dots">
            <span /><span /><span />
          </div>
          <p>Buscando en {province}...</p>
        </div>
      )}

      {searched && !loading && (
        <>
          <div className="tc-search-results-header">
            <span className="tc-search-count">{properties.length} viviendas en <strong>{province}</strong></span>
            <select className="tc-sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="price">Precio ↑</option>
              <option value="price-desc">Precio ↓</option>
              <option value="surface">Más grandes</option>
            </select>
          </div>
          <div className="tc-properties-grid">
            {sorted.map(prop => (
              <PropertyCard key={prop.id} property={prop} navigate={navigate} />
            ))}
          </div>
        </>
      )}

      {!searched && !loading && (
        <div className="tc-search-empty">
          <div className="tc-search-empty__icon">🔍</div>
          <p>Selecciona una provincia y haz tu búsqueda</p>
        </div>
      )}
    </div>
  )
}

function PropertyCard({ property: p, navigate }) {
  return (
    <button
      className="tc-prop-card"
      onClick={() => navigate('detail', p)}
    >
      <div className="tc-prop-card__img-wrap">
        <img src={p.image} alt={p.title} className="tc-prop-card__img" loading="lazy" />
        <div className="tc-prop-card__badge">{p.type}</div>
        <div className="tc-prop-card__price">€{p.price.toLocaleString('es')}<span>/mes</span></div>
      </div>
      <div className="tc-prop-card__body">
        <h3 className="tc-prop-card__title">{p.title}</h3>
        <p className="tc-prop-card__location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {p.neighborhood}, {p.province}
        </p>
        <div className="tc-prop-card__specs">
          <span>🛏 {p.bedrooms}</span>
          <span>🚿 {p.bathrooms}</span>
          <span>📐 {p.surface}m²</span>
          {p.hasElevator && <span>🛗</span>}
          {p.hasParking && <span>🅿️</span>}
        </div>
      </div>
    </button>
  )
}