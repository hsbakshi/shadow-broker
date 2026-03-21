const STARTING_FUNDS = 400000

export function computeScore(state) {
  const fundsScore = Math.round(Math.max(0, state.funds / STARTING_FUNDS) * 400)
  const heatScore = Math.round(Math.max(0, (100 - state.heat) / 100) * 300)
  const activeAgents = Object.values(state.agents).filter(a => a.status === 'active').length
  const agentScore = activeAgents * 100
  const total = Math.min(1000, fundsScore + heatScore + agentScore)

  return {
    total,
    breakdown: { funds: fundsScore, heat: heatScore, agents: agentScore },
    grade: computeGrade(total),
  }
}

function computeGrade(total) {
  if (total >= 800) return 'S'
  if (total >= 650) return 'A'
  if (total >= 500) return 'B'
  if (total >= 350) return 'C'
  return 'D'
}

const LEADERBOARD_KEY = 'shadow-broker-leaderboard'

export function saveScore(scoreObj) {
  const board = loadLeaderboard()
  board.push({ score: scoreObj.total, grade: scoreObj.grade, date: new Date().toLocaleDateString() })
  board.sort((a, b) => b.score - a.score)
  const top5 = board.slice(0, 5)
  try { localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top5)) } catch {}
  return top5
}

export function loadLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
