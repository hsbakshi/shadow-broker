export const scenarios = {
  s1: {
    id: 's1',
    title: 'The Defector',
    location: 'Vienna',
    date: 'October 4, 1977',
    setup: `Soviet nuclear physicist VOLKOV has made contact through a third-party intermediary. He claims to have full schematics for a miniaturized warhead trigger — and he wants out. The KGB rezidentura in Vienna is large and aggressive. VOLKOV is scared and won't wait long.`,
    choices: [
      {
        text: 'Send CIPHER to make contact and assess VOLKOV\'s credibility',
        outcome: {
          tier: 'clean',
          text: 'CIPHER meets VOLKOV at a café near the Ringstraße. The scientist is nervous but coherent. The intelligence checks out. Contact is established with minimal exposure.',
          effects: { heat: 5, funds: -15000 },
          next: 's2',
        },
      },
      {
        text: 'Have NIGHTHAWK shadow VOLKOV first to verify he\'s not a dangle',
        outcome: {
          tier: 'clean',
          text: 'NIGHTHAWK tracks VOLKOV for 48 hours. No surveillance detected. The man is genuine — and increasingly desperate. You proceed with confidence.',
          effects: { heat: 3, funds: -25000 },
          next: 's2',
        },
      },
      {
        text: 'Go yourself — faster and more convincing',
        outcome: {
          tier: 'messy',
          text: 'You meet VOLKOV personally. He is reassured, but a Soviet cultural attaché spots you leaving the location. You don\'t think you were identified — but you can\'t be sure.',
          effects: { heat: 12, funds: -5000 },
          next: 's2',
        },
      },
      {
        text: 'Abort — the risk is too high without more vetting',
        outcome: {
          tier: 'burned',
          text: 'You stand VOLKOV down. He panics and makes a clumsy call to a Western journalist. The KGB notices the journalist\'s interest. The dead drop site is now under watch.',
          effects: { heat: -5, funds: 0 },
          next: 's2_hard',
        },
      },
    ],
  },

  s2: {
    id: 's2',
    title: 'Dead Drop',
    location: 'Budapest',
    date: 'October 11, 1977',
    setup: `VOLKOV has cached the first batch of schematics at a pre-arranged dead drop behind a loose brick in a Pest district underpass. The KGB rezident here — a methodical man named TUROV — has been seen deploying mobile surveillance teams in the area.`,
    choices: [
      {
        text: 'Run the dead drop as planned — TUROV may be coincidental',
        outcome: {
          tier: 'clean',
          text: 'CIPHER retrieves the package cleanly. The surveillance teams are checking a different underpass entirely. The schematics are genuine — partial, but invaluable.',
          effects: { heat: 3, funds: -10000 },
          next: 's3',
        },
      },
      {
        text: 'Change the location at the last minute — route VOLKOV to the railway station',
        outcome: {
          tier: 'messy',
          text: 'VOLKOV is confused by the change and arrives 40 minutes late. Two of TUROV\'s men sweep the original site and find nothing. The railway handoff is rushed and visible to a Hungarian secret police informant.',
          effects: { heat: 8, funds: -30000 },
          next: 's3',
        },
      },
    ],
  },

  s2_hard: {
    id: 's2_hard',
    title: 'Burned Drop',
    location: 'Budapest',
    date: 'October 11, 1977',
    setup: `VOLKOV was followed from Vienna. The dead drop site is compromised. KGB surveillance has bracketed the underpass. VOLKOV is holed up in a nearby apartment, terrified, with the schematics still on his person.`,
    choices: [
      {
        text: 'Extract VOLKOV immediately with whatever intel he has on him',
        outcome: {
          tier: 'burned',
          text: 'The extraction is chaotic. VOLKOV loses his nerve crossing the street and you have to physically move him. You get out with partial schematics, but the KGB team gets a look at your face.',
          effects: { heat: 15, funds: -50000 },
          next: 's3',
        },
      },
      {
        text: 'GHOST creates a diversion while CIPHER slips in and pulls the intel',
        outcome: {
          tier: 'messy',
          text: 'GHOST stages a traffic accident three blocks away. The surveillance teams break off to investigate. CIPHER has eight minutes. He gets out with most of the schematics intact.',
          effects: { heat: 8, funds: -20000 },
          next: 's3',
        },
      },
    ],
  },

  s3: {
    id: 's3',
    title: 'The Mole',
    location: 'Salzburg',
    date: 'October 19, 1977',
    setup: `The Salzburg safe house has been leaked. You arrived to find fresh cigarette ash that doesn\'t match any of your people, and a neighbor reports a man in a grey coat asking questions about the tenants. Three people knew this address: your deputy REED, logistics handler MARTA, and communications tech BURKHOLZ.`,
    choices: [
      {
        text: 'Feed each suspect different false intel and wait to see what surfaces',
        outcome: {
          tier: 'clean',
          text: 'Within 72 hours, Moscow Centre issues a signal that matches the legend you fed to BURKHOLZ. The mole is identified and quietly removed from the network. The operation continues.',
          effects: { heat: -5, funds: -20000 },
          next: 'a1',
        },
      },
      {
        text: 'Bring REED in for direct questioning — he\'s the most senior and most damaging',
        outcome: {
          tier: 'messy',
          text: 'REED is clean — and furious. He cooperates but the interrogation strains your internal trust. MARTA goes quiet for three days before you can re-establish contact.',
          effects: { heat: 5, funds: 0 },
          next: 'b1',
        },
      },
      {
        text: 'Purge all three — burn the compartment and rebuild',
        outcome: {
          tier: 'burned',
          text: 'Brutal but effective. Two of the three were innocent. Word spreads through the network that you are willing to sacrifice assets on suspicion alone. Morale drops, but the leak is stopped.',
          effects: { heat: 10, funds: -30000 },
          next: 'a1',
        },
      },
      {
        text: 'Ignore the leak and accelerate the timeline before the KGB can act',
        outcome: {
          tier: 'burned',
          text: 'You race the clock. The mole files another report. KGB assets in Austria go on heightened alert. You\'re moving faster now, but into a tighter net.',
          effects: { heat: 20, funds: 0 },
          next: 'b1',
        },
      },
    ],
  },

  a1: {
    id: 'a1',
    title: 'Embassy Sabotage',
    location: 'Prague',
    date: 'October 25, 1977',
    setup: `The Soviet embassy in Prague serves as the primary communications hub for KGB operations in Central Europe. Cutting it — even for 48 hours — would blind VOLKOV\'s handlers and buy the extraction team critical time. The building is heavily guarded, but the communications annex has a single point of failure.`,
    choices: [
      {
        text: 'Bribe the overnight guard and have NIGHTHAWK plant a signal device',
        outcome: {
          tier: 'clean',
          text: 'The guard takes the money without hesitation — he has been quietly for sale for months. NIGHTHAWK plants the device in under four minutes. The KGB goes dark on schedule.',
          effects: { heat: 5, funds: -80000 },
          next: 'a2',
        },
      },
      {
        text: 'Plant the device without paying — NIGHTHAWK can take the guard down silently',
        outcome: {
          tier: 'messy',
          text: 'NIGHTHAWK gets in and out, but the guard — though incapacitated — is found sooner than expected. Czech security investigators treat it as an inside job, putting embassy staff under internal scrutiny and generating noise.',
          effects: { heat: 15, funds: -10000 },
          next: 'a2',
        },
      },
      {
        text: 'Strike the external relay station instead — cleaner, more deniable',
        outcome: {
          tier: 'burned',
          text: 'The relay station is hit, but the disruption only lasts 12 hours before Soviet technicians reroute. The attack is attributed to Western intelligence almost immediately.',
          effects: { heat: 20, funds: -40000 },
          next: 'a2',
        },
      },
    ],
  },

  a2: {
    id: 'a2',
    title: 'The Black Market',
    location: 'West Berlin',
    date: 'November 1, 1977',
    setup: `VOLKOV needs a new identity to cross the border. West Berlin forger KESSLER has the best papers in the trade — Hungarian interior ministry stamps, vehicle registry, work permits. He also has access to a nondescript Trabant that won\'t raise questions at the crossing. Kessler does not give discounts.`,
    choices: [
      {
        text: 'Pay Kessler\'s full asking price — clean transaction, no leverage',
        outcome: {
          tier: 'clean',
          text: 'Kessler delivers impeccable documents within 36 hours. The Trabant smells of diesel and old newspapers. The papers would fool a senior consular official.',
          effects: { heat: 0, funds: -150000 },
          next: 'a3',
        },
      },
      {
        text: 'Negotiate — offer Kessler future consideration and a reduced fee',
        outcome: {
          tier: 'messy',
          text: 'Kessler agrees, but he makes notes. The relationship creates a future liability. The papers are good — but Kessler now knows more about your operation than is comfortable.',
          effects: { heat: 10, funds: -60000 },
          next: 'a3',
        },
      },
      {
        text: 'Steal a vehicle from the Soviet motor pool and use existing forgery stock',
        outcome: {
          tier: 'burned',
          text: 'The theft is reported within hours. Soviet vehicles crossing the border are now being flagged. You have a car and papers, but crossing in them has become significantly more dangerous.',
          effects: { heat: 18, funds: -20000 },
          next: 'a3',
        },
      },
    ],
  },

  a3: {
    id: 'a3',
    title: 'The Assassin',
    location: 'Vienna',
    date: 'November 8, 1977',
    setup: `KGB wet-work specialist SABLE has arrived in Vienna with a photograph of VOLKOV and a 24-hour window before she returns her report. She is good — former Alpha Group, two known terminations in Western Europe. If she finds VOLKOV, the operation ends violently.`,
    choices: [
      {
        text: 'GHOST neutralizes SABLE before she can locate VOLKOV',
        outcome: {
          tier: 'burned',
          text: 'GHOST finds SABLE and the confrontation is not clean. SABLE is removed from the board, but GHOST takes a blade across the shoulder. He will recover, but he is out of the field for now. The KGB will know one of their best is missing.',
          effects: { heat: 20, funds: 0, agentStatus: { GHOST: 'injured' } },
          next: 'a4',
        },
      },
      {
        text: 'Move VOLKOV to an empty safe house that isn\'t in any file SABLE could access',
        outcome: {
          tier: 'messy',
          text: 'VOLKOV is moved in the middle of the night, complaining bitterly. SABLE sweeps the last known location and finds nothing. She files an inconclusive report and departs. A costly delay.',
          effects: { heat: 8, funds: -40000 },
          next: 'a4',
        },
      },
      {
        text: 'Feed SABLE a false lead placing VOLKOV in Frankfurt',
        outcome: {
          tier: 'clean',
          text: 'A fabricated sighting draws SABLE out of Vienna entirely. She is thorough — she will be in Frankfurt for days before she admits the trail is cold. Clean, elegant, and effective.',
          effects: { heat: 5, funds: -50000 },
          next: 'a4',
        },
      },
    ],
  },

  a4: {
    id: 'a4',
    title: 'Extraction Run',
    location: 'Austrian-Hungarian Border',
    date: 'November 15, 1977',
    setup: `The moment has arrived. VOLKOV is in the Trabant with NIGHTHAWK driving. The border crossing at Nickelsdorf is 40 kilometers away. KGB border liaison units have been seen at two checkpoints. The papers are in order — or as in order as they can be.`,
    choices: [
      {
        text: 'Cross with the full team — maximum confidence, no deviations',
        outcome: {
          tier: 'clean',
          text: 'The crossing is tense but routine. The guard examines the papers, looks at VOLKOV\'s face, and waves the car through. VOLKOV exhales for the first time in three weeks.',
          effects: { heat: 10, funds: -30000 },
          next: 'end1',
        },
      },
      {
        text: 'Cross at night during the lowest-staffing window',
        outcome: {
          tier: 'messy',
          text: 'The night crossing draws a different guard — more alert, less corruptible. He calls a supervisor. A tense 20 minutes on the shoulder of the road before the papers hold and you are waved through.',
          effects: { heat: 15, funds: -15000 },
          next: 'end1',
        },
      },
      {
        text: 'Create a diversion two checkpoints north and cross during the confusion',
        outcome: {
          tier: 'clean',
          text: 'The diversion works perfectly. Staff are pulled north. The primary crossing is down to one guard who is more interested in his thermos than the papers.',
          effects: { heat: 5, funds: -80000 },
          next: 'end1',
        },
      },
    ],
  },

  b1: {
    id: 'b1',
    title: 'The Courier',
    location: 'Vienna',
    date: 'October 25, 1977',
    setup: `Soviet diplomatic courier ILYICH has a 40-minute unsupervised window every Tuesday when he leaves his diplomatic pouch in the embassy anteroom and takes lunch at a nearby restaurant. The pouch almost certainly contains operational signals relevant to VOLKOV\'s handlers. This is a narrow, repeatable opportunity.`,
    choices: [
      {
        text: 'Have CIPHER photograph the contents during the window',
        outcome: {
          tier: 'clean',
          text: 'CIPHER moves through the anteroom in under seven minutes. The photographs are crisp. The signals reveal that VOLKOV\'s handler GENNADY is scheduled to visit Vienna in two weeks — giving you a fixed deadline.',
          effects: { heat: 5, funds: -30000 },
          next: 'b2',
        },
      },
      {
        text: 'Replace one document with a forgery to misdirect VOLKOV\'s handlers',
        outcome: {
          tier: 'messy',
          text: 'CIPHER swaps the document cleanly, but ILYICH notices the pouch seal is slightly different when he returns. He reports the anomaly. A low-level investigation begins — nothing conclusive, but KGB counterintelligence is now curious.',
          effects: { heat: 12, funds: -60000 },
          next: 'b2',
        },
      },
    ],
  },

  b2: {
    id: 'b2',
    title: 'The Double',
    location: 'Budapest',
    date: 'November 1, 1977',
    setup: `KGB officer PETROV runs Hungarian counterintelligence liaison out of the Budapest residency. He also has a gambling problem — 80,000 forints in debt to the wrong people. More importantly, PETROV has access to all KGB tracking files on VOLKOV. Turning him would give you eyes inside the operation hunting you.`,
    choices: [
      {
        text: 'Approach PETROV through his daughter, who studies in Vienna',
        outcome: {
          tier: 'clean',
          text: 'CIPHER makes a gentle approach through the daughter, framed as concern for the family\'s welfare. PETROV meets you two days later at a park bench. He is frightened but willing. The approach feels organic.',
          effects: { heat: 5, funds: -80000 },
          next: 'b3',
        },
      },
      {
        text: 'Make direct financial contact with PETROV at his apartment',
        outcome: {
          tier: 'messy',
          text: 'PETROV opens the door and sees the envelope. He lets you in. He is cooperative but shaken by the directness of the approach. He insists on a dead drop arrangement going forward, adding friction to the relationship.',
          effects: { heat: 15, funds: -120000 },
          next: 'b3',
        },
      },
      {
        text: 'Approach with hard blackmail — you have documentation of his debts',
        outcome: {
          tier: 'burned',
          text: 'PETROV cooperates under duress, but he immediately begins building a paper trail to protect himself. He files a partial report with KGB internal security — incomplete, but enough to raise flags.',
          effects: { heat: 18, funds: -20000 },
          next: 'b3_hard',
        },
      },
    ],
  },

  b3: {
    id: 'b3',
    title: "The General's Wife",
    location: 'Salzburg',
    date: 'November 8, 1977',
    setup: `PETROV\'s intelligence reveals that General Morozov\'s wife ELENA is in Salzburg for a music festival — an unofficial visit, not on any diplomatic register. Morozov coordinates KGB strategic operations in Central Europe. ELENA is known to be unhappy with her life in Moscow and has expressed sympathy for Western culture through back channels. She is an opportunity.`,
    choices: [
      {
        text: "Have CIPHER approach Elena carefully — cultural discussion, nothing operational",
        outcome: {
          tier: 'clean',
          text: 'CIPHER and ELENA spend an afternoon at a concert. She speaks freely about her frustrations. By the end, she is asking the right questions herself. No commitment yet — but a door has opened.',
          effects: { heat: -5, funds: -30000 },
          next: 'b4',
        },
      },
      {
        text: "Use Elena to feed false VOLKOV sightings back to Morozov's network",
        outcome: {
          tier: 'clean',
          text: 'ELENA, believing she is helping a humanitarian cause, passes carefully crafted misinformation. Morozov reorients KGB search teams toward Munich and Stuttgart. VOLKOV\'s actual location remains cold.',
          effects: { heat: -8, funds: -50000 },
          next: 'b4',
        },
      },
      {
        text: "Offer Elena asylum — she could be the most valuable asset in the network",
        outcome: {
          tier: 'messy',
          text: 'ELENA is stunned by the offer. She does not refuse. But she insists on 72 hours to consider — and those 72 hours create exposure. Her handler in Moscow notices she hasn\'t checked in.',
          effects: { heat: 12, funds: -20000 },
          next: 'b4',
        },
      },
    ],
  },

  b3_hard: {
    id: 'b3_hard',
    title: 'Blown Double',
    location: 'Budapest',
    date: 'November 8, 1977',
    setup: `PETROV has filed a partial internal report. KGB counterintelligence is reviewing his recent movements and contacts. He has gone silent — no responses to dead drop signals. Either he has been pulled in for questioning, or he is waiting to see which way the wind blows.`,
    choices: [
      {
        text: 'Extract PETROV as an emergency defector before KGB pulls him in',
        outcome: {
          tier: 'burned',
          text: 'The extraction is rushed and expensive. PETROV arrives in Vienna looking like a man who hasn\'t slept in a week. His intelligence value is high, but the KGB now knows an officer has defected and begins a full compartment review.',
          effects: { heat: 18, funds: -100000 },
          next: 'b4',
        },
      },
      {
        text: 'Cut PETROV loose — deny all contact and let him face the consequences',
        outcome: {
          tier: 'burned',
          text: 'PETROV is arrested within 48 hours. Under interrogation he confirms Western contact but cannot provide identities. The KGB tightens security across all Central European operations. The net closes.',
          effects: { heat: 25, funds: 0 },
          next: 'b4',
        },
      },
    ],
  },

  b4: {
    id: 'b4',
    title: 'The Handoff',
    location: 'Geneva',
    date: 'November 15, 1977',
    setup: `Langley has been watching your operation with interest. The CIA\'s Deputy Director for Operations has sent word: they want to absorb VOLKOV and the schematics into a joint program. Cooperating means resources and protection. Refusing means standing alone against the full weight of the KGB. The terms of the handoff, however, are yours to set.`,
    choices: [
      {
        text: 'Accept a neutral public handoff at the UN offices — clean and witnessed',
        outcome: {
          tier: 'clean',
          text: 'The transfer happens in a third-floor conference room with a UN legal observer present. VOLKOV is formally received by CIA handlers. The schematics are officially logged. Clean, professional, and binding.',
          effects: { heat: 3, funds: -20000 },
          next: 'end1',
        },
      },
      {
        text: 'Insist on a private handoff — your terms, your timeline, your safeguards',
        outcome: {
          tier: 'messy',
          text: 'The CIA pushes back on the private terms. Negotiations take two extra days — two days of exposure. The final arrangement is workable, but Langley is now watching your methods more carefully.',
          effects: { heat: 8, funds: -40000 },
          next: 'end1',
        },
      },
    ],
  },

  end1: {
    id: 'end1',
    title: 'The Reckoning',
    location: 'Vienna Station',
    date: 'November 22, 1977',
    setup: `VOLKOV is out. The schematics are moving through analysis channels. But KGB counterintelligence has filed an urgent assessment: a high-value asset was exfiltrated through Central Europe in the past six weeks. They don\'t have names — but they\'re pulling threads. Your cover identities and safe house network are at risk.`,
    choices: [
      {
        text: 'Burn all cover identities and scatter the network — accept the loss, protect the people',
        outcome: {
          tier: 'messy',
          text: 'Costly and disruptive — years of infrastructure gone. But the KGB finds nothing but ash. Your people scatter to backup legends and disappear from the board. The operation survives, even if the network does not.',
          effects: { heat: -20, funds: -60000 },
          next: 'end2',
        },
      },
      {
        text: 'Feed the KGB a false lead pointing their investigation to Warsaw',
        outcome: {
          tier: 'clean',
          text: 'A carefully crafted deception operation redirects KGB counterintelligence toward a nonexistent network in Warsaw. They will be busy there for weeks. Your people remain in place, identities intact.',
          effects: { heat: -10, funds: -80000 },
          next: 'end2',
        },
      },
      {
        text: 'Stay dark and wait — go silent, make no moves, let the investigation exhaust itself',
        outcome: {
          tier: 'burned',
          text: 'You go quiet. The KGB investigation doesn\'t exhaust itself — it deepens. Two of your safe houses are flagged by routine surveillance. The threads are fraying but haven\'t broken yet.',
          effects: { heat: 10, funds: -20000 },
          next: 'end2',
        },
      },
    ],
  },

  end2: {
    id: 'end2',
    title: 'Final Crossing',
    location: 'Classified',
    date: 'November 29, 1977',
    setup: `NIGHTHAWK, CIPHER, and GHOST all need extraction. Their covers have been run hard for two months. Each has a prepared exit legend and a route. All three exits need to execute within a 6-hour window to prevent the KGB from correlating the departures. You have one chance to call it.`,
    choices: [
      {
        text: 'Execute the exit plan — all agents, all routes, simultaneously',
        outcome: {
          tier: 'clean',
          text: 'The exits run clean. NIGHTHAWK crosses at Frankfurt airport on a Canadian journalist legend. CIPHER boards a train to Zurich as a West German academic. GHOST drives across the Dutch border in a refrigerator truck. By midnight, all three are clear.',
          effects: { heat: 0, funds: 0 },
          next: 'WIN',
        },
      },
    ],
  },

  // ── Operation Cold Front — Korea 1982 ──────────────────

  k1: {
    id: 'k1',
    title: 'The Lotus Signal',
    location: 'Seoul',
    date: 'April 2, 1982',
    setup: `ARAKAWA Kenji, a Japanese trade attaché based in Seoul, has passed word through a cutout: a DPRK weapons engineer designated LOTUS claims North Korea is developing a functional nuclear trigger mechanism using Soviet-supplied centrifuge technology. He wants to defect — and he will only cross during the May armistice commission session at Panmunjom. You have six weeks to prepare.`,
    choices: [
      {
        text: 'Send CIPHER to assess ARAKAWA — verify his credibility before committing resources',
        outcome: {
          tier: 'clean',
          text: 'CIPHER meets ARAKAWA at a hotel bar in Itaewon. The attaché is cautious but specific. His account is consistent under questioning and the technical details he relays from LOTUS track with known DPRK procurement patterns. The source is credible.',
          effects: { heat: 5, funds: -20000 },
          next: 'k2',
        },
      },
      {
        text: 'Meet ARAKAWA yourself — faster, and the conversation will go deeper',
        outcome: {
          tier: 'messy',
          text: 'ARAKAWA is responsive and the intelligence is solid. But a DPRK trade mission is in Seoul this week and one of their security staff is photographing foreigners near the hotel. You may have been captured on film.',
          effects: { heat: 12, funds: -5000 },
          next: 'k2',
        },
      },
      {
        text: 'Demand a proof-of-life signal from LOTUS directly before any movement',
        outcome: {
          tier: 'clean',
          text: 'LOTUS passes a fragment of a procurement manifest through ARAKAWA — Soviet centrifuge components requisitioned under a State Council cover designation. The document is genuine. Your window is confirmed.',
          effects: { heat: 3, funds: -15000 },
          next: 'k2',
        },
      },
      {
        text: 'Stand ARAKAWA down — the source chain is too long, wait for a cleaner entry point',
        outcome: {
          tier: 'burned',
          text: 'You decline the approach. ARAKAWA delivers the news to LOTUS, who panics. He attempts to establish contact through an unofficial back-channel — a letter to a distant relative in Seoul. The chain is now unverified and potentially compromised.',
          effects: { heat: -3, funds: 0 },
          next: 'k2_hard',
        },
      },
    ],
  },

  k2: {
    id: 'k2',
    title: 'The Document',
    location: 'Panmunjom / Seoul',
    date: 'April 9, 1982',
    setup: `LOTUS has smuggled a fragment of the centrifuge procurement file through the armistice mail system — a materials requisition bearing a DPRK State Council designation. The document is sitting in a UN Command diplomatic bag in the JSA administrative building. Extracting it without alerting South Korean monitors or DPRK observation posts requires careful handling.`,
    choices: [
      {
        text: 'NIGHTHAWK coordinates with a US Army liaison officer to retrieve the bag informally',
        outcome: {
          tier: 'clean',
          text: "NIGHTHAWK calls in a favour with a signals officer at Camp Bonifas. The bag is examined in a back office and the relevant pages photographed. The document is genuine — reactor-grade enrichment specifications. LOTUS knows exactly what he's carrying.",
          effects: { heat: 5, funds: -30000 },
          next: 'k3',
        },
      },
      {
        text: 'GHOST creates a distraction at the JSA perimeter while CIPHER photographs the document in place',
        outcome: {
          tier: 'messy',
          text: 'The distraction works but runs long. CIPHER gets the photographs but a UN Command administrative officer notices the bag has been moved. He files an internal report. Nothing conclusive — but someone in the JSA bureaucracy is now paying attention.',
          effects: { heat: 12, funds: -15000 },
          next: 'k3',
        },
      },
    ],
  },

  k2_hard: {
    id: 'k2_hard',
    title: 'Cold Channel',
    location: 'Seoul',
    date: 'April 9, 1982',
    setup: `Standing down ARAKAWA has produced exactly the problem you anticipated. LOTUS, panicking, has attempted contact through an unofficial chain — a message embedded in a cultural exchange letter forwarded by a Seoul-based ethnic Korean academic with ties to the North. The chain is three people long and completely unverified. It could be LOTUS. It could be a Bowibu provocation.`,
    choices: [
      {
        text: 'Activate the chain — reach LOTUS through this route and assess him directly',
        outcome: {
          tier: 'burned',
          text: 'Contact is established. LOTUS is genuine — but two of the three people in the chain have now seen enough to become liabilities. One of them is already on a DIC watch list for separate reasons. The operation begins under unnecessary exposure.',
          effects: { heat: 15, funds: -25000 },
          next: 'k3',
        },
      },
      {
        text: 'Reactivate ARAKAWA on your terms — rebuild the original channel with new protocols',
        outcome: {
          tier: 'messy',
          text: 'ARAKAWA agrees to re-engage but is clearly shaken by the earlier stand-down. He insists on additional cutouts and a longer communication timeline. The delay costs you a week and the added friction makes every subsequent message slower to confirm.',
          effects: { heat: 8, funds: -35000 },
          next: 'k3',
        },
      },
    ],
  },

  k3: {
    id: 'k3',
    title: 'The KCIA Problem',
    location: 'Seoul',
    date: 'April 15, 1982',
    setup: `South Korean Defense Intelligence Command Colonel BAEK has noticed unusual signals traffic originating near the JSA and has formally requested a liaison meeting with the US military command, citing unauthorized foreign intelligence activity in his jurisdiction. BAEK is methodical, well-connected, and not a man who accepts vague reassurances. He will keep asking until he gets answers.`,
    choices: [
      {
        text: 'Brief BAEK on a strictly compartmented basis — give him just enough to buy his cooperation',
        outcome: {
          tier: 'messy',
          text: 'BAEK accepts the partial briefing but is clearly dissatisfied. He assigns a DIC officer to monitor JSA movement independently. The officer is not hostile, but he is watching — and anything irregular will reach BAEK the same day it happens.',
          effects: { heat: -3, funds: -50000 },
          next: 'k4',
        },
      },
      {
        text: 'Deny everything and route around BAEK through US military channels',
        outcome: {
          tier: 'burned',
          text: 'BAEK escalates. He contacts the CIA station chief directly and threatens to file a formal diplomatic complaint. The station chief quietly reads you in on the problem: BAEK now knows someone is lying to him, and he has resources to find out who.',
          effects: { heat: 15, funds: -10000 },
          next: 'k4',
        },
      },
      {
        text: 'Bring BAEK fully into the operation — his KCIA access and local networks are an asset',
        outcome: {
          tier: 'clean',
          text: 'BAEK is sharper than expected and immediately useful. He has an existing asset network in the JSA administrative structure and — more importantly — intelligence on Bowibu surveillance patterns along the MDL that no Western agency has access to.',
          effects: { heat: -8, funds: -40000 },
          next: 'k4b',
        },
      },
      {
        text: 'Feed BAEK a plausible decoy — let him monitor a false operation while you run the real one',
        outcome: {
          tier: 'burned',
          text: 'The decoy holds for ten days before BAEK identifies the inconsistencies. He does not confront you directly — he simply goes silent and begins running his own parallel inquiry. You now have an unknown quantity operating in your operational space.',
          effects: { heat: 10, funds: -30000 },
          next: 'k4',
        },
      },
    ],
  },

  k4: {
    id: 'k4',
    title: 'The Soviet Thread',
    location: 'Seoul',
    date: 'April 23, 1982',
    setup: `NSA SIGINT intercepts indicate the GRU has quietly recalled its senior technical advisors from Pyongyang for consultations. Soviet signals traffic shows awareness of a leak within the DPRK scientific directorate — not LOTUS by name, but the category of breach is described accurately. Bowibu may act before the May session if they narrow the field. The window could close early.`,
    choices: [
      {
        text: 'Accelerate — push LOTUS to cross at the earliest possible armistice session before Bowibu moves',
        outcome: {
          tier: 'burned',
          text: 'You push the timeline forward two weeks. LOTUS is not ready and the preparation is incomplete. He crosses early but without the full documentation package — only partial schematics. The intelligence value is real but reduced, and the rushed movement leaves traces.',
          effects: { heat: 20, funds: -50000 },
          next: 'k5',
        },
      },
      {
        text: 'Establish a secondary extraction route via the Yellow Sea as insurance if the JSA window closes',
        outcome: {
          tier: 'messy',
          text: 'NIGHTHAWK makes contact with a South Korean fishing cooperative operating near the NLL. The route is viable but expensive and requires LOTUS to travel overland to the Wonsan coast — a significant additional risk that he is not comfortable with.',
          effects: { heat: 10, funds: -80000 },
          next: 'k5',
        },
      },
      {
        text: 'Have GHOST intercept a GRU courier and plant disinformation pointing suspicion at a different DPRK scientist',
        outcome: {
          tier: 'clean',
          text: "GHOST lifts a document from a GRU liaison officer's case during a transit stopover in Tokyo and inserts a fabricated internal security flag against a senior DPRK metallurgist in Hamhung. Moscow's suspicion redirects north. LOTUS drops off the internal watchlist.",
          effects: { heat: 5, funds: -60000 },
          next: 'k5',
        },
      },
    ],
  },

  k4b: {
    id: 'k4b',
    title: 'The Korean Asset',
    location: 'Seoul',
    date: 'April 23, 1982',
    setup: `BAEK has delivered more than expected. Through a long-running KCIA penetration of the DPRK military liaison structure, he has access to Captain SHIN — a DPRK People's Army officer assigned to the armistice commission who has been quietly disillusioned for three years. SHIN can personally escort LOTUS to the commission building during the session, providing cover that Bowibu would have no reason to question.`,
    choices: [
      {
        text: "Accept KCIA's operational lead — SHIN escorts LOTUS, BAEK coordinates the crossing phase",
        outcome: {
          tier: 'clean',
          text: "SHIN's involvement is precisely calibrated. He meets LOTUS at the DPRK delegation building and walks him to the commission chamber under the guise of a document delivery. BAEK's team provides overwatch on the Southern side. The choreography is clean.",
          effects: { heat: 5, funds: -70000 },
          next: 'k5',
        },
      },
      {
        text: "Take BAEK's intelligence on Bowibu surveillance positions but run the crossing independently",
        outcome: {
          tier: 'messy',
          text: "BAEK provides the surveillance map reluctantly. Without SHIN's cover, LOTUS must navigate the commission building on his own recognisance. The map helps — two Bowibu watchers are avoided — but the crossing is more exposed than it needed to be.",
          effects: { heat: 12, funds: -40000 },
          next: 'k5',
        },
      },
    ],
  },

  k5: {
    id: 'k5',
    title: 'Panmunjom',
    location: 'Joint Security Area',
    date: 'May 4, 1982',
    setup: `The armistice commission session begins in two hours. LOTUS is in the DPRK delegation building with the documentation concealed in a false-bottomed document case. The plan: during the lunch recess, he walks to the commission chamber on a pretext and steps across the Military Demarcation Line. Three complications have emerged since morning — a DPRK guard has changed his patrol route without notice, a Soviet military observer will be present throughout the session, and Bowibu Director RYOM has arrived in Pyongyang unannounced.`,
    choices: [
      {
        text: 'Execute as planned — LOTUS crosses during the lunch recess',
        outcome: {
          tier: 'messy',
          text: 'The crossing happens. The changed patrol route forces LOTUS to wait eight minutes longer than planned in a corridor where he is visible. He makes it across, documents intact, but the Soviet observer clocks the movement and files a note. Bowibu will know within the week.',
          effects: { heat: 15, funds: -20000 },
          next: 'kend',
        },
      },
      {
        text: 'NIGHTHAWK coordinates a brief administrative hold on the session to give LOTUS more time',
        outcome: {
          tier: 'clean',
          text: 'A procedural dispute over the session transcript — triggered by NIGHTHAWK through a sympathetic UN Command staff officer — delays the afternoon session by 22 minutes. The changed patrol route is no longer a problem. LOTUS crosses cleanly during the extended recess.',
          effects: { heat: 8, funds: -35000 },
          next: 'kend',
        },
      },
      {
        text: 'Abort the JSA crossing — RYOM\'s arrival changes the calculation, pull back to the Yellow Sea route',
        outcome: {
          tier: 'burned',
          text: "LOTUS is pulled out of the delegation building on a fabricated medical pretext. The Yellow Sea route is activated but LOTUS must travel overland to the coast — a 14-hour window during which he is entirely on his own. He makes it to the fishing vessel, but the overland movement is captured on a Bowibu checkpoint log that won't be reviewed until tomorrow.",
          effects: { heat: 25, funds: -120000 },
          next: 'kend',
        },
      },
    ],
  },

  kend: {
    id: 'kend',
    title: 'Debrief',
    location: 'Osan Air Base',
    date: 'May 5, 1982',
    setup: `LOTUS is out. He is currently in a secure room at Osan Air Base, working through his documentation with two NSA analysts. Initial assessment: North Korea is further from an operational device than feared — 36 to 48 months, not 18. But the Soviet advisory relationship is deeper and more technically specific than any Western agency understood. The intelligence is significant. Now your team needs to disappear before Bowibu assets, already operating in Seoul under diplomatic cover, identify them.`,
    choices: [
      {
        text: 'Standard exfil — all three agents depart via separate commercial routes on clean cover legends',
        outcome: {
          tier: 'clean',
          text: 'NIGHTHAWK flies Seoul to Tokyo on a Canadian business legend, then Vancouver. CIPHER takes the train to Busan and boards a container ship to Yokohama. GHOST departs through Gimpo on a West German press credential. By the following evening, all three are beyond reach. The operation is closed.',
          effects: { heat: 0, funds: -40000 },
          next: 'WIN',
        },
      },
    ],
  },
}
