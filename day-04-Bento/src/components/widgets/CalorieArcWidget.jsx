import React, { useState } from 'react';
import { Flame, Activity, Footprints, Heart } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function CalorieArcWidget({ size = 'compact' }) {
  const [calories, setCalories] = useState(1258);
  const goal = 1800;

  const handleAdd = (e) => {
    e.stopPropagation();
    playSound('click');
    setCalories((prev) => Math.min(3000, prev + 120));
  };

  const handleSub = (e) => {
    e.stopPropagation();
    playSound('click');
    setCalories((prev) => Math.max(200, prev - 120));
  };

  const ratio = Math.min(1, calories / goal);
  const radius = size === 'hero' ? 70 : 54;
  const arcLength = Math.PI * radius;
  const strokeDashoffset = arcLength * (1 - ratio);

  const renderArc = (customRadius = 54, customWidth = 9, svgH = 85) => (
    <div className="calorie-arc-container" style={{ height: `${svgH}px` }}>
      <svg viewBox={`0 0 ${customRadius * 2 + 32} ${customRadius + 31}`} className="calorie-svg">
        <defs>
          <linearGradient id="calorieGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF7A30" />
            <stop offset="100%" stopColor="#FF3E00" />
          </linearGradient>
        </defs>

        <path
          d={`M 16 ${customRadius + 21} A ${customRadius} ${customRadius} 0 0 1 ${customRadius * 2 + 16} ${customRadius + 21}`}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth={customWidth}
          strokeLinecap="round"
        />

        <path
          d={`M 16 ${customRadius + 21} A ${customRadius} ${customRadius} 0 0 1 ${customRadius * 2 + 16} ${customRadius + 21}`}
          fill="none"
          stroke="url(#calorieGrad)"
          strokeWidth={customWidth}
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={strokeDashoffset}
          className="calorie-arc-path"
        />
      </svg>

      <div className="calorie-center-icon">
        <Flame size={size === 'hero' ? 22 : 18} fill="#FF5E1E" strokeWidth={0} />
      </div>
    </div>
  );

  return (
    <div 
      className={`bento-card bento-card-light calorie-arc-widget size-${size}`}
      onClick={handleAdd}
      title="Click to log activity (+120 kCal)"
      role="button"
      tabIndex={0}
    >
      {size === 'compact' && (
        <div className="calorie-compact-layout">
          {renderArc(48, 8, 72)}
          <div className="calorie-footer">
            <h3 className="calorie-number">{calories.toLocaleString()}</h3>
            <span className="calorie-sub">kCal Burn</span>
            <div className="calorie-quick-actions">
              <button className="cal-btn" onClick={handleSub} title="-120 kCal">−</button>
              <button className="cal-btn" onClick={handleAdd} title="+120 kCal">+</button>
            </div>
          </div>
        </div>
      )}

      {size === 'wide' && (
        <div className="calorie-wide-layout">
          <div className="calorie-wide-arc-col">
            {renderArc(52, 9, 80)}
          </div>
          <div className="calorie-wide-info-col">
            <div className="calorie-wide-header">
              <span className="cal-badge-pill">Daily Activity</span>
              <div className="calorie-quick-actions">
                <button className="cal-btn" onClick={handleSub}>−</button>
                <button className="cal-btn" onClick={handleAdd}>+</button>
              </div>
            </div>
            <h3 className="calorie-number large">{calories.toLocaleString()}<small>kCal</small></h3>
            <div className="calorie-wide-stats">
              <div className="cw-stat"><Footprints size={12} /> 8,420 steps</div>
              <div className="cw-stat"><Activity size={12} /> 68% goal</div>
            </div>
          </div>
        </div>
      )}

      {size === 'tall' && (
        <div className="calorie-tall-layout">
          {renderArc(50, 9, 76)}
          <div className="calorie-tall-body">
            <h3 className="calorie-number">{calories.toLocaleString()}</h3>
            <span className="calorie-sub">kCal Burned</span>
            <div className="calorie-tall-metrics-list">
              <div className="tall-metric-item">
                <span className="tm-label">Daily Goal</span>
                <span className="tm-val">{goal} kCal</span>
              </div>
              <div className="tall-metric-item">
                <span className="tm-label">Active Time</span>
                <span className="tm-val">54 min</span>
              </div>
            </div>
            <div className="calorie-quick-actions full">
              <button className="cal-btn" onClick={handleSub}>-120 kCal</button>
              <button className="cal-btn primary" onClick={handleAdd}>+120 kCal</button>
            </div>
          </div>
        </div>
      )}

      {size === 'hero' && (
        <div className="calorie-hero-layout">
          <div className="calorie-hero-header">
            <div className="cal-hero-title-group">
              <span className="cal-hero-tag"><Activity size={13} /> Biometric Activity Tracker</span>
              <h3 className="cal-hero-title">Metabolic Burn & Vitals</h3>
            </div>
            <div className="calorie-quick-actions">
              <button className="cal-btn" onClick={handleSub}>− Log</button>
              <button className="cal-btn primary" onClick={handleAdd}>+ Add Activity</button>
            </div>
          </div>

          <div className="calorie-hero-main-row">
            <div className="cal-hero-arc-wrap">
              {renderArc(64, 11, 100)}
              <div className="cal-hero-arc-caption">
                <h2 className="calorie-number giant">{calories.toLocaleString()}</h2>
                <span className="calorie-sub">Total kCal Burned Today</span>
              </div>
            </div>

            <div className="cal-hero-cards-grid">
              <div className="cal-kpi-card">
                <Footprints size={16} className="kpi-icon" />
                <div>
                  <span className="kpi-lbl">TOTAL STEPS</span>
                  <strong className="kpi-val">8,420</strong>
                </div>
              </div>
              <div className="cal-kpi-card">
                <Heart size={16} className="kpi-icon" />
                <div>
                  <span className="kpi-lbl">AVG HEART RATE</span>
                  <strong className="kpi-val">128 bpm</strong>
                </div>
              </div>
              <div className="cal-kpi-card">
                <Flame size={16} className="kpi-icon" />
                <div>
                  <span className="kpi-lbl">ACTIVE DURATION</span>
                  <strong className="kpi-val">58 mins</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
