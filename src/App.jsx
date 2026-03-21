import { useState, useCallback, useEffect } from 'react'
import { scenarios } from './data/scenarios'
import Header from './components/Header'
import ScenarioCard from './components/ScenarioCard'
import WinScreen from './components/WinScreen'
import LoseScreen from './components/LoseScreen'
import IntroScreen from './components/IntroScreen'

const SAVE_KEY = 'shadow-broker-save'

const INITIAL_STATE = {
  funds: 400000,
  heat: 15,
  agents: {
    NIGHTHAWK: { role: 'Infiltration', status: 'active' },
    CIPHER: { role: 'Intelligence', status: 'active' },
    GHOST: { role: 'Elimination', status: 'active' },
  },
  volkovAlive: true,
  scenarioId: 's1',
  phase: 'intro', // intro | playing | outcome | win | lose | abort-confirm
  pendingOutcome: null, // { tier, text, effects, next }
  loseReason: null,
  history: [], // track visited scenario ids for stats
  preAbortPhase: null, // stores phase before abort-confirm
}

function applyEffects(state, effects) {
  const next = {
    ...state,
    funds: state.funds + (effects.funds || 0),
    heat: Math.max(0, state.heat + (effects.heat || 0)),
    agents: { ...state.agents },
  }

  if (effects.agentStatus) {
    Object.entries(effects.agentStatus).forEach(([name, status]) => {
      next.agents[name] = { ...next.agents[name], status }
    })
  }

  return next
}

function checkLoseCondition(state) {
  if (state.heat >= 100) {
    return 'Heat reached critical levels. KGB counterintelligence has identified the operation. Assets are burned. VOLKOV is taken back into custody.'
  }
  if (state.funds < 0) {
    return 'Operational funds are exhausted. Without resources to move personnel or acquire materials, the extraction collapses. VOLKOV cannot be reached in time.'
  }
  const allLost = Object.values(state.agents).every(a => a.status === 'lost')
  if (allLost) {
    return 'All field agents have been lost. Without operatives on the ground, the extraction cannot proceed. VOLKOV disappears back into the Soviet system.'
  }
  if (!state.volkovAlive) {
    return 'VOLKOV is dead. The schematics die with him. Operation Shadow Broker is a catastrophic failure.'
  }
  return null
}

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function clearSave() {
  localStorage.removeItem(SAVE_KEY)
}

export default function App() {
  const [state, setState] = useState(INITIAL_STATE)
  const [hasSave, setHasSave] = useState(() => !!localStorage.getItem(SAVE_KEY))

  // Auto-save on every state change (skip intro/abort-confirm phases)
  useEffect(() => {
    if (state.phase !== 'intro' && state.phase !== 'abort-confirm') {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state))
    }
  }, [state])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [state.scenarioId, state.phase])

  const handleChoice = useCallback((choiceIndex) => {
    const scenario = scenarios[state.scenarioId]
    const choice = scenario.choices[choiceIndex]
    const { outcome } = choice

    const newState = applyEffects(state, outcome.effects)
    newState.history = [...state.history, state.scenarioId]

    const loseReason = checkLoseCondition(newState)

    if (loseReason && outcome.next !== 'WIN') {
      setState({
        ...newState,
        phase: 'outcome',
        pendingOutcome: { ...outcome, forcedLose: true, loseReason },
      })
    } else {
      setState({
        ...newState,
        phase: 'outcome',
        pendingOutcome: outcome,
      })
    }
  }, [state])

  const handleContinue = useCallback(() => {
    const { pendingOutcome } = state

    if (pendingOutcome.forcedLose) {
      setState(s => ({ ...s, phase: 'lose', loseReason: pendingOutcome.loseReason, pendingOutcome: null }))
      return
    }

    if (pendingOutcome.next === 'WIN') {
      setState(s => ({ ...s, phase: 'win', pendingOutcome: null }))
      return
    }

    const loseReason = checkLoseCondition(state)
    if (loseReason) {
      setState(s => ({ ...s, phase: 'lose', loseReason, pendingOutcome: null }))
      return
    }

    setState(s => ({
      ...s,
      scenarioId: pendingOutcome.next,
      phase: 'playing',
      pendingOutcome: null,
    }))
  }, [state])

  const handleRestart = useCallback(() => {
    clearSave()
    setHasSave(false)
    setState(INITIAL_STATE)
  }, [])

  const handleStart = useCallback(() => {
    clearSave()
    setHasSave(false)
    setState({ ...INITIAL_STATE, phase: 'playing' })
  }, [])

  const handleResume = useCallback(() => {
    const saved = loadSave()
    if (saved) setState(saved)
  }, [])

  const handleAbort = useCallback(() => {
    setState(s => ({ ...s, preAbortPhase: s.phase, phase: 'abort-confirm' }))
  }, [])

  const handleAbortCancel = useCallback(() => {
    setState(s => ({ ...s, phase: s.preAbortPhase, preAbortPhase: null }))
  }, [])

  const handleAbortConfirm = useCallback(() => {
    // Save remains in localStorage so player can resume; just go back to intro
    setHasSave(true)
    setState(INITIAL_STATE)
  }, [])

  // Win and lose clear the save
  useEffect(() => {
    if (state.phase === 'win' || state.phase === 'lose') {
      clearSave()
      setHasSave(false)
    }
  }, [state.phase])

  if (state.phase === 'intro') {
    return (
      <IntroScreen
        onStart={handleStart}
        onResume={handleResume}
        hasSave={hasSave}
      />
    )
  }

  if (state.phase === 'abort-confirm') {
    return (
      <div className="full-screen">
        <div className="abort-confirm-card">
          <div className="end-classification">OPERATION SHADOW BROKER</div>
          <p className="abort-confirm-title">ABORT MISSION?</p>
          <p className="abort-confirm-sub">
            Your progress has been saved. You can resume at any time.
          </p>
          <button className="continue-btn" onClick={handleAbortCancel}>
            Resume Mission
          </button>
          <button className="abort-exit-btn" onClick={handleAbortConfirm}>
            Exit to Briefing
          </button>
        </div>
      </div>
    )
  }

  if (state.phase === 'win') {
    return <WinScreen state={state} onRestart={handleRestart} />
  }

  if (state.phase === 'lose') {
    return <LoseScreen state={state} reason={state.loseReason} onRestart={handleRestart} />
  }

  const scenario = scenarios[state.scenarioId]

  return (
    <div className="app">
      <Header
        funds={state.funds}
        heat={state.heat}
        agents={state.agents}
        phase={state.phase}
        onAbort={handleAbort}
      />
      <main className="main-content">
        <ScenarioCard
          scenario={scenario}
          phase={state.phase}
          pendingOutcome={state.pendingOutcome}
          onChoice={handleChoice}
          onContinue={handleContinue}
        />
      </main>
    </div>
  )
}
