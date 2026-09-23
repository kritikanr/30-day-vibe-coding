import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function BatteryChargingWidget() {
  const [level, setLevel] = useState(72);

  const cycleBattery = () => {
    playSound('click');
    const levels = [72, 85, 96, 100, 34, 58];
    const nextIdx = (levels.indexOf(level) + 1) % levels.length;
    setLevel(levels[nextIdx]);
  };

  const remainingMin = Math.round((100 - level) * 0.5);

  return (
    <div 
      className="bento-card bento-card-light battery-charging-widget"
      onClick={cycleBattery}
      title="Click to cycle battery level"
      role="button"
      tabIndex={0}
    >
      {/* Top Percentage & Lightning Bolt */}
      <div className="battery-header">
        <Zap size={18} className="battery-bolt-icon" fill="#FF5E1E" strokeWidth={0} />
        <span className="battery-percent-num">+{level}%</span>
      </div>

      {/* Dotted Scale Line 0% to 100% */}
      <div className="battery-meter-container">
        <span className="meter-label">0%</span>
        <div className="meter-dotted-track">
          <div 
            className="meter-active-fill" 
            style={{ width: `${level}%` }}
          />
          <div 
            className="meter-thumb-glow"
            style={{ left: `${level}%` }}
          />
        </div>
        <span className="meter-label">100%</span>
      </div>

      {/* Orange Illuminated Battery Block */}
      <div className="battery-block-outer">
        <div className="battery-block-fill">
          <div className="battery-cell-info">
            <span className="charging-text">{level === 100 ? 'Charged' : 'Charging'}</span>
            <span className="charging-time">
              {level === 100 ? 'Fully charged' : `${remainingMin} min left`}
            </span>
          </div>
          <div className="battery-glow-effect"></div>
        </div>
      </div>
    </div>
  );
}
