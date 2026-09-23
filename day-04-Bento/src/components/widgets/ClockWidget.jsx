import React, { useState, useEffect } from 'react';
import { Globe, Clock as ClockIcon } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function ClockWidget({ size = 'compact' }) {
  const [time, setTime] = useState(new Date());
  const [zoneIndex, setZoneIndex] = useState(0);

  const zones = [
    { name: 'LOCAL', city: 'Current Location', offset: null },
    { name: 'NYC', city: 'New York', offset: -4 },
    { name: 'LON', city: 'London', offset: 1 },
    { name: 'TYO', city: 'Tokyo', offset: 9 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleZoneClick = () => {
    playSound('click');
    setZoneIndex((prev) => (prev + 1) % zones.length);
  };

  const getTargetDate = (offset = null) => {
    if (offset === null) return time;
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
  };

  const targetDate = getTargetDate(zones[zoneIndex].offset);
  const seconds = targetDate.getSeconds();
  const minutes = targetDate.getMinutes();
  const hours = targetDate.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const formatDigital = (d) => {
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  };

  const renderClockDial = (dialScale = 1) => {
    const sizePx = Math.round(172 * dialScale);
    const radius = Math.round(64 * dialScale);
    const center = Math.round(86 * dialScale);

    return (
      <div 
        className="clock-dial"
        style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
      >
        <div className="clock-ticks">
          {Array.from({ length: 60 }).map((_, i) => (
            <div 
              key={i} 
              className={`clock-tick ${i % 5 === 0 ? 'major' : 'minor'}`} 
              style={{ transform: `rotate(${i * 6}deg)`, transformOrigin: `50% ${center - 4}px` }}
            />
          ))}
        </div>

        {hourNumbers.map((num, i) => {
          const angle = (i * 30 - 60) * (Math.PI / 180);
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <span 
              key={num} 
              className="clock-number"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                fontSize: `${Math.round(11 * dialScale)}px`
              }}
            >
              {num}
            </span>
          );
        })}

        <div className="clock-brand">
          <span className="clock-city-badge">{zones[zoneIndex].name}</span>
        </div>

        <div 
          className="clock-hand hour-hand" 
          style={{ 
            height: `${Math.round(44 * dialScale)}px`,
            width: `${Math.max(2, Math.round(3.5 * dialScale))}px`,
            transform: `translateX(-50%) rotate(${hourDeg}deg)` 
          }}
        />
        <div 
          className="clock-hand minute-hand" 
          style={{ 
            height: `${Math.round(60 * dialScale)}px`,
            width: `${Math.max(1.5, Math.round(2.5 * dialScale))}px`,
            transform: `translateX(-50%) rotate(${minuteDeg}deg)` 
          }}
        />
        <div 
          className="clock-hand second-hand" 
          style={{ 
            height: `${Math.round(68 * dialScale)}px`,
            width: `${Math.max(1, Math.round(1.5 * dialScale))}px`,
            transform: `translateX(-50%) rotate(${secondDeg}deg)` 
          }}
        />

        <div className="clock-pivot">
          <div className="clock-pivot-inner"></div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`bento-card bento-card-light clock-widget size-${size}`}
      onClick={handleZoneClick}
      title="Click to cycle timezone"
      role="button"
      tabIndex={0}
    >
      {size === 'compact' && renderClockDial(0.95)}

      {size === 'wide' && (
        <div className="clock-wide-layout">
          {renderClockDial(0.9)}
          <div className="clock-wide-info">
            <div className="clock-zone-badge-wrap">
              <Globe size={13} className="globe-icon" />
              <span>{zones[zoneIndex].city}</span>
            </div>
            <h3 className="clock-digital-time">{formatDigital(targetDate)}</h3>
            <span className="clock-timezone-meta">Swiss Chronometer • Calibre 31</span>
            <div className="clock-city-switch-row">
              {zones.map((z, idx) => (
                <button 
                  key={z.name} 
                  className={`clock-chip-btn ${idx === zoneIndex ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); playSound('click'); setZoneIndex(idx); }}
                >
                  {z.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {size === 'tall' && (
        <div className="clock-tall-layout">
          {renderClockDial(0.85)}
          <div className="clock-tall-cities">
            <span className="tall-cities-title">WORLD TIMEZONES</span>
            {zones.map((z, idx) => {
              const d = getTargetDate(z.offset);
              return (
                <div 
                  key={z.name} 
                  className={`tall-city-row ${idx === zoneIndex ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); playSound('click'); setZoneIndex(idx); }}
                >
                  <span className="tall-city-name">{z.name}</span>
                  <span className="tall-city-time">{formatDigital(d).slice(0, 5)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {size === 'hero' && (
        <div className="clock-hero-layout">
          <div className="clock-hero-dial-wrap">
            {renderClockDial(1.25)}
          </div>
          <div className="clock-hero-panel">
            <div className="clock-hero-header">
              <span className="clock-hero-tag"><ClockIcon size={13} /> Swiss Haute Horlogerie</span>
              <h3 className="clock-hero-city">{zones[zoneIndex].city}</h3>
              <div className="clock-hero-digital">{formatDigital(targetDate)}</div>
            </div>

            <div className="clock-hero-world-grid">
              {zones.filter((_, i) => i !== zoneIndex).map((z) => {
                const d = getTargetDate(z.offset);
                return (
                  <div key={z.name} className="hero-world-card">
                    <span className="world-card-name">{z.name} ({z.city})</span>
                    <strong className="world-card-time">{formatDigital(d)}</strong>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
