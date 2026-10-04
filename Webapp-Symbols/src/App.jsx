import { useState } from 'react'
import './App.css'
import Abbreviations from './components/Abbreviations'
import SymbolGrid from './components/SymbolGrid'
import { d365Symbols } from './data/d365Symbols'
import { adoSymbols } from './data/adoSymbols'

const views = [
  ['azure', 'Azure'],
  ['d365', 'D365'],
  ['ado', 'DevOps'],
]

function App() {
  const [view, setView] = useState('azure')

  return (
    <>
      <header className="top">
        <div className="top-inner">
          <h1>Symbols</h1>
          <div className="switch" role="tablist">
            {views.map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={view === id}
                className={view === id ? 'active' : ''}
                onClick={() => setView(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>
      <main>
        {view === 'azure' && <Abbreviations />}
        {view === 'd365' && (
          <SymbolGrid title="Dynamics 365 symbols" symbols={d365Symbols} />
        )}
        {view === 'ado' && (
          <SymbolGrid title="DevOps symbols" symbols={adoSymbols} />
        )}
      </main>
    </>
  )
}

export default App
