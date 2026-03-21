const STATUS_COLOR = {
  active: '#4ade80',
  injured: '#fbbf24',
  compromised: '#f97316',
  lost: '#ef4444',
}

function heatClass(heat) {
  if (heat >= 70) return 'heat-red'
  if (heat >= 40) return 'heat-amber'
  return 'heat-green'
}

export default function Header({ funds, heat, agents }) {
  const hc = heatClass(heat)

  return (
    <header className="header">
      <div className="header-inner">

        <span className="game-title">SHADOW BROKER</span>

        <div className="header-center">
          <div className="hstat">
            <span className="hstat-label">FUNDS</span>
            <span className="hstat-value">${funds.toLocaleString()}</span>
          </div>

          <div className="hstat heat-stat">
            <span className="hstat-label">HEAT</span>
            <div className="heat-bar-track">
              <div
                className={`heat-bar-fill ${hc}`}
                style={{ width: `${Math.min(heat, 100)}%` }}
              />
            </div>
            <span className={`hstat-value ${hc}`}>{heat}</span>
          </div>
        </div>

        <div className="header-agents">
          {Object.entries(agents).map(([name, agent]) => (
            <div key={name} className="hagent" title={`${name} — ${agent.role} — ${agent.status}`}>
              <span className="hagent-dot" style={{ backgroundColor: STATUS_COLOR[agent.status] }} />
              <span className="hagent-name">{name}</span>
            </div>
          ))}
        </div>

      </div>
    </header>
  )
}
