import React, { useState } from 'react';
import { Sliders, TrendingUp } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function ChartWidget() {
  const [activeRange, setActiveRange] = useState(0);

  const ranges = [
    {
      label: '1M',
      progress: '9956+',
      gain: '+36.89%',
      path: 'M 10 50 Q 30 65, 50 35 T 90 20 T 130 45 T 150 15',
      fill: 'M 10 50 Q 30 65, 50 35 T 90 20 T 130 45 T 150 15 L 150 75 L 10 75 Z'
    },
    {
      label: '3M',
      progress: '14,820+',
      gain: '+54.12%',
      path: 'M 10 60 Q 35 45, 65 50 T 100 15 T 135 30 T 150 10',
      fill: 'M 10 60 Q 35 45, 65 50 T 100 15 T 135 30 T 150 10 L 150 75 L 10 75 Z'
    },
    {
      label: '1Y',
      progress: '42,910+',
      gain: '+118.4%',
      path: 'M 10 65 Q 40 70, 70 30 T 110 35 T 135 15 T 150 8',
      fill: 'M 10 65 Q 40 70, 70 30 T 110 35 T 135 15 T 150 8 L 150 75 L 10 75 Z'
    },
  ];

  const current = ranges[activeRange];

  const handleNext = () => {
    playSound('click');
    setActiveRange((prev) => (prev + 1) % ranges.length);
  };

  return (
    <div 
      className="bento-card bento-card-dark chart-widget"
      onClick={handleNext}
      title="Click to cycle timeframe"
      role="button"
      tabIndex={0}
    >
      {/* Top Header */}
      <div className="chart-header">
        <span className="chart-title">CHART</span>
        <button className="chart-options-btn" aria-label="Settings">
          <Sliders size={13} className="chart-gear-icon" />
        </button>
      </div>

      {/* Center Glowing Neon Line Chart */}
      <div className="chart-canvas-area">
        <svg viewBox="0 0 160 80" className="chart-svg">
          <defs>
            <linearGradient id="chartLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9AE600" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#9AE600" stopOpacity="1" />
              <stop offset="100%" stopColor="#84CC16" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="chartAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9AE600" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#9AE600" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path d={current.fill} fill="url(#chartAreaGrad)" />

          {/* Glowing Stroke */}
          <path 
            d={current.path} 
            fill="none" 
            stroke="url(#chartLineGrad)" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
            className="chart-stroke-anim"
          />

          {/* Subtle horizontal baseline grid */}
          <line x1="10" y1="65" x2="150" y2="65" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Bottom Progress Metrics */}
      <div className="chart-footer">
        <div className="chart-stat-left">
          <span className="chart-label-sub">Total Progress</span>
          <span className="chart-main-val">{current.progress}</span>
        </div>
        <div className="chart-gain-badge">
          <TrendingUp size={11} />
          <span>{current.gain}</span>
        </div>
      </div>
    </div>
  );
}
