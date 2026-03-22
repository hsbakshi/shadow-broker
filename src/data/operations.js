export const operations = {
  'shadow-broker': {
    id: 'shadow-broker',
    title: 'Operation Shadow Broker',
    subtitle: 'Vienna Station, 1977',
    description: 'Extract a Soviet nuclear physicist before the KGB silences him.',
    era: 'Cold War',
    difficulty: 3,
    startingFunds: 400000,
    startingHeat: 15,
    startScenario: 's1',
    agents: {
      NIGHTHAWK: { role: 'Infiltration' },
      CIPHER: { role: 'Intelligence' },
      GHOST: { role: 'Elimination' },
    },
    tags: ['defection', 'urban', 'extraction'],
    estimatedLength: '30–45 min',
    briefing: {
      classification: 'OPERATION SHADOW BROKER — EYES ONLY',
      title: 'SHADOW BROKER',
      date: 'Vienna Station, October 1977',
      body: 'A Soviet nuclear physicist wants to defect. His knowledge is invaluable. The KGB will stop at nothing to bring him back — or silence him. You are the handler. Every decision is yours.',
      agents: [
        {
          name: 'NIGHTHAWK',
          role: 'Infiltration',
          desc: "Your ghost. Surveillance, entry, physical presence on the ground. When something needs to happen quietly in a place you shouldn't be, NIGHTHAWK goes in.",
        },
        {
          name: 'CIPHER',
          role: 'Intelligence',
          desc: 'Your analyst and field handler. Dead drops, document retrieval, human contact. CIPHER turns information into leverage.',
        },
        {
          name: 'GHOST',
          role: 'Elimination',
          desc: 'Your last resort. When a threat cannot be avoided or outmaneuvered, GHOST removes it. Precise, costly, and not without consequences.',
        },
      ],
    },
  },

  'cold-front': {
    id: 'cold-front',
    title: 'Operation Cold Front',
    subtitle: 'Seoul Station, 1982',
    description: 'A DPRK weapons engineer wants to cross at Panmunjom. Get him out before Bowibu closes the window.',
    era: 'Cold War',
    difficulty: 4,
    startingFunds: 350000,
    startingHeat: 10,
    startScenario: 'k1',
    agents: {
      NIGHTHAWK: { role: 'Infiltration' },
      CIPHER: { role: 'Intelligence' },
      GHOST: { role: 'Elimination' },
    },
    tags: ['defection', 'dmz', 'extraction'],
    estimatedLength: '30–45 min',
    briefing: {
      classification: 'OPERATION COLD FRONT — EYES ONLY',
      title: 'COLD FRONT',
      date: 'Seoul Station, April 1982',
      body: 'A DPRK weapons engineer has made contact. He calls himself LOTUS. He claims North Korea is developing an operational nuclear trigger with Soviet centrifuge technology — and he wants to bring the documentation out through Panmunjom. The window is the May armistice commission session. You have six weeks.',
      agents: [
        {
          name: 'NIGHTHAWK',
          role: 'Infiltration',
          desc: 'Your ground specialist. Military installations, border crossings, controlled zones. In Korea, NIGHTHAWK navigates the spaces between jurisdictions — US, South Korean, and the MDL itself.',
        },
        {
          name: 'CIPHER',
          role: 'Intelligence',
          desc: 'Your human intelligence asset. Source handling, document retrieval, intermediary contact. CIPHER runs the relationship with LOTUS and manages the chain of cutouts between you and him.',
        },
        {
          name: 'GHOST',
          role: 'Elimination',
          desc: 'Your last resort. Bowibu wet-work teams operate in Seoul. When a threat cannot be deflected, GHOST neutralises it. The cost is always heat and sometimes blood.',
        },
      ],
    },
  },
}
