import { useState, useEffect } from 'react'

const GRADE_COLORS = { S: '#a78bfa', A: '#4ade80', B: '#c4a882', C: '#fbbf24', D: '#ef4444' }

export default function HomeScreen({ profile, hasSave, onNewOperation, onResume, onChangeProfile }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const { callsign, stats } = profile

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
            <span className="home-stat-value">{stats.missionsCompleted}</span>
            <span className="home-stat-label">
              {stats.missionsAttempted > 0
                ? `${stats.missionsCompleted} / ${stats.missionsAttempted} COMPLETED`
                : 'MISSIONS COMPLETED'}
            </span>
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

        <div className="home-actions">
          {hasSave && (
            <button className="begin-btn resume-btn" onClick={onResume}>
              Resume Operation
            </button>
          )}
          <button className="begin-btn" onClick={onNewOperation}>
            New Operation
          </button>
        </div>

        <button className="home-change-operative" onClick={onChangeProfile}>
          Change Operative
        </button>
      </div>
    </div>
  )
}
