import { useState, useEffect, useRef } from 'react'

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)
  const [callsign, setCallsign] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const handleStepTransition = () => {
    setVisible(false)
    setTimeout(() => {
      setStep(1)
      setVisible(true)
    }, 300)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = callsign.trim().toUpperCase()
    if (!trimmed) {
      setError('A callsign is required.')
      return
    }
    if (trimmed.length < 2) {
      setError('Callsign must be at least 2 characters.')
      return
    }
    onComplete(trimmed)
  }

  useEffect(() => {
    if (step === 1 && inputRef.current) {
      inputRef.current.focus()
    }
  }, [step])

  return (
    <div className={`full-screen onboarding-screen fade-up ${visible ? 'visible' : ''}`}>
      <div className="onboarding-card">
        <div className="end-classification">TOP SECRET — EYES ONLY</div>

        {step === 0 && (
          <>
            <h1 className="onboarding-title">SHADOW BROKER NETWORK</h1>
            <p className="onboarding-subtitle">Operative Recruitment / 1981</p>

            <p className="onboarding-body">
              A Soviet nuclear physicist has made contact. He calls himself VOLKOV. He wants to defect — and he is
              bringing the Novaya Zemlya weapons schematics with him.
            </p>
            <p className="onboarding-body">
              Getting him out will require money, discretion, and three field agents whose lives will depend on
              your decisions. One wrong move burns an asset. Two wrong moves end the mission.
            </p>
            <p className="onboarding-body">
              You will serve as his handler.
            </p>

            <div className="onboarding-mechanics">
              <div className="onboarding-mechanic">
                <span className="om-label">FUNDS</span>
                <span className="om-desc">Operational budget for bribes, transport, and extraction logistics.</span>
              </div>
              <div className="onboarding-mechanic">
                <span className="om-label">HEAT</span>
                <span className="om-desc">Soviet counterintelligence awareness. Reach 100 and the operation is burned.</span>
              </div>
              <div className="onboarding-mechanic">
                <span className="om-label">AGENTS</span>
                <span className="om-desc">Your field operatives. Lose all three and there is no one left to run the extraction.</span>
              </div>
            </div>

            <button className="begin-btn" onClick={handleStepTransition}>
              Accept Assignment
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="onboarding-title">IDENTIFY YOURSELF</h1>
            <p className="onboarding-body">
              All operatives require a designation. Your callsign will be used to track mission
              performance across operations.
            </p>

            <form className="callsign-form" onSubmit={handleSubmit}>
              <label className="callsign-label">YOUR CALLSIGN</label>
              <input
                ref={inputRef}
                className="callsign-input"
                type="text"
                maxLength={16}
                placeholder="e.g. PHOENIX"
                value={callsign}
                onChange={e => {
                  setCallsign(e.target.value)
                  setError('')
                }}
                autoComplete="off"
                spellCheck={false}
              />
              {error && <p className="callsign-error">{error}</p>}
              <button className="begin-btn" type="submit">
                Enter the Network
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
