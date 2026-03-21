import { useEffect, useState } from 'react'
import { computeScore, saveScore } from '../utils/scoring'

export default function WinScreen({ state, onRestart }) {
  const [visible, setVisible] = useState(false)
  const [score, setScore] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    const s = computeScore(state)
    const board = saveScore(s)
    setScore(s)
    setLeaderboard(board)
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

        {score && (
          <>
            <div className="score-grade-block">
              <div className={`score-grade grade-${score.grade}`}>{score.grade}</div>
              <div className="score-total">{score.total.toLocaleString()} <span className="score-pts-label">pts</span></div>
            </div>

            <div className="score-bars">
              <ScoreBar label="Funds Remaining" value={score.breakdown.funds} max={400} color="green" />
              <ScoreBar label="Heat Control" value={score.breakdown.heat} max={300} color="amber" />
              <ScoreBar label="Agent Integrity" value={score.breakdown.agents} max={300} color="blue" />
            </div>
          </>
        )}

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

        {leaderboard.length > 0 && (
          <div className="leaderboard">
            <div className="leaderboard-title">MISSION LOG</div>
            {leaderboard.map((entry, i) => (
              <div key={i} className="leaderboard-row">
                <span className="lb-rank">#{i + 1}</span>
                <span className={`lb-grade grade-${entry.grade}`}>{entry.grade}</span>
                <span className="lb-score">{entry.score.toLocaleString()}</span>
                <span className="lb-date">{entry.date}</span>
              </div>
            ))}
          </div>
        )}

        <button className="restart-btn" onClick={onRestart}>
          Run Again
        </button>
      </div>
    </div>
  )
}

function ScoreBar({ label, value, max, color }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="score-bar-row">
      <div className="score-bar-label">{label}</div>
      <div className="score-bar-track">
        <div className={`score-bar-fill sbar-${color}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="score-bar-pts">{value}</div>
    </div>
  )
}
