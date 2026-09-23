import React, { useState } from 'react';
import { Coffee, Check, Flame } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function CappuccinoWidget() {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [ordered, setOrdered] = useState(false);

  const sizes = [
    { label: '150ml', price: '$5.50', title: 'Single Roast' },
    { label: '250ml', price: '$6.50', title: 'Double Shot' },
    { label: '350ml', price: '$7.50', title: 'Grand Crù' },
  ];

  const currentSize = sizes[sizeIndex];

  const handleNextSize = (e) => {
    e.stopPropagation();
    playSound('click');
    setSizeIndex((prev) => (prev + 1) % sizes.length);
  };

  const handleOrder = (e) => {
    e.stopPropagation();
    playSound('success');
    setOrdered(true);
    setTimeout(() => setOrdered(false), 2000);
  };

  return (
    <div 
      className="bento-card bento-card-coffee cappuccino-widget"
      onClick={handleNextSize}
      title="Click to change size"
      role="button"
      tabIndex={0}
    >
      {/* Top badges */}
      <div className="coffee-header">
        <div className="coffee-badge-mini">
          <Flame size={12} className="coffee-flame-icon" />
        </div>
        <div className="coffee-rating-pill">
          <Coffee size={12} />
          <span>4.9</span>
        </div>
      </div>

      {/* Coffee Cup Graphic */}
      <div className="coffee-cup-visual">
        <div className="coffee-steam steam-1"></div>
        <div className="coffee-steam steam-2"></div>
        <div className="coffee-cup-body">
          <div className="cup-rim"></div>
          <div className="cup-liquid"></div>
          <div className="cup-handle"></div>
        </div>
        <div className="cup-saucer"></div>
        <div className="cup-shadow"></div>
      </div>

      {/* Bottom Info & Price */}
      <div className="coffee-footer">
        <div className="coffee-info">
          <h4 className="coffee-name">Cappuccino</h4>
          <span className="coffee-volume">Volume {currentSize.label}</span>
        </div>

        <button 
          className={`coffee-price-btn ${ordered ? 'ordered' : ''}`}
          onClick={handleOrder}
          title="Order this coffee"
        >
          {ordered ? (
            <>
              <Check size={13} strokeWidth={3} />
              <span>Brewing</span>
            </>
          ) : (
            <span>{currentSize.price}</span>
          )}
        </button>
      </div>
    </div>
  );
}
