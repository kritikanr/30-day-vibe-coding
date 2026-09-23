import React, { useState } from 'react';
import { Navigation, Clock, Footprints } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function RouteMapWidget() {
  const [isNavigating, setIsNavigating] = useState(false);

  const toggleNavigation = () => {
    playSound(isNavigating ? 'click' : 'success');
    setIsNavigating(!isNavigating);
  };

  return (
    <div 
      className="bento-card bento-card-light route-map-widget"
      onClick={toggleNavigation}
      title="Click to simulate route navigation"
      role="button"
      tabIndex={0}
    >
      {/* Top Trip Metrics Strip */}
      <div className="map-metrics-bar">
        <div className="map-stat-item">
          <Navigation size={10} className="map-stat-icon" />
          <span>8.56</span>
        </div>
        <div className="map-stat-divider"></div>
        <div className="map-stat-item">
          <Clock size={10} className="map-stat-icon" />
          <span>15m</span>
        </div>
        <div className="map-stat-divider"></div>
        <div className="map-stat-item">
          <Footprints size={10} className="map-stat-icon" />
          <span>5,448</span>
        </div>
      </div>

      {/* Stylized Vector Map Surface */}
      <div className="map-surface">
        {/* Street grid patterns */}
        <div className="map-grid-block block-1"></div>
        <div className="map-grid-block block-2"></div>
        <div className="map-grid-block block-3"></div>
        <div className="map-grid-block block-4"></div>
        <div className="map-river"></div>

        {/* SVG Route Path */}
        <svg viewBox="0 0 160 120" className="map-route-svg">
          {/* Street outline */}
          <path 
            d="M 30 100 L 95 100 L 95 30" 
            fill="none" 
            stroke="rgba(0,0,0,0.06)" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Active orange transit path */}
          <path 
            d="M 30 100 L 95 100 L 95 30" 
            fill="none" 
            stroke="#FF5E1E" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="map-path-line"
          />
          {/* Origin dot */}
          <circle cx="30" cy="100" r="4" fill="#FF5E1E" />
          <circle cx="30" cy="100" r="7" fill="none" stroke="#FF5E1E" strokeWidth="1" opacity="0.4" />
        </svg>

        {/* Destination Orange Pin */}
        <div className="map-destination-pin">
          <div className="pin-head">
            <div className="pin-inner-white"></div>
          </div>
          <div className="pin-pulse"></div>
        </div>

        {/* Start Label */}
        <div className="map-tag-origin">YOU</div>
      </div>
    </div>
  );
}
