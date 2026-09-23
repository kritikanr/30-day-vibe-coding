import React, { useState, useEffect } from 'react';
import { Truck, Package } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function DeliveryTrackerWidget() {
  const [progress, setProgress] = useState(65); // percentage
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    let interval;
    if (isSimulating) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsSimulating(false);
            playSound('success');
            return 100;
          }
          return Math.min(100, prev + 1);
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  const remainingKm = Math.max(0, Math.round((1 - progress / 100) * 80));

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setProgress(val);
    if (val === 100) playSound('success');
  };

  const toggleSimulate = (e) => {
    e.stopPropagation();
    playSound('click');
    setIsSimulating(!isSimulating);
  };

  return (
    <div className="bento-pill-widget delivery-widget">
      {/* Truck icon on left */}
      <button 
        className={`delivery-icon-btn truck-side ${isSimulating ? 'driving' : ''}`}
        onClick={toggleSimulate}
        title={isSimulating ? 'Pause truck simulation' : 'Simulate delivery route'}
      >
        <Truck size={17} className="delivery-neon-icon" />
        <span className="delivery-pulse-halo"></span>
      </button>

      {/* Progress Track & Draggable Thumb */}
      <div className="delivery-track-container">
        <div className="delivery-progress-fill" style={{ width: `${progress}%` }}>
          <div className="delivery-glow-tip"></div>
        </div>

        <input 
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSliderChange}
          className="delivery-slider-input"
          aria-label="Delivery progress"
        />

        <div 
          className="delivery-km-badge"
          style={{ left: `clamp(18%, ${progress}%, 82%)` }}
        >
          {progress >= 100 ? 'Delivered' : `-${remainingKm}km`}
        </div>
      </div>

      {/* Package Box on right */}
      <div className={`delivery-icon-btn package-side ${progress >= 100 ? 'delivered' : ''}`}>
        <Package size={17} className="delivery-neon-icon" />
      </div>
    </div>
  );
}
