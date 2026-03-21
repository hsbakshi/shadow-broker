export const operations = {
  'shadow-broker': {
    id: 'shadow-broker',
    title: 'Operation Shadow Broker',
    subtitle: 'Vienna Station, 1977',
    description: 'Extract a Soviet nuclear physicist before the KGB silences him.',
    era: 'Cold War',
    difficulty: 3, // 1–5
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
  },
}
