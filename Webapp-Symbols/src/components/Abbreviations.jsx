import { useState } from 'react'
import { abbreviations } from '../data/abbreviations'
import { resourceIcons } from '../data/resourceIcons'
import { copyIconAsPng } from '../copyIcon'

function Abbreviations() {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(null)
  const [copiedIcon, setCopiedIcon] = useState(null)

  const q = query.trim().toLowerCase()
  const rows = q
    ? abbreviations.filter((a) =>
        [a.resource, a.abbreviation, a.category].some((v) =>
          v.toLowerCase().includes(q),
        ),
      )
    : abbreviations

  const groups = Object.entries(Object.groupBy(rows, (a) => a.category))

  const copy = async (text) => {
    await navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied((c) => (c === text ? null : c)), 1200)
  }

  const copyIcon = async (resource, url) => {
    await copyIconAsPng(url)
    setCopiedIcon(resource)
    setTimeout(() => setCopiedIcon((c) => (c === resource ? null : c)), 1200)
  }

  return (
    <section className="abbreviations">
      <h2>Resource abbreviations</h2>
      <p className="hint">
        Click a symbol to copy it as an image, or an abbreviation to copy the text.
      </p>
      <input
        type="search"
        className="search"
        placeholder="Search resource or abbreviation..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search abbreviations"
      />
      <p className="count">
        {rows.length} of {abbreviations.length}
      </p>
      <div className="card">
        <table>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Abbreviation</th>
          </tr>
        </thead>
        {groups.map(([category, items]) => (
          <tbody key={category}>
            <tr>
              <th colSpan={2} className="category">
                {category}
              </th>
            </tr>
            {items.map((a) => {
              const icon = resourceIcons[a.resource]
              const url = icon && `/icons/${icon}.svg`
              return (
                <tr key={`${a.resource}|${a.abbreviation}`}>
                  <td>
                    <div className="resource">
                      {url ? (
                        <button
                          type="button"
                          className={`icon${copiedIcon === a.resource ? ' copied' : ''}`}
                          onClick={() => copyIcon(a.resource, url)}
                          title={copiedIcon === a.resource ? 'Copied' : 'Copy image'}
                        >
                          <img
                            src={url}
                            alt=""
                            width="24"
                            height="24"
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      ) : (
                        <span className="icon" />
                      )}
                      {a.resource}
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="copy"
                      onClick={() => copy(a.abbreviation)}
                      title="Copy"
                    >
                      {copied === a.abbreviation ? 'Copied' : a.abbreviation}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        ))}
        </table>
      </div>
      {rows.length === 0 && <p>No matches.</p>}
    </section>
  )
}

export default Abbreviations
