import { faCrown, faTrophy, faMedal} from "@fortawesome/free-solid-svg-icons"

export const memberships = [
    {
        id: 'brilliant',
        name: 'Brilliant',
        price: 199,
        description: 'Ubegrænset bilvask',
        icon: faCrown,
        features: [
            'Ubegrænset antal vaske',
            'Fri adgang til alle vaskehaller',
            'Ingen binding',
        ],
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 149,
        description: 'Halv pris på alle vaske',
        icon: faTrophy,
        features: [
            '50% rabat på alle vaske',
            'Fri adgang til alle vaskehaller',
            'Ingen binding',
        ],
    },
    {
        id: 'gold',
        name: 'Gold',
        price: 99,
        description: 'Tre gratis vaske om måneden',
        icon: faMedal,
        features: [
            '3 gratis vaske om måneden',
            'Fri adgang til alle vaskehaller',
            'Ingen binding',
        ],
    },
]