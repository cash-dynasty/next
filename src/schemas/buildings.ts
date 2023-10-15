export const buildings = [
  {
    id: 'medic_hq',
    name: 'Główna siedziba',
    maxLevel: 7,
    description: 'Główna siedziba firmy. Im wyższy poziom, tym więcej budynków możesz posiadać.',
    sector: 'MEDIC',
    requirements: {
      1: {
        upgradePrice: 300,
      },
      2: {
        upgradePrice: 10000,
        requiredBuildings: {
          medic_waitroom: 1,
          medic_registration: 1,
          medic_office: 1,
        },
      },
      3: {
        upgradePrice: 20000,
        requiredBuildings: {
          medic_waitroom: 2,
          medic_registration: 2,
          medic_office: 2,
        },
      },
      4: {
        upgradePrice: 30000,
        requiredBuildings: {
          medic_waitroom: 3,
          medic_registration: 3,
          medic_office: 3,
        },
      },
      5: {
        upgradePrice: 40000,
        requiredBuildings: {
          medic_waitroom: 4,
          medic_registration: 4,
          medic_office: 4,
        },
      },
    },
  },
  {
    id: 'medic_waitroom',
    name: 'Poczekalnia',
    maxLevel: 4,
    description: 'Poczekalnia. Pacjenci czekają na swoją kolej.',
    sector: 'MEDIC',
    requirements: {
      1: {
        upgradePrice: 200,
      },
      2: {
        upgradePrice: 10000,
        requiredBuildings: {
          medic_hq: 2,
        },
      },
      3: {
        upgradePrice: 20000,
        requiredBuildings: {
          medic_hq: 3,
        },
      },
      4: {
        upgradePrice: 30000,
        requiredBuildings: {
          medic_hq: 4,
        },
      },
    },
  },
  {
    id: 'medic_registration',
    name: 'Rejestracja',
    maxLevel: 12,
    description: 'Rejestracja. Pacjenci zgłaszają się tutaj.',
    sector: 'MEDIC',
    requirements: {
      1: {
        upgradePrice: 200,
      },
      2: {
        upgradePrice: 10000,
        requiredBuildings: {
          medic_hq: 2,
        },
      },
      3: {
        upgradePrice: 20000,
        requiredBuildings: {
          medic_hq: 3,
        },
      },
      4: {
        upgradePrice: 30000,
        requiredBuildings: {
          medic_hq: 4,
        },
      },
    },
  },
  {
    id: 'medic_office',
    name: 'Gabinet lekarski',
    maxLevel: 25,
    description: 'Gabinet lekarski. Tutaj lekarze przyjmują pacjentów.',
    sector: 'MEDIC',
    requirements: {
      1: {
        upgradePrice: 200,
      },
      2: {
        upgradePrice: 10000,
        requiredBuildings: {
          medic_hq: 2,
        },
      },
      3: {
        upgradePrice: 20000,
        requiredBuildings: {
          medic_hq: 3,
        },
      },
      4: {
        upgradePrice: 30000,
        requiredBuildings: {
          medic_hq: 4,
        },
      },
    },
  },
]
