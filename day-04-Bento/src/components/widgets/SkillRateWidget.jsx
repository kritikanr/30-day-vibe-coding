import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function SkillRateWidget() {
  const [index, setIndex] = useState(0);

  const skills = [
    { label: 'Technology Based', rate: '48.26%', delta: '+12.4%' },
    { label: 'System Design', rate: '73.10%', delta: '+8.2%' },
    { label: 'AI Cognition', rate: '92.45%', delta: '+24.1%' },
  ];

  const current = skills[index];

  const handleNext = () => {
    playSound('click');
    setIndex((prev) => (prev + 1) % skills.length);
  };

  return (
    <div 
      className="bento-card bento-card-light skill-rate-widget"
      onClick={handleNext}
      title="Click to cycle skill domain"
      role="button"
      tabIndex={0}
    >
      <div className="skill-header">
        <div className="skill-label-group">
          <span className="skill-title">SKILL RATE</span>
          <span className="skill-subtitle">In the past 7 days</span>
        </div>

        <button 
          className="skill-arrow-btn"
          aria-label="Next skill domain"
        >
          <ArrowUpRight size={15} strokeWidth={2.5} className="skill-arrow-icon" />
        </button>
      </div>

      <div className="skill-body">
        <div className="skill-rate-huge">
          {current.rate}
        </div>
        <div className="skill-footer-row">
          <span className="skill-domain-name">{current.label}</span>
          <span className="skill-delta-tag">{current.delta}</span>
        </div>
      </div>
    </div>
  );
}
