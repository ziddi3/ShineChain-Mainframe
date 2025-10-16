// ShineChain Card Placer
// Helper to place collectible cards throughout the website

class CardPlacer {
    constructor() {
        this.placedCards = [];
    }

    /**
     * Place a card element on the page
     * @param {string} cardId - The card ID from CARD_DATABASE
     * @param {object} options - Placement options
     */
    placeCard(cardId, options = {}) {
        const defaults = {
            position: 'fixed', // or 'absolute'
            top: null,
            bottom: null,
            left: null,
            right: null,
            size: '60px',
            rotation: 0,
            opacity: 0.7,
            zIndex: 100,
            parent: document.body,
            animation: 'float'
        };

        const config = { ...defaults, ...options };
        
        // Check if card already collected
        if (window.cardSystem && window.cardSystem.hasCard(cardId)) {
            return; // Don't show collected cards
        }

        const card = CARD_DATABASE.find(c => c.id === cardId);
        if (!card) {
            console.error(`Card ${cardId} not found in database`);
            return;
        }

        const cardElement = document.createElement('div');
        cardElement.className = 'collectible-card';
        cardElement.dataset.cardId = cardId;
        
        // Build position styles
        let positionStyles = `position: ${config.position};`;
        if (config.top !== null) positionStyles += `top: ${config.top};`;
        if (config.bottom !== null) positionStyles += `bottom: ${config.bottom};`;
        if (config.left !== null) positionStyles += `left: ${config.left};`;
        if (config.right !== null) positionStyles += `right: ${config.right};`;

        cardElement.style.cssText = `
            ${positionStyles}
            width: ${config.size};
            height: ${config.size};
            background: ${RARITY_STYLES[card.rarity].background};
            border: 2px solid ${RARITY_STYLES[card.rarity].border};
            border-radius: 8px;
            cursor: pointer;
            z-index: ${config.zIndex};
            opacity: ${config.opacity};
            transform: rotate(${config.rotation}deg);
            transition: all 0.3s ease;
            box-shadow: 0 0 15px ${RARITY_STYLES[card.rarity].glow};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            animation: ${config.animation} 3s ease-in-out infinite;
        `;

        cardElement.innerHTML = '🎴';
        cardElement.title = 'Click to collect!';

        // Hover effect
        cardElement.addEventListener('mouseenter', () => {
            cardElement.style.opacity = '1';
            cardElement.style.transform = `rotate(${config.rotation}deg) scale(1.2)`;
            cardElement.style.boxShadow = `0 0 30px ${RARITY_STYLES[card.rarity].glow}`;
        });

        cardElement.addEventListener('mouseleave', () => {
            cardElement.style.opacity = config.opacity;
            cardElement.style.transform = `rotate(${config.rotation}deg) scale(1)`;
            cardElement.style.boxShadow = `0 0 15px ${RARITY_STYLES[card.rarity].glow}`;
        });

        // Click to collect
        cardElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.collectCard(cardElement, cardId);
        });

        config.parent.appendChild(cardElement);
        this.placedCards.push({ element: cardElement, cardId });

        return cardElement;
    }

    collectCard(element, cardId) {
        // Animate collection
        element.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        element.style.transform = 'scale(2) rotate(720deg)';
        element.style.opacity = '0';

        setTimeout(() => {
            element.remove();
            
            // Trigger card pickup event
            const event = new CustomEvent('cardPickup', { detail: cardId });
            document.dispatchEvent(event);
        }, 600);
    }

    /**
     * Quick placement presets
     */
    placeInCorner(cardId, corner = 'top-right') {
        const positions = {
            'top-left': { top: '20px', left: '20px' },
            'top-right': { top: '20px', right: '20px' },
            'bottom-left': { bottom: '20px', left: '20px' },
            'bottom-right': { bottom: '20px', right: '20px' }
        };
        
        return this.placeCard(cardId, positions[corner]);
    }

    placeNearElement(cardId, selector, offset = { x: 20, y: 20 }) {
        const element = document.querySelector(selector);
        if (!element) {
            console.error(`Element ${selector} not found`);
            return;
        }

        const rect = element.getBoundingClientRect();
        return this.placeCard(cardId, {
            position: 'absolute',
            top: `${rect.top + offset.y}px`,
            left: `${rect.left + offset.x}px`,
            parent: document.body
        });
    }

    placeInText(cardId, textContent, containerSelector = 'body') {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        // Find text node containing the content
        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes(textContent)) {
                const parent = node.parentElement;
                const span = document.createElement('span');
                span.style.position = 'relative';
                span.style.display = 'inline-block';
                
                parent.insertBefore(span, node);
                span.appendChild(node);
                
                return this.placeCard(cardId, {
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    parent: span,
                    size: '40px'
                });
            }
        }
    }

    placeRandom(cardId, count = 1) {
        for (let i = 0; i < count; i++) {
            const top = Math.random() * 80 + 10; // 10-90%
            const left = Math.random() * 80 + 10;
            const rotation = Math.random() * 360;
            
            this.placeCard(cardId, {
                top: `${top}%`,
                left: `${left}%`,
                rotation: rotation
            });
        }
    }

    removeAllCards() {
        this.placedCards.forEach(({ element }) => element.remove());
        this.placedCards = [];
    }
}

// Add card animations
const cardAnimations = document.createElement('style');
cardAnimations.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-10px) rotate(5deg);
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-15px);
        }
    }

    .collectible-card {
        user-select: none;
        -webkit-user-select: none;
    }
`;
document.head.appendChild(cardAnimations);

// Initialize card placer
window.cardPlacer = new CardPlacer();