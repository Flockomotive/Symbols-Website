import { useState } from 'react'
import { copyIconAsPng } from '../copyIcon'

function SymbolGrid({ title, symbols }) {
  const [copied, setCopied] = useState(null)

  const copy = async (s) => {
    await copyIconAsPng(s.url)
    setCopied(s.name)
    setTimeout(() => setCopied((c) => (c === s.name ? null : c)), 1200)
  }

  return (
    <section>
      <h2>{title}</h2>
      <p className="hint">Click a symbol to copy it as an image.</p>
      <div className="grid">
        {symbols.map((s) => (
          <button
            key={s.name}
            type="button"
            className={`tile${copied === s.name ? ' copied' : ''}`}
            onClick={() => copy(s)}
            title="Copy image"
          >
            <img src={s.url} alt="" width="64" height="64" loading="lazy" decoding="async" />
            <span>{copied === s.name ? 'Copied' : s.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default SymbolGrid
