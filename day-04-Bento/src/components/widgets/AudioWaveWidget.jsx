import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function AudioWaveWidget() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(4585); // 01:16:25

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    playSound(isPlaying ? 'toggle' : 'click');
    setIsPlaying(!isPlaying);
  };

  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // 18 waveform bars with distinct heights
  const baseHeights = [35, 60, 45, 80, 95, 70, 100, 85, 90, 65, 80, 50, 75, 40, 60, 30, 45, 25];

  return (
    <div className="bento-pill-widget audio-wave-widget" onClick={togglePlay}>
      {/* Play/Pause Button */}
      <button 
        className="audio-play-btn"
        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
        title={isPlaying ? 'Pause Audio' : 'Play Audio'}
      >
        {isPlaying ? (
          <Pause size={12} fill="#FF5E1E" strokeWidth={0} />
        ) : (
          <Play size={12} fill="#FF5E1E" strokeWidth={0} style={{ transform: 'translateX(1px)' }} />
        )}
      </button>

      {/* Waveform Frequency Bars */}
      <div className={`audio-waveform-bars ${isPlaying ? 'playing' : 'paused'}`}>
        {baseHeights.map((h, i) => (
          <span 
            key={i} 
            className="wave-bar" 
            style={{ 
              height: `${h}%`,
              animationDelay: `${(i % 6) * 0.12}s`
            }} 
          />
        ))}
      </div>

      {/* Track Timeline Scrubber */}
      <div className="audio-timeline-track">
        <div className="audio-timeline-dot"></div>
      </div>

      {/* Timestamp */}
      <div className="audio-timestamp">
        <span>{formatTime(seconds)}</span>
      </div>
    </div>
  );
}
