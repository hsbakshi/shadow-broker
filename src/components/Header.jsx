function HeatBar({ heat }) {
  let colorClass = 'heat-green'
  let label = 'LOW'
  if (heat >= 70) {
    colorClass = 'heat-red'
    label = 'CRITICAL'
  } else if (heat >= 40) {
    colorClass = 'heat-amber'
    label = 'ELEVATED'
  }

  return (
    <div className="heat-display">
      <span className="stat-label">HEAT</span>
      <div className="heat-bar-track">
        <div
          className={`heat-bar-fill ${colorClass}`}
          style={{ width: `${Math.min(heat, 100)}%` }}
        />
      </div>
      <span className={`heat-value ${colorClass}`}>{heat} <span className="heat-level">{label}</span></span>
    </div>
  )
}

function AgentBadge({ name, agent }) {
  const statusColors = {
    active: '#4ade80',
    injured: '#fbbf24',
    compromised: '#f97316',
    lost: '#ef4444',
  }

  return (
    <div className="agent-badge">
      <span
        className="agent-dot"
        style={{ backgroundColor: statusColors[agent.status] }}
      />
      <div className="agent-info">
        <span className="agent-name">{name}</span>
        <span className="agent-role">{agent.role}</span>
      </div>
      <span className="agent-status" style={{ color: statusColors[agent.status] }}>
        {agent.status.toUpperCase()}
      </span>
    </div>
  )
}

export default function Header({ funds, heat, agents }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-title">
          <h1 className="game-title">SHADOW BROKER</h1>
          <span className="game-subtitle">Cold War Operations Directorate</span>
        </div>

        <div className="header-stats">
          <div className="funds-display">
            <span className="stat-label">OPERATIONAL FUNDS</span>
            <span className="funds-value">
              ${funds.toLocaleString()}
            </span>
          </div>
          <HeatBar heat={heat} />
        </div>

        <div className="agents-display">
          {Object.entries(agents).map(([name, agent]) => (
            <AgentBadge key={name} name={name} agent={agent} />
          ))}
        </div>
      </div>
    </header>
  )
}
