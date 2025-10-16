// ShineChain Card Collection System
// Card Database with metadata and abilities

const CARD_DATABASE = [
    {
        id: 'card_001',
        name: 'Museum Navigator',
        rarity: 'common',
        type: 'explorer',
        power: 3,
        defense: 2,
        ability: 'Reveal hidden paths in the museum',
        description: 'A guide through the ShineChain Museum archives',
        image: 'assets/images/Screenshot_20251005-033511.png',
        lore: 'The keeper of the Ninja Dashboard holds the keys to forgotten realms.'
    },
    {
        id: 'card_002',
        name: 'Object Launcher',
        rarity: 'rare',
        type: 'tech',
        power: 5,
        defense: 3,
        ability: 'Launch objects with velocity control',
        description: 'Master of kinetic energy and momentum',
        image: 'assets/images/Screenshot_20251005-034518.png',
        lore: 'Double tap to charge, swipe to unleash the power of motion.'
    },
    {
        id: 'card_003',
        name: 'Realm Transformer',
        rarity: 'epic',
        type: 'magic',
        power: 7,
        defense: 4,
        ability: 'Transform between past and future states',
        description: 'Bridges timelines and dimensions',
        image: 'assets/images/Screenshot_20251005-034520.png',
        lore: 'Where the Sunshine Kids once played, now echoes with transformation.'
    },
    {
        id: 'card_004',
        name: 'Mainframe Architect',
        rarity: 'legendary',
        type: 'builder',
        power: 8,
        defense: 6,
        ability: 'Deploy and maintain the ShineChain infrastructure',
        description: 'Guardian of the GitHub Pages realm',
        image: 'assets/images/Screenshot_20251013-044237.png',
        lore: 'The one who builds bridges between code and reality.'
    },
    {
        id: 'card_005',
        name: 'Deployment Sentinel',
        rarity: 'rare',
        type: 'guardian',
        power: 6,
        defense: 7,
        ability: 'Monitor and protect deployment workflows',
        description: 'Watches over the Ever-Deploy Protocol',
        image: 'assets/images/Screenshot_20251013-062036.png',
        lore: 'When workflows fail, the Sentinel rises to restore order.'
    },
    {
        id: 'card_006',
        name: 'Error Handler',
        rarity: 'uncommon',
        type: 'support',
        power: 4,
        defense: 5,
        ability: 'Convert failures into learning opportunities',
        description: 'Transforms chaos into clarity',
        image: 'assets/images/Screenshot_20251013-062044.png',
        lore: 'In the face of failure, wisdom emerges from the ashes.'
    },
    {
        id: 'card_007',
        name: 'Code Weaver',
        rarity: 'epic',
        type: 'creator',
        power: 7,
        defense: 5,
        ability: 'Weave complex systems from simple threads',
        description: 'Master of the GitHub repository',
        image: 'assets/images/Screenshot_20251013-062056.png',
        lore: 'Every commit tells a story, every merge creates a new chapter.'
    }
];

// Card rarity colors and glow effects
const RARITY_STYLES = {
    common: {
        border: '#9CA3AF',
        glow: 'rgba(156, 163, 175, 0.5)',
        background: 'linear-gradient(135deg, #374151 0%, #1F2937 100%)'
    },
    uncommon: {
        border: '#10B981',
        glow: 'rgba(16, 185, 129, 0.6)',
        background: 'linear-gradient(135deg, #065F46 0%, #064E3B 100%)'
    },
    rare: {
        border: '#3B82F6',
        glow: 'rgba(59, 130, 246, 0.7)',
        background: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)'
    },
    epic: {
        border: '#A855F7',
        glow: 'rgba(168, 85, 247, 0.8)',
        background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)'
    },
    legendary: {
        border: '#F59E0B',
        glow: 'rgba(245, 158, 11, 0.9)',
        background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CARD_DATABASE, RARITY_STYLES };
}