import { useState, useEffect } from 'react'
import { operations } from '../data/operations'

const GRADE_COLORS = { S: '#a78bfa', A: '#4ade80', B: '#c4a882', C: '#fbbf24', D: '#ef4444' }

const DIFFICULTY_LABELS = { 1: 'Routine', 2: 'Low', 3: 'Moderate', 4: 'High', 5: 'Critical' }

export default function HomeScreen({ profile, hasSave, onNewOperation, onResume, onChangeProfile }) {
  const [visible, setVisible] = useState(false)
  const [selectedOpId, setSelectedOpId] = useState(Object.keys(operations)[0])

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const { callsign, stats } = profile
  const opList = Object.values(operations)

  return (
    <div className={`full-screen home-screen fade-up ${visible ? 'visible' : ''}`}>
      <div className="home-card">
        <div className="end-classification">TOP SECRET — EYES ONLY</div>

        <div className="home-brand">SHADOW BROKER NETWORK</div>

        <div className="home-divider" />

        <div className="home-profile">
          <span className="home-profile-label">OPERATIVE</span>
          <span className="home-callsign">{callsign}</span>
        </div>

        <div className="home-stats">
          <div className="home-stat">
            <span className="home-stat-value">
              {stats.missionsAttempted > 0
                ? `${stats.missionsCompleted}/${stats.missionsAttempted}`
                : '0'}
            </span>
            <span className="home-stat-label">COMPLETED</span>
          </div>
          <div className="home-stat">
            {stats.bestGrade ? (
              <span
                className="home-stat-value home-stat-grade"
                style={{ color: GRADE_COLORS[stats.bestGrade] }}
              >
                {stats.bestGrade}
              </span>
            ) : (
              <span className="home-stat-value home-stat-empty">—</span>
            )}
            <span className="home-stat-label">BEST GRADE</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-value">
              {stats.totalScore > 0 ? stats.totalScore.toLocaleString() : '—'}
            </span>
            <span className="home-stat-label">TOTAL SCORE</span>
          </div>
        </div>

        <div className="mission-select">
          <div className="mission-select-label">SELECT OPERATION</div>
          <div className="mission-cards">
            {opList.map(op => (
              <button
                key={op.id}
                className={`mission-card ${selectedOpId === op.id ? 'mission-card-active' : ''}`}
                onClick={() => setSelectedOpId(op.id)}
              >
                <div className="mc-header">
                  <span className="mc-title">{op.title}</span>
                  <span className="mc-difficulty" data-level={op.difficulty}>
                    {DIFFICULTY_LABELS[op.difficulty]}
                  </span>
                </div>
                <span className="mc-subtitle">{op.subtitle}</span>
                <span className="mc-desc">{op.description}</span>
                <span className="mc-meta">{op.estimatedLength}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="home-actions">
          {hasSave && (
            <button className="begin-btn resume-btn" onClick={onResume}>
              Resume Operation
            </button>
          )}
          <button className="begin-btn" onClick={() => onNewOperation(selectedOpId)}>
            Start Operation
          </button>
        </div>

        <button className="home-change-operative" onClick={onChangeProfile}>
          Change Operative
        </button>
      </div>
    </div>
  )
}
