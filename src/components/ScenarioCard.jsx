import { useEffect, useState } from 'react'

const TIER_CONFIG = {
  clean: { label: 'CLEAN', color: '#4ade80', borderColor: '#166534' },
  messy: { label: 'MESSY', color: '#fbbf24', borderColor: '#92400e' },
  burned: { label: 'BURNED', color: '#ef4444', borderColor: '#7f1d1d' },
}

function formatEffect(effects) {
  const parts = []
  if (effects.heat !== 0 && effects.heat !== undefined) {
    const sign = effects.heat > 0 ? '+' : ''
    parts.push(`Heat ${sign}${effects.heat}`)
  }
  if (effects.funds !== 0 && effects.funds !== undefined) {
    const sign = effects.funds > 0 ? '+$' : '-$'
    parts.push(`Funds ${sign}${Math.abs(effects.funds).toLocaleString()}`)
  }
  if (effects.agentStatus) {
    Object.entries(effects.agentStatus).forEach(([name, status]) => {
      parts.push(`${name} → ${status}`)
    })
  }
  return parts
}

function OutcomePanel({ outcome, onContinue }) {
  const [visible, setVisible] = useState(false)
  const tier = TIER_CONFIG[outcome.tier]
  const effectParts = formatEffect(outcome.effects)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`outcome-panel fade-up ${visible ? 'visible' : ''}`}>
      <div
        className="outcome-content"
        style={{ borderLeftColor: tier.borderColor }}
      >
        <div className="outcome-tier" style={{ color: tier.color }}>
          <span className="tier-indicator" style={{ backgroundColor: tier.color }} />
          {tier.label}
        </div>
        <p className="outcome-text">{outcome.text}</p>
        {effectParts.length > 0 && (
          <div className="outcome-effects">
            {effectParts.map((part, i) => (
              <span key={i} className="effect-tag">{part}</span>
            ))}
          </div>
        )}
      </div>
      <button className="continue-btn" onClick={onContinue}>
        Continue →
      </button>
    </div>
  )
}

export default function ScenarioCard({ scenario, phase, pendingOutcome, onChoice, onContinue }) {
  const [cardVisible, setCardVisible] = useState(false)

  useEffect(() => {
    setCardVisible(false)
    const t = setTimeout(() => setCardVisible(true), 80)
    return () => clearTimeout(t)
  }, [scenario.id])

  return (
    <div className={`scenario-card fade-up ${cardVisible ? 'visible' : ''}`}>
      <div className="scenario-meta">
        <span className="scenario-location">{scenario.location}</span>
        <span className="scenario-date">{scenario.date}</span>
      </div>

      <h2 className="scenario-title">{scenario.title}</h2>
      <p className="scenario-setup">{scenario.setup}</p>

      {phase === 'playing' && (
        <div className="choices">
          {scenario.choices.map((choice, i) => (
            <button
              key={i}
              className="choice-btn"
              onClick={() => onChoice(i)}
            >
              <span className="choice-number">{String.fromCharCode(65 + i)}</span>
              <span className="choice-text">{choice.text}</span>
            </button>
          ))}
        </div>
      )}

      {phase === 'outcome' && pendingOutcome && (
        <OutcomePanel outcome={pendingOutcome} onContinue={onContinue} />
      )}
    </div>
  )
}
