import React, { useState, useRef } from 'react';
import { Wifi, Copy, Check, Eye, EyeOff, ShieldCheck, Zap } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function OrangeCardWidget({ size = 'wide' }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / (rect.height / 2)) * -12;
    const tiltY = (x / (rect.width / 2)) * 12;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
    playSound('flip');
    setIsFlipped(!isFlipped);
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    playSound('success');
    navigator.clipboard?.writeText?.('5399 4820 9021 8492');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderDebitCard = (cardClass = '') => (
    <div 
      className={`card-3d-perspective-container ${cardClass}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      title="Click to flip card"
    >
      <div 
        className={`orange-debit-card ${isFlipped ? 'flipped' : ''}`}
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`
        }}
      >
        {/* Card Front */}
        <div className="card-face card-front">
          <div className="card-top-row">
            <span className="card-brand-label">Wallet</span>
            <div className="card-contactless-icon">
              <Wifi size={16} className="contactless-wave" />
            </div>
          </div>

          <div className="card-chip">
            <div className="chip-lines"></div>
          </div>

          <div className="card-embossed-bank">
            <span>Bank</span>
          </div>

          <div className="card-specular-sheen"></div>
        </div>

        {/* Card Back */}
        <div className="card-face card-back">
          <div className="card-magstripe"></div>
          <div className="card-cvv-strip">
            <span className="cvv-label">CVV</span>
            <span className="cvv-num">842</span>
          </div>
          <div className="card-back-meta">
            <span className="card-pan">5399 •••• •••• 8492</span>
            <span className="card-exp">08/29</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className={`bento-card bento-card-dark orange-card-widget size-${size}`}
      title="Tactile Orange Debit Card & Banking"
    >
      {size === 'compact' && (
        <div className="orange-compact-layout">
          {renderDebitCard('compact-card')}
          <div className="compact-card-footer">
            <span className="compact-card-title">Bank Card</span>
            <button className="compact-card-flip-btn" onClick={handleCardClick}>
              {isFlipped ? <EyeOff size={11} /> : <Eye size={11} />}
            </button>
          </div>
        </div>
      )}

      {size === 'wide' && (
        <div className="orange-wide-layout">
          {renderDebitCard('wide-card')}
          <div className="banking-text-content">
            <span className="banking-eyebrow">Choose Us!</span>
            <h3 className="banking-main-title">
              Simplified Banking<br />For Seamless Payments
            </h3>
            <p className="banking-body-text">
              Experience Effortless Banking Designed for Your Convenience
            </p>
            <div className="banking-actions">
              <button className="bank-card-action-btn" onClick={handleCardClick}>
                {isFlipped ? <EyeOff size={12} /> : <Eye size={12} />}
                <span>{isFlipped ? 'Front' : 'Flip'}</span>
              </button>
              <button className={`bank-card-action-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Card'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {size === 'tall' && (
        <div className="orange-tall-layout">
          {renderDebitCard('tall-card')}
          <div className="orange-tall-content">
            <span className="banking-eyebrow">Tactile Vault</span>
            <h4 className="orange-tall-heading">Simplified Banking</h4>
            <p className="orange-tall-desc">Zero fees, instant contactless payments, and biometric encryption.</p>
            <div className="banking-actions">
              <button className="bank-card-action-btn" onClick={handleCardClick}>
                {isFlipped ? <EyeOff size={12} /> : <Eye size={12} />}
                <span>{isFlipped ? 'Front' : 'Flip Card'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {size === 'hero' && (
        <div className="orange-hero-layout">
          <div className="orange-hero-left">
            {renderDebitCard('hero-card')}
            <div className="orange-hero-metrics">
              <div className="hero-metric-item">
                <ShieldCheck size={14} className="metric-icon" />
                <div>
                  <span className="metric-lbl">SECURITY</span>
                  <strong className="metric-v">AES-256</strong>
                </div>
              </div>
              <div className="hero-metric-item">
                <Zap size={14} className="metric-icon" />
                <div>
                  <span className="metric-lbl">SPEED</span>
                  <strong className="metric-v">Instant</strong>
                </div>
              </div>
            </div>
          </div>
          
          <div className="orange-hero-right">
            <span className="banking-eyebrow">Enterprise Tier</span>
            <h3 className="orange-hero-title">
              Simplified Banking For Seamless Global Payments
            </h3>
            <p className="orange-hero-desc">
              Experience the next frontier in contactless liquidity. Designed with physical precision, instant settlement protocols, and zero international conversion fees.
            </p>
            <div className="orange-hero-features">
              <span className="feat-chip">✓ Multi-Currency Vaults</span>
              <span className="feat-chip">✓ Dynamic CVV Shuffling</span>
              <span className="feat-chip">✓ 4.85% APY Daily Yield</span>
            </div>
            <div className="banking-actions">
              <button className="bank-card-action-btn primary-action" onClick={handleCardClick}>
                {isFlipped ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{isFlipped ? 'View Front Face' : 'Flip Physical Card'}</span>
              </button>
              <button className={`bank-card-action-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied PAN' : 'Copy Card Number'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
