import { useEffect, useState } from 'react'

export default function IntroScreen({ operation, onStart, onResume, hasSave }) {
  const [visible, setVisible] = useState(false)
  const [confirmNew, setConfirmNew] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  function handleNewGameClick() {
    if (hasSave) {
      setConfirmNew(true)
    } else {
      onStart()
    }
  }

  const b = operation.briefing

  return (
    <div className={`full-screen intro-screen fade-up ${visible ? 'visible' : ''}`}>
      <div className="intro-card">
        <div className="end-classification">{b.classification}</div>

        <h1 className="intro-title">{b.title}</h1>
        <p className="intro-date">{b.date}</p>

        <p className="intro-body">{b.body}</p>

        <div className="intro-mechanics">
          <div className="mechanic">
            <span className="mechanic-label">FUNDS</span>
            <span className="mechanic-desc">Operations cost money. Run dry and your options narrow.</span>
          </div>
          <div className="mechanic">
            <span className="mechanic-label">HEAT</span>
            <span className="mechanic-desc">Enemy attention. Reaches 100 and the operation is burned.</span>
          </div>
          <div className="mechanic">
            <span className="mechanic-label">AGENTS</span>
            <span className="mechanic-desc">Lose all three and the extraction cannot proceed.</span>
          </div>
        </div>

        <div className="intro-agents">
          <div className="intro-agents-label">YOUR FIELD ASSETS</div>
          {b.agents.map(agent => (
            <div key={agent.name} className="intro-agent">
              <div className="intro-agent-header">
                <span className="intro-agent-dot" />
                <span className="intro-agent-name">{agent.name}</span>
                <span className="intro-agent-role">{agent.role}</span>
              </div>
              <p className="intro-agent-desc">{agent.desc}</p>
            </div>
          ))}
        </div>

        {hasSave && (
          <button className="begin-btn resume-btn" onClick={onResume}>
            Resume Operation
          </button>
        )}

        {confirmNew ? (
          <div className="new-game-confirm">
            <p className="new-game-confirm-text">
              You have a saved operation in progress. Starting new will erase it.
            </p>
            <div className="new-game-confirm-actions">
              <button className="begin-btn new-game-confirm-yes" onClick={onStart}>
                Start New
              </button>
              <button className="restart-btn" onClick={() => setConfirmNew(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button className="begin-btn" onClick={handleNewGameClick}>
            {hasSave ? 'Begin New Operation' : 'Begin Operation'}
          </button>
        )}
      </div>
    </div>
  )
}
