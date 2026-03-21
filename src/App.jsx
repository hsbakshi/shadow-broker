import { useState, useCallback } from 'react'
import { scenarios } from './scenarios'
import Header from './components/Header'
import ScenarioCard from './components/ScenarioCard'
import WinScreen from './components/WinScreen'
import LoseScreen from './components/LoseScreen'

const INITIAL_STATE = {
  funds: 500000,
  heat: 15,
  agents: {
    NIGHTHAWK: { role: 'Infiltration', status: 'active' },
    CIPHER: { role: 'Intelligence', status: 'active' },
    GHOST: { role: 'Elimination', status: 'active' },
  },
  volkovAlive: true,
  scenarioId: 's1',
  phase: 'playing', // playing | outcome | win | lose
  pendingOutcome: null, // { tier, text, effects, next }
  loseReason: null,
  history: [], // track visited scenario ids for stats
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
  const allLost = Object.values(state.agents).every(a => a.status === 'lost')
  if (allLost) {
    return 'All field agents have been lost. Without operatives on the ground, the extraction cannot proceed. VOLKOV disappears back into the Soviet system.'
  }
  if (!state.volkovAlive) {
    return 'VOLKOV is dead. The schematics die with him. Operation Shadow Broker is a catastrophic failure.'
  }
  return null
}

export default function App() {
  const [state, setState] = useState(INITIAL_STATE)

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
    setState(INITIAL_STATE)
  }, [])

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
