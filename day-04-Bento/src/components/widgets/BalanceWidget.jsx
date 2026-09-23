import React, { useState } from 'react';
import { playSound } from '../../utils/sound';

export default function BalanceWidget() {
  const [frameIndex, setFrameIndex] = useState(0);

  const frames = [
    { label: 'Daily', percent: '89%', status: 'Increasing', path: 'M 10 50 Q 50 65, 80 25 T 150 15' },
    { label: 'Weekly', percent: '94%', status: 'Surging', path: 'M 10 60 Q 40 40, 75 15 T 150 25' },
    { label: 'Monthly', percent: '76%', status: 'Steady', path: 'M 10 35 Q 60 70, 95 30 T 150 40' },
  ];

  const current = frames[frameIndex];

  const handleToggle = () => {
    playSound('click');
    setFrameIndex((prev) => (prev + 1) % frames.length);
  };

  return (
    <div 
      className="bento-card bento-card-dark balance-widget"
      onClick={handleToggle}
      title="Click to cycle timeframe"
      role="button"
      tabIndex={0}
    >
      <div className="balance-header">
        <span className="balance-eyebrow">BALANCE</span>
        <span className="balance-tag-pill">{current.label}</span>
      </div>

      {/* Neon Spline Chart Curve */}
      <div className="balance-chart-area">
        <svg viewBox="0 0 160 80" className="balance-svg">
          <defs>
            <linearGradient id="balanceGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9AE600" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#9AE600" stopOpacity="1" />
              <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.8" />
            </linearGradient>
            <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <path 
            d={current.path} 
            fill="none" 
            stroke="url(#balanceGlow)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            filter="url(#neonBlur)"
            className="balance-path-anim"
          />

          {/* Interactive point tag */}
          <circle cx="80" cy="25" r="4.5" fill="#FFFFFF" stroke="#9AE600" strokeWidth="2.5" />
          <rect x="68" y="6" width="24" height="14" rx="4" fill="#24262E" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          <circle cx="80" cy="13" r="2" fill="#9AE600" />
        </svg>
      </div>

      {/* Bottom Numbers */}
      <div className="balance-footer">
        <div className="balance-trend-info">
          <span className="balance-trend-text">{current.status}</span>
          <h3 className="balance-huge-val">{current.percent}</h3>
        </div>
      </div>
    </div>
  );
}
