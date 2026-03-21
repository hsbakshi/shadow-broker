import { useEffect, useState } from 'react'
import { computeScore } from '../utils/scoring'

const GRADE_LABELS = { S: 'Exceptional', A: 'Excellent', B: 'Good', C: 'Satisfactory', D: 'Poor' }
const GRADES = [
  { g: 'S', label: 'Exceptional',  range: '800–1000' },
  { g: 'A', label: 'Excellent',    range: '650–799' },
  { g: 'B', label: 'Good',         range: '500–649' },
  { g: 'C', label: 'Satisfactory', range: '350–499' },
  { g: 'D', label: 'Poor',         range: '< 350' },
]

export default function LoseScreen({ state, reason, onRestart }) {
  const [visible, setVisible] = useState(false)
  const [score, setScore] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    setScore(computeScore(state))
    return () => clearTimeout(t)
  }, [])

  const agentStatuses = Object.entries(state.agents)

  return (
    <div className={`full-screen lose-screen fade-up ${visible ? 'visible' : ''}`}>
      <div className="end-card">
        <div className="end-classification">OPERATION STATUS — COMPROMISED</div>
        <h1 className="end-title lose-title">Operation Terminated</h1>
        <p className="end-reason">{reason}</p>

        {score && (
          <div className="partial-score">
            <div className="partial-score-label">PARTIAL SCORE</div>
            <div className="partial-score-value">{score.total.toLocaleString()}</div>
            <div className="grade-info-wrap grade-info-wrap--small">
              <div className={`partial-score-grade grade-${score.grade}`}>{score.grade}</div>
              <span className="grade-hint">ⓘ</span>
              <div className="grade-tooltip">
                <div className="gt-current">
                  <span className={`gt-letter grade-${score.grade}`}>{score.grade}</span>
                  <span className="gt-label">{GRADE_LABELS[score.grade]}</span>
                </div>
                <div className="gt-divider" />
                <div className="gt-scale">
                  {GRADES.map(({ g, label, range }) => (
                    <div key={g} className={`gt-row ${g === score.grade ? 'gt-row-active' : ''}`}>
                      <span className={`gt-g grade-${g}`}>{g}</span>
                      <span className="gt-gl">{label}</span>
                      <span className="gt-range">{range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

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
