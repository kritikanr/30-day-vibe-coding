import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function RadialDialWidget() {
  const [percent, setPercent] = useState(98);

  const cyclePower = () => {
    playSound('click');
    const presets = [98, 100, 25, 52, 78, 89];
    const nextIdx = (presets.indexOf(percent) + 1) % presets.length;
    setPercent(presets[nextIdx]);
  };

  const totalTicks = 32;
  const activeTicks = Math.round((percent / 100) * totalTicks);

  return (
    <div 
      className="bento-card bento-card-dark radial-dial-widget"
      onClick={cyclePower}
      title="Click to change power level"
      role="button"
      tabIndex={0}
    >
      {/* Top Header */}
      <div className="radial-header">
        <span className="radial-percent">+{percent}%</span>
        <span className="radial-label">Performance</span>
      </div>

      {/* Radial Dial with Ticks & Center Icon */}
      <div className="radial-dial-center">
        <div className="radial-tick-ring">
          {Array.from({ length: totalTicks }).map((_, i) => {
            const angle = (i / totalTicks) * 360;
            const isActive = i <= activeTicks;
            return (
              <div 
                key={i} 
                className={`radial-tick ${isActive ? 'active' : 'dim'}`}
                style={{ transform: `rotate(${angle}deg) translateY(-46px)` }}
              />
            );
          })}
        </div>

        {/* Center glowing core with lightning bolt */}
        <div className="radial-core">
          <div className="radial-core-glow"></div>
          <Zap size={22} className="radial-bolt" fill="#FF5E1E" strokeWidth={0} />
        </div>
      </div>

      {/* Bottom status */}
      <div className="radial-footer">
        <span className="radial-status-text">
          {percent === 100 ? 'Fully Charged' : 'Charging...'}
        </span>
        <span className="radial-time-left">
          {percent === 100 ? 'Optimal' : `${Math.max(1, Math.round((100 - percent) * 0.8))} min left`}
        </span>
      </div>
    </div>
  );
}
