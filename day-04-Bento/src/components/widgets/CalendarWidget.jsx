import React, { useState } from 'react';
import { playSound } from '../../utils/sound';

export default function CalendarWidget() {
  const [day, setDay] = useState(31);
  const month = 'OCTOBER';
  const [isFlipping, setIsFlipping] = useState(false);

  const handleNextDay = () => {
    if (isFlipping) return;
    playSound('flip');
    setIsFlipping(true);
    setTimeout(() => {
      setDay((prev) => (prev >= 31 ? 1 : prev + 1));
      setIsFlipping(false);
    }, 280);
  };

  const handlePrevDay = (e) => {
    e.stopPropagation();
    if (isFlipping) return;
    playSound('flip');
    setIsFlipping(true);
    setTimeout(() => {
      setDay((prev) => (prev <= 1 ? 31 : prev - 1));
      setIsFlipping(false);
    }, 280);
  };

  return (
    <div 
      className="bento-card bento-card-light calendar-widget" 
      onClick={handleNextDay}
      title="Click to flip calendar day"
      role="button"
      tabIndex={0}
    >
      {/* Desk stand background shadow */}
      <div className="calendar-desk-stand">
        <div className="calendar-binder-ring ring-left"></div>
        <div className="calendar-binder-ring ring-right"></div>
      </div>

      {/* Main flip card */}
      <div className={`calendar-page ${isFlipping ? 'page-flip-anim' : ''}`}>
        {/* Top page header */}
        <div className="calendar-page-top">
          <div className="calendar-ring-hole left-hole"></div>
          <div className="calendar-ring-hole right-hole"></div>
          <div className="calendar-month-row">
            <span className="calendar-weekday">THURSDAY</span>
            <span className="calendar-month-name">{month}</span>
          </div>
        </div>

        {/* Center large split number */}
        <div className="calendar-number-wrapper">
          <div className="calendar-split-line"></div>
          <span className="calendar-huge-number">{day < 10 ? `0${day}` : day}</span>
        </div>

        {/* Bottom page footer / curl */}
        <div className="calendar-page-bottom">
          <span className="calendar-subtext">Click to flip</span>
          <div className="calendar-controls">
            <button className="cal-mini-btn" onClick={handlePrevDay} title="Previous day">‹</button>
            <button className="cal-mini-btn" onClick={(e) => { e.stopPropagation(); handleNextDay(); }} title="Next day">›</button>
          </div>
        </div>
      </div>
      
      {/* Desk easel bottom lip shadow */}
      <div className="calendar-bottom-lip"></div>
    </div>
  );
}
