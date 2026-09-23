import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function PerformanceWidget() {
  const [metricIndex, setMetricIndex] = useState(0);

  const metrics = [
    { label: 'PERFORMANCE', period: 'In the past 7 days', val: '65%', sub: 'System Efficiency', trend: '+14%' },
    { label: 'CACHE HIT RATIO', period: 'Real-time CDN', val: '98%', sub: 'Edge Routing', trend: '+4.2%' },
    { label: 'APP FLUIDITY', period: 'ProMotion Display', val: '120', unit: 'fps', sub: 'Zero Frame Drops', trend: 'Solid' },
  ];

  const current = metrics[metricIndex];

  const handleNext = () => {
    playSound('click');
    setMetricIndex((prev) => (prev + 1) % metrics.length);
  };

  return (
    <div 
      className="bento-card bento-card-dark performance-widget"
      onClick={handleNext}
      title="Click to cycle performance metric"
      role="button"
      tabIndex={0}
    >
      <div className="perf-header">
        <div className="perf-label-group">
          <span className="perf-title">{current.label}</span>
          <span className="perf-period">{current.period}</span>
        </div>

        <div className="perf-arrow-badge">
          <TrendingUp size={15} className="perf-trend-icon" />
        </div>
      </div>

      <div className="perf-body">
        <div className="perf-huge-number">
          {current.val}
          {current.unit && <small className="perf-unit">{current.unit}</small>}
        </div>

        {/* Micro sparkline bar indicators */}
        <div className="perf-bars-row">
          {[40, 65, 55, 80, 70, 90, 65, 85].map((h, i) => (
            <div 
              key={i} 
              className="perf-micro-bar" 
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        <div className="perf-footer">
          <span className="perf-sub">{current.sub}</span>
          <span className="perf-trend-badge">{current.trend}</span>
        </div>
      </div>
    </div>
  );
}
