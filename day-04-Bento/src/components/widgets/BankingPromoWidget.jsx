import React, { useState } from 'react';
import { playSound } from '../../utils/sound';

export default function BankingPromoWidget() {
  const [activeTab, setActiveTab] = useState(0);

  const perks = [
    { title: 'Banking That Works for You', text: 'Discover a new level of convenience and security. With seamless payments and 24/7 access, banking has never been easier.' },
    { title: 'Zero Friction FX', text: 'Spend globally in over 140 currencies at true interbank rates without hidden weekend markups or ATM surcharges.' },
    { title: 'Vaults & High APY', text: 'Automate micro-savings on every round-up and earn an annualized 4.85% yield compounded daily with instant liquidity.' }
  ];

  const handleNext = () => {
    playSound('click');
    setActiveTab((prev) => (prev + 1) % perks.length);
  };

  const current = perks[activeTab];

  return (
    <div 
      className="bento-card bento-card-dark banking-promo-widget"
      onClick={handleNext}
      title="Click to explore banking highlights"
      role="button"
      tabIndex={0}
    >
      <div className="bank-promo-header">
        <span className="bank-promo-tag">Financial solutions</span>
        <div className="bank-tab-dots">
          {perks.map((_, i) => (
            <span key={i} className={`bt-dot ${i === activeTab ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      <h4 className="bank-promo-heading">{current.title}</h4>

      <p className="bank-promo-desc">{current.text}</p>

      <div className="bank-promo-footer">
        <span className="bank-learn-more">Tap to discover →</span>
      </div>
    </div>
  );
}
