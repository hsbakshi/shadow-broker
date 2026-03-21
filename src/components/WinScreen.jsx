import { useEffect, useState } from 'react'

export default function WinScreen({ state, onRestart }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const agentStatuses = Object.entries(state.agents)

  return (
    <div className={`full-screen win-screen fade-up ${visible ? 'visible' : ''}`}>
      <div className="end-card">
        <div className="end-classification">TOP SECRET — EYES ONLY</div>
        <h1 className="end-title">Operation Complete</h1>
        <p className="end-subtitle">
          VOLKOV has been successfully exfiltrated. The schematics are in analysis.
          All field personnel have cleared the area of operations.
        </p>

        <div className="end-stats">
          <div className="end-stat">
            <span className="end-stat-label">REMAINING FUNDS</span>
            <span className="end-stat-value">${state.funds.toLocaleString()}</span>
          </div>
          <div className="end-stat">
            <span className="end-stat-label">FINAL HEAT LEVEL</span>
            <span className={`end-stat-value ${state.heat >= 70 ? 'heat-red' : state.heat >= 40 ? 'heat-amber' : 'heat-green'}`}>
              {state.heat}
            </span>
          </div>
          <div className="end-stat">
            <span className="end-stat-label">SCENARIOS NAVIGATED</span>
            <span className="end-stat-value">{state.history.length}</span>
          </div>
        </div>

        <div className="end-agents">
          {agentStatuses.map(([name, agent]) => (
            <div key={name} className="end-agent">
              <span className="end-agent-name">{name}</span>
              <span className={`end-agent-status status-${agent.status}`}>
                {agent.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        <button className="restart-btn" onClick={onRestart}>
          Run Again
        </button>
      </div>
    </div>
  )
}
