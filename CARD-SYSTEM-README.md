# 🎴 ShineChain Card Collection System

## Overview

The ShineChain Card Collection System is an immersive easter egg feature that encourages exploration throughout the website. Players discover hidden collectible cards as they navigate different pages and spaces, building a deck to use in the Battle Arena.

## Features

### 1. Card Collection Mechanics
- **7 Unique Cards**: Each with distinct artwork, stats, and abilities
- **Rarity System**: Common, Uncommon, Rare, Epic, and Legendary cards
- **Persistent Storage**: Cards are saved in browser localStorage
- **First-Time Tutorial**: Automatic banner explaining the system on first card pickup

### 2. Card Database

| Card ID | Name | Rarity | Type | Power | Defense | Ability |
|---------|------|--------|------|-------|---------|---------|
| card_001 | Museum Navigator | Common | Explorer | 3 | 2 | Reveal hidden paths |
| card_002 | Object Launcher | Rare | Tech | 5 | 3 | Launch with velocity control |
| card_003 | Realm Transformer | Epic | Magic | 7 | 4 | Transform between timelines |
| card_004 | Mainframe Architect | Legendary | Builder | 8 | 6 | Deploy infrastructure |
| card_005 | Deployment Sentinel | Rare | Guardian | 6 | 7 | Monitor workflows |
| card_006 | Error Handler | Uncommon | Support | 4 | 5 | Convert failures to learning |
| card_007 | Code Weaver | Epic | Creator | 7 | 5 | Weave complex systems |

### 3. Card Locations

Cards are strategically hidden throughout the website:

- **Holodeck (index.html)**: 2 cards
  - Object Launcher (top-right area)
  - Deployment Sentinel (bottom-left area)

- **Launcher (launcher.html)**: 1 card
  - Realm Transformer (left side)

- **Echo Dome (echo-dome.html)**: 1 card
  - Code Weaver (bottom-right)

- **Library (library.html)**: 2 cards
  - Museum Navigator (upper-left)
  - Error Handler (lower-right)

- **Secret Room (secret-room.html)**: 2 cards
  - Mainframe Architect (top-right, spinning)
  - Code Weaver (bottom-left, bouncing)

### 4. Visual Design

Each card features:
- **Rarity-based color scheme**: Border and glow effects
- **Animated effects**: Float, pulse, spin, or bounce animations
- **Interactive hover**: Cards scale up and glow brighter on hover
- **Collection animation**: Dramatic spin and fade when collected

### 5. Battle Arena

Once cards are collected, players can:
- **View Collection**: Access full inventory with card details
- **Build Decks**: Use collected cards in strategic battles
- **Battle AI**: Fight against the Shadow AI opponent
- **Strategic Combat**: Use attack, defend, and special abilities
- **Energy System**: Manage resources each turn

## Technical Implementation

### Core Files

1. **card-data.js**: Card database and rarity styles
2. **card-system.js**: Collection management and UI
3. **card-placer.js**: Helper for placing cards on pages
4. **battle-arena.html**: Combat system

### Integration

To add cards to a new page:

```html
<!-- Add before closing body tag -->
<script src="assets/cards/card-data.js"></script>
<script src="assets/cards/card-system.js"></script>
<script src="assets/cards/card-placer.js"></script>

<script>
    window.addEventListener('load', () => {
        setTimeout(() => {
            cardPlacer.placeCard('card_001', {
                position: 'fixed',
                top: '20%',
                left: '15%',
                rotation: 10
            });
        }, 2000);
    });
</script>
```

### Card Placement Options

```javascript
cardPlacer.placeCard('card_id', {
    position: 'fixed',      // or 'absolute'
    top: '20%',            // CSS position
    left: '15%',
    rotation: 10,          // degrees
    opacity: 0.7,          // 0-1
    size: '60px',          // card size
    animation: 'float',    // float, pulse, spin, bounce
    zIndex: 100
});
```

### Quick Placement Methods

```javascript
// Place in corner
cardPlacer.placeInCorner('card_001', 'top-right');

// Place near element
cardPlacer.placeNearElement('card_002', '.my-element', { x: 20, y: 20 });

// Place randomly
cardPlacer.placeRandom('card_003', 1);
```

## User Experience

### Discovery Flow

1. **Exploration**: User navigates the website naturally
2. **Discovery**: Spots a glowing card icon
3. **Collection**: Clicks to collect the card
4. **Tutorial** (first time): Banner explains the system
5. **Notification**: Card acquired popup shows details
6. **Inventory**: Badge updates showing collection progress
7. **Battle**: Once enough cards collected, can battle in arena

### Progression System

- **Minimum 1 card**: Can enter Battle Arena
- **3+ cards**: Recommended for competitive battles
- **All 7 cards**: Complete collection achievement

## Design Philosophy

The card system is designed to:
- **Encourage Exploration**: Reward curiosity and thorough navigation
- **Non-Intrusive**: Cards are visible but don't block content
- **Progressive Discovery**: Natural learning curve
- **Replayability**: Battle system provides ongoing engagement
- **Lore Integration**: Each card ties to ShineChain narrative

## Future Enhancements

Potential additions:
- More cards tied to specific story elements
- Card trading system
- Multiplayer battles
- Card evolution/upgrades
- Achievement system
- Leaderboards
- Special event cards

## Accessibility

- Cards have hover states for visibility
- Click targets are appropriately sized
- Color-blind friendly rarity indicators
- Keyboard navigation support (future)
- Screen reader compatibility (future)

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- LocalStorage required for persistence
- JavaScript required for functionality
- Mobile responsive design

---

**Created by**: SuperNinja AI Agent
**Version**: 1.0
**Last Updated**: 2025-10-16