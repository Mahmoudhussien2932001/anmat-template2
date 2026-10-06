import { useState } from 'react'

function pick(copy, english) {
  return english ? copy.en : copy.ar
}

export default function PhaseRail({ id, title, intro, phases, english, action }) {
  const [open, setOpen] = useState(0)
  const safe = Math.min(open, phases.length - 1)
  const arrow = english ? '→' : '←'

  return (
    <section className="section phase-section" id={id}>
      <div className="wrap phase-layout">
        <header className="phase-intro">
          <h2>{title}</h2>
          {intro ? <p className="fine">{intro}</p> : null}
        </header>
        <ol className="phase-rail">
          {phases.map((item, index) => {
            const selected = index === safe
            return (
              <li key={item.id} className={selected ? 'is-open' : ''}>
                <button
                  type="button"
                  aria-expanded={selected}
                  onClick={() => setOpen(selected ? -1 : index)}
                >
                  <span className="phase-index">0{index + 1}</span>
                  <span className="phase-name">{pick(item.title, english)}</span>
                </button>
                <div className="phase-body" inert={selected ? undefined : true}>
                  <div>
                    <h3>{pick(item.lead, english)}</h3>
                    <p>{pick(item.text, english)}</p>
                    <p className="phase-deliver">{pick(item.deliverable, english)}</p>
                    <ul className="check-list">
                      {item.items[english ? 'en' : 'ar'].map((line) => (
                        <li key={line}><span className="check" aria-hidden="true" />{line}</li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="phase-next"
                      onClick={() => setOpen((index + 1) % phases.length)}
                    >
                      {english ? 'Next stage' : 'المرحلة التالية'}
                      <span aria-hidden="true">{arrow}</span>
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
        {action ? <div className="phase-action">{action}</div> : null}
      </div>
    </section>
  )
}
