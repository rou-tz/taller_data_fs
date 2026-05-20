import { useState } from 'react'

export default function Contact({ navigate }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', type: 'general' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="tc-contact-success">
        <div className="tc-contact-success__icon">✅</div>
        <h2>¡Mensaje enviado!</h2>
        <p>Nos pondremos en contacto contigo en menos de 24 horas.</p>
        <button className="tc-btn tc-btn--primary" onClick={() => { setSent(false); navigate('home') }}>
          Volver al inicio
        </button>
      </div>
    )
  }

  return (
    <div className="tc-contact">
      <div className="tc-page-header">
        <h1 className="tc-page-title">Contacto</h1>
        <p className="tc-page-subtitle">Estamos aquí para ayudarte con cualquier consulta</p>
      </div>

      <div className="tc-contact__cards">
        {[
          { icon: '📧', label: 'Email', val: 'hola@tasacasa.es' },
          { icon: '📞', label: 'Teléfono', val: '+34 944 123 456' },
          { icon: '🕒', label: 'Horario', val: 'Lun–Vie 9–18h' },
        ].map((c, i) => (
          <div key={i} className="tc-contact__card">
            <span>{c.icon}</span>
            <div>
              <strong>{c.label}</strong>
              <span>{c.val}</span>
            </div>
          </div>
        ))}
      </div>

      <form className="tc-contact__form" onSubmit={handleSubmit}>
        <h3 className="tc-contact__form-title">Envíanos un mensaje</h3>

        <div className="tc-field">
          <label className="tc-field__label">Tipo de consulta</label>
          <div className="tc-type-selector">
            {[
              { val: 'general', label: '💬 General' },
              { val: 'tasacion', label: '🏠 Tasación' },
              { val: 'alquiler', label: '🔑 Alquiler' },
              { val: 'tecnico', label: '🔧 Soporte' },
            ].map(t => (
              <button
                key={t.val}
                type="button"
                className={`tc-type-btn ${form.type === t.val ? 'is-active' : ''}`}
                onClick={() => update('type', t.val)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="tc-field-row">
          <div className="tc-field">
            <label className="tc-field__label">Nombre</label>
            <input type="text" className="tc-field__input" placeholder="Tu nombre" value={form.name} onChange={e => update('name', e.target.value)} required />
          </div>
          <div className="tc-field">
            <label className="tc-field__label">Teléfono</label>
            <input type="tel" className="tc-field__input" placeholder="+34 600 000 000" value={form.phone} onChange={e => update('phone', e.target.value)} />
          </div>
        </div>

        <div className="tc-field">
          <label className="tc-field__label">Email</label>
          <input type="email" className="tc-field__input" placeholder="tu@email.com" value={form.email} onChange={e => update('email', e.target.value)} required />
        </div>

        <div className="tc-field">
          <label className="tc-field__label">Mensaje</label>
          <textarea
            className="tc-field__input tc-field__textarea"
            placeholder="¿En qué podemos ayudarte?"
            rows={5}
            value={form.message}
            onChange={e => update('message', e.target.value)}
            required
          />
        </div>

        <button type="submit" className="tc-btn tc-btn--primary tc-btn--full" disabled={loading}>
          {loading ? <><span className="tc-spinner" /> Enviando...</> : '📤 Enviar mensaje'}
        </button>
      </form>
    </div>
  )
}