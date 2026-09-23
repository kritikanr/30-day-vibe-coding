import React from 'react';
import { Moon } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function NightModeWidget({ theme, onToggleTheme }) {
  const isDark = theme === 'dark';

  const handleToggle = () => {
    playSound('toggle');
    onToggleTheme();
  };

  return (
    <div 
      className="bento-pill-widget night-mode-widget"
      onClick={handleToggle}
      title="Click to toggle Light / Dark theme"
      role="button"
      tabIndex={0}
    >
      {/* Moon & Stars Icon */}
      <div className="night-icon-wrapper">
        <Moon size={16} className="night-moon-icon" fill="#818CF8" color="#818CF8" />
        <span className="night-star star-1">✦</span>
        <span className="night-star star-2">✦</span>
      </div>

      {/* Text Info */}
      <div className="night-text-group">
        <span className="night-title">{isDark ? 'Night' : 'Day'}</span>
        <span className="night-status">{isDark ? 'Mode On' : 'Mode Off'}</span>
      </div>

      {/* Tactile Toggle Switch */}
      <div className={`tactile-switch ${isDark ? 'on' : 'off'}`}>
        <div className="switch-thumb"></div>
      </div>
    </div>
  );
}
