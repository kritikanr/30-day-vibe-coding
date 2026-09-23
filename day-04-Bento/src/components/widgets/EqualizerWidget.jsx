import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function EqualizerWidget({ size = 'wide' }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(4613); // 01:16:53
  
  // 20 columns of LED bars initialized statically
  const [levels, setLevels] = useState([7, 6, 8, 5, 7, 8, 6, 7, 4, 3, 2, 2, 1, 1, 3, 4, 5, 6, 4, 2]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
        setLevels((prev) =>
          prev.map((_, idx) => {
            if (idx < 8) {
              return Math.floor(Math.random() * 4) + 5;
            } else if (idx < 12) {
              return Math.floor(Math.random() * 3) + 2;
            } else {
              return Math.floor(Math.random() * 2);
            }
          })
        );
      }, 160);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = (e) => {
    e.stopPropagation();
    playSound(isPlaying ? 'toggle' : 'click');
    setIsPlaying(!isPlaying);
  };

  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const numCols = size === 'compact' ? 8 : (size === 'hero' ? 20 : 16);
  const displayLevels = levels.slice(0, numCols);

  return (
    <div 
      className={`bento-card bento-card-dark equalizer-widget size-${size}`}
      onClick={togglePlay}
      title="Click to toggle equalizer"
      role="button"
      tabIndex={0}
    >
      {size === 'compact' && (
        <div className="eq-compact-layout">
          <div className="eq-compact-header">
            <span className="eq-title-mini">New Audio</span>
            <span className="eq-time-mini">{formatTime(seconds).slice(3)}</span>
          </div>
          <div className="eq-display-grid compact-grid">
            {displayLevels.map((level, colIdx) => (
              <div key={colIdx} className="eq-led-column">
                {Array.from({ length: 6 }).map((_, segIdx) => (
                  <div 
                    key={segIdx} 
                    className={`eq-led-segment ${isPlaying && 5 - segIdx < level ? 'lit' : 'off'}`} 
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="eq-compact-footer">
            <button className="eq-center-btn mini" onClick={togglePlay}>
              {isPlaying ? <Pause size={10} fill="#141416" /> : <Play size={10} fill="#141416" />}
            </button>
            <span className="eq-tag-mini">15 Oct</span>
          </div>
        </div>
      )}

      {(size === 'wide' || size === 'tall') && (
        <div className={`eq-standard-layout ${size === 'tall' ? 'tall-flow' : ''}`}>
          <div className="eq-top-markers">
            <span className="eq-marker marker-12s">12s</span>
            <span className="eq-marker marker-24s">24s</span>
          </div>

          <div className="eq-display-grid">
            {displayLevels.map((level, colIdx) => (
              <div key={colIdx} className="eq-led-column">
                {Array.from({ length: 8 }).map((_, segIdx) => (
                  <div 
                    key={segIdx} 
                    className={`eq-led-segment ${isPlaying && 7 - segIdx < level ? 'lit' : 'off'}`}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="eq-footer">
            <div className="eq-meta">
              <span className="eq-date">15 Oct 2024</span>
              <span className="eq-title">New audio</span>
            </div>

            <button className={`eq-center-btn ${isPlaying ? 'active' : ''}`} onClick={togglePlay}>
              {isPlaying ? <Pause size={14} fill="#141416" /> : <Play size={14} fill="#141416" />}
            </button>

            <div className="eq-time-code">
              <span>{formatTime(seconds)}</span>
            </div>
          </div>
        </div>
      )}

      {size === 'hero' && (
        <div className="eq-hero-layout">
          <div className="eq-hero-header">
            <div className="eq-hero-title-group">
              <span className="eq-hero-eyebrow">HIGH FIDELITY AUDIO • 48KHZ 24-BIT</span>
              <h3 className="eq-hero-title">Ambient Soundscapes Session</h3>
            </div>
            <div className="eq-hero-live-badge">
              <span className="eq-live-dot"></span> LIVE VU
            </div>
          </div>

          <div className="eq-hero-visualizer-container">
            <div className="eq-top-markers hero-markers">
              <span>00s</span>
              <span>12s</span>
              <span>24s</span>
              <span>36s</span>
              <span>48s</span>
            </div>

            <div className="eq-display-grid hero-grid">
              {displayLevels.map((level, colIdx) => (
                <div key={colIdx} className="eq-led-column">
                  {Array.from({ length: 12 }).map((_, segIdx) => (
                    <div 
                      key={segIdx} 
                      className={`eq-led-segment ${isPlaying && 11 - segIdx < level ? 'lit' : 'off'}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="eq-hero-controls-bar">
            <div className="eq-hero-meta">
              <span className="eq-track-artist">Master Audio • Stereo DSP</span>
              <span className="eq-track-timestamp">{formatTime(seconds)}</span>
            </div>

            <div className="eq-hero-btns">
              <button className={`eq-center-btn large ${isPlaying ? 'active' : ''}`} onClick={togglePlay}>
                {isPlaying ? <Pause size={16} fill="#141416" /> : <Play size={16} fill="#141416" />}
              </button>
            </div>

            <div className="eq-hero-channel-stats">
              <Volume2 size={14} className="eq-vol-icon" />
              <span>Ch 1/2 Balanced</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
