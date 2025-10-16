// ShineChain Card Collection System
// Manages card collection, storage, and display

class CardCollectionSystem {
    constructor() {
        this.collectedCards = this.loadCollection();
        this.firstPickup = localStorage.getItem('shinechain_first_pickup') !== 'true';
        this.initializeSystem();
    }

    initializeSystem() {
        // Create card pickup banner if needed
        if (this.firstPickup) {
            this.createPickupBanner();
        }
        
        // Initialize card inventory UI
        this.createInventoryButton();
        
        // Listen for card pickup events
        document.addEventListener('cardPickup', (e) => this.handleCardPickup(e.detail));
    }

    loadCollection() {
        const saved = localStorage.getItem('shinechain_card_collection');
        return saved ? JSON.parse(saved) : [];
    }

    saveCollection() {
        localStorage.setItem('shinechain_card_collection', JSON.stringify(this.collectedCards));
    }

    hasCard(cardId) {
        return this.collectedCards.includes(cardId);
    }

    collectCard(cardId) {
        if (!this.hasCard(cardId)) {
            this.collectedCards.push(cardId);
            this.saveCollection();
            
            // Show first-time banner
            if (this.firstPickup) {
                this.showFirstPickupBanner();
                localStorage.setItem('shinechain_first_pickup', 'true');
                this.firstPickup = false;
            }
            
            // Show card acquired notification
            this.showCardAcquired(cardId);
            
            return true;
        }
        return false;
    }

    createPickupBanner() {
        const banner = document.createElement('div');
        banner.id = 'first-pickup-banner';
        banner.style.cssText = `
            position: fixed;
            top: -300px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 600px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            z-index: 10000;
            text-align: center;
            transition: top 0.5s ease;
            border: 3px solid #FFD700;
        `;
        banner.innerHTML = `
            <h2 style="margin: 0 0 15px 0; font-size: 28px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                🎴 Card Discovered! 🎴
            </h2>
            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                You've found a <strong>ShineChain Collector Card</strong>!<br>
                These mystical cards are hidden throughout the website.<br>
                Collect them all to unlock the <strong>Battle Arena</strong>!
            </p>
            <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 14px;">
                    💡 <strong>Tip:</strong> Cards are subtly placed in corners, near interactive elements,<br>
                    and hidden within the stories. Keep exploring!
                </p>
            </div>
            <button onclick="document.getElementById('first-pickup-banner').style.top='-300px'" 
                    style="background: #FFD700; color: #000; border: none; padding: 12px 30px; 
                           border-radius: 25px; font-size: 16px; font-weight: bold; cursor: pointer;
                           box-shadow: 0 4px 15px rgba(255,215,0,0.4); transition: all 0.3s;">
                Start Collecting!
            </button>
        `;
        document.body.appendChild(banner);
    }

    showFirstPickupBanner() {
        const banner = document.getElementById('first-pickup-banner');
        if (banner) {
            setTimeout(() => {
                banner.style.top = '20px';
            }, 500);
        }
    }

    showCardAcquired(cardId) {
        const card = CARD_DATABASE.find(c => c.id === cardId);
        if (!card) return;

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${RARITY_STYLES[card.rarity].background};
            color: white;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid ${RARITY_STYLES[card.rarity].border};
            box-shadow: 0 0 30px ${RARITY_STYLES[card.rarity].glow};
            z-index: 9999;
            min-width: 250px;
            animation: slideInRight 0.5s ease, fadeOut 0.5s ease 3.5s;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 40px;">🎴</div>
                <div>
                    <div style="font-weight: bold; font-size: 18px; margin-bottom: 5px;">
                        ${card.name}
                    </div>
                    <div style="font-size: 12px; opacity: 0.9; text-transform: uppercase;">
                        ${card.rarity} ${card.type}
                    </div>
                    <div style="font-size: 14px; margin-top: 5px;">
                        ${this.collectedCards.length} / ${CARD_DATABASE.length} collected
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 4000);
    }

    createInventoryButton() {
        const button = document.createElement('button');
        button.id = 'card-inventory-btn';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: 3px solid #FFD700;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 9998;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        button.innerHTML = '🎴';
        button.title = 'View Card Collection';
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 6px 30px rgba(102, 126, 234, 0.6)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        });
        
        button.addEventListener('click', () => this.showInventory());
        
        document.body.appendChild(button);
        
        // Add badge showing collection count
        this.updateInventoryBadge();
    }

    updateInventoryBadge() {
        let badge = document.getElementById('inventory-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.id = 'inventory-badge';
            badge.style.cssText = `
                position: fixed;
                bottom: 65px;
                right: 15px;
                background: #EF4444;
                color: white;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
                z-index: 9999;
                border: 2px solid white;
            `;
            document.body.appendChild(badge);
        }
        badge.textContent = this.collectedCards.length;
    }

    showInventory() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.id = 'card-inventory-modal';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 20px;
            padding: 30px;
            max-width: 90%;
            max-height: 90%;
            overflow-y: auto;
            border: 3px solid #667eea;
            box-shadow: 0 0 50px rgba(102, 126, 234, 0.5);
        `;

        const header = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: #FFD700; margin: 0; font-size: 28px;">
                    🎴 Card Collection (${this.collectedCards.length}/${CARD_DATABASE.length})
                </h2>
                <button onclick="document.getElementById('card-inventory-modal').remove()" 
                        style="background: #EF4444; color: white; border: none; padding: 10px 20px; 
                               border-radius: 10px; cursor: pointer; font-size: 16px;">
                    Close
                </button>
            </div>
        `;

        const cardsGrid = `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
                        gap: 20px; margin-top: 20px;">
                ${CARD_DATABASE.map(card => this.renderCardInInventory(card)).join('')}
            </div>
        `;

        modal.innerHTML = header + cardsGrid;
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    renderCardInInventory(card) {
        const collected = this.hasCard(card.id);
        const style = RARITY_STYLES[card.rarity];
        
        return `
            <div style="
                background: ${collected ? style.background : '#2a2a2a'};
                border: 2px solid ${collected ? style.border : '#555'};
                border-radius: 10px;
                padding: 15px;
                text-align: center;
                opacity: ${collected ? '1' : '0.4'};
                filter: ${collected ? 'none' : 'grayscale(100%)'};
                box-shadow: ${collected ? `0 0 20px ${style.glow}` : 'none'};
                transition: all 0.3s;
            ">
                <div style="font-size: 40px; margin-bottom: 10px;">
                    ${collected ? '🎴' : '❓'}
                </div>
                <div style="color: white; font-weight: bold; margin-bottom: 5px;">
                    ${collected ? card.name : '???'}
                </div>
                <div style="color: ${style.border}; font-size: 12px; text-transform: uppercase; margin-bottom: 10px;">
                    ${collected ? card.rarity : 'Locked'}
                </div>
                ${collected ? `
                    <div style="color: #ccc; font-size: 11px; margin-bottom: 8px;">
                        ⚔️ ${card.power} | 🛡️ ${card.defense}
                    </div>
                    <div style="color: #aaa; font-size: 10px; font-style: italic;">
                        ${card.ability}
                    </div>
                ` : ''}
            </div>
        `;
    }

    handleCardPickup(cardId) {
        this.collectCard(cardId);
        this.updateInventoryBadge();
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes cardGlow {
        0%, 100% { box-shadow: 0 0 10px currentColor; }
        50% { box-shadow: 0 0 30px currentColor; }
    }
`;
document.head.appendChild(style);

// Initialize the card system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cardSystem = new CardCollectionSystem();
    });
} else {
    window.cardSystem = new CardCollectionSystem();
}