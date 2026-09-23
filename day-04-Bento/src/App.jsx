import React, { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { Shuffle, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { setSoundEnabled, playSound } from './utils/sound';
import { BENTO_LAYOUTS } from './data/layouts';

// The 6 Curated Bento Widgets
import OrangeCardWidget from './components/widgets/OrangeCardWidget';
import NepalTravelWidget from './components/widgets/NepalTravelWidget';
import EqualizerWidget from './components/widgets/EqualizerWidget';
import ClockWidget from './components/widgets/ClockWidget';
import FashionCardWidget from './components/widgets/FashionCardWidget';
import CalorieArcWidget from './components/widgets/CalorieArcWidget';

import './App.css';

export default function App() {
  const [layoutIndex, setLayoutIndex] = useState(0);
  const [theme, setTheme] = useState('light');
  const [soundOn, setSoundOn] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // References for measuring cards for FLIP animation
  const cardRefs = useRef({});
  const prevRectsRef = useRef({});

  const currentLayout = BENTO_LAYOUTS[layoutIndex];

  // Capture current positions of all 6 cards BEFORE state change
  const handleRegenerate = useCallback(() => {
    if (isAnimating) return;

    playSound('flip');
    setIsAnimating(true);

    const rects = {};
    Object.keys(currentLayout.cards).forEach((cardId) => {
      const el = cardRefs.current[cardId];
      if (el) {
        rects[cardId] = el.getBoundingClientRect();
      }
    });
    prevRectsRef.current = rects;

    // Advance to next curated layout
    setLayoutIndex((prev) => (prev + 1) % BENTO_LAYOUTS.length);
  }, [isAnimating, currentLayout]);

  // Sync theme attribute with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Keyboard shortcut: Spacebar to Regenerate Bento
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        handleRegenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRegenerate]);

  // FLIP animation execution in useLayoutEffect
  useLayoutEffect(() => {
    const prevRects = prevRectsRef.current;
    if (!prevRects || Object.keys(prevRects).length === 0) return;

    const cardsToAnimate = [];

    Object.keys(currentLayout.cards).forEach((cardId) => {
      const el = cardRefs.current[cardId];
      const oldRect = prevRects[cardId];

      if (el && oldRect) {
        const newRect = el.getBoundingClientRect();
        const deltaX = oldRect.left - newRect.left;
        const deltaY = oldRect.top - newRect.top;
        const scaleX = oldRect.width / Math.max(1, newRect.width);
        const scaleY = oldRect.height / Math.max(1, newRect.height);

        // INVERT: Put card back to its previous position & dimensions
        el.style.transformOrigin = 'top left';
        el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`;
        el.style.transition = 'none';
        el.style.zIndex = '20';

        cardsToAnimate.push(el);
      }
    });

    // PLAY: Release invert with smooth 680ms cubic-bezier transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cardsToAnimate.forEach((el) => {
          el.style.transition = 'transform 680ms cubic-bezier(0.18, 0.9, 0.25, 1)';
          el.style.transform = 'translate3d(0, 0, 0) scale(1, 1)';
        });

        setTimeout(() => {
          cardsToAnimate.forEach((el) => {
            el.style.transform = '';
            el.style.transformOrigin = '';
            el.style.transition = '';
            el.style.zIndex = '';
          });
          setIsAnimating(false);
          prevRectsRef.current = {};
        }, 700);
      });
    });
  }, [layoutIndex, currentLayout]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleSound = () => {
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    setSoundEnabled(nextVal);
    if (nextVal) playSound('click');
  };

  // Helper to map card ID to component
  const renderCard = (cardId, config) => {
    const { size } = config;
    switch (cardId) {
      case 'orangeCard':
        return <OrangeCardWidget size={size} />;
      case 'nepal':
        return <NepalTravelWidget size={size} />;
      case 'equalizer':
        return <EqualizerWidget size={size} />;
      case 'clock':
        return <ClockWidget size={size} />;
      case 'fashion':
        return <FashionCardWidget size={size} />;
      case 'calorie':
        return <CalorieArcWidget size={size} />;
      default:
        return null;
    }
  };

  return (
    <div className="bento-app-container">
      {/* Top Floating Control Bar */}
      <header className="bento-navbar">
        <div className="nav-brand-group">
          <div className="brand-logo-pill">B</div>
          <div className="brand-text-wrap">
            <span className="brand-title">Bento Generator</span>
            <span className="brand-badge">6 Adaptive Cards • {currentLayout.tag}</span>
          </div>
        </div>

        {/* Primary Creative Control: Regenerate Bento Button */}
        <div className="nav-center-action">
          <button 
            className={`btn-regenerate-bento ${isAnimating ? 'animating' : ''}`}
            onClick={handleRegenerate}
            disabled={isAnimating}
            title="Rearrange bento cards (or press Space)"
          >
            <div className="btn-icon-wrapper">
              <Shuffle size={15} className={`shuffle-icon ${isAnimating ? 'spinning' : ''}`} />
            </div>
            <span className="btn-regenerate-label">Regenerate Bento</span>
            <span className="btn-layout-indicator">0{layoutIndex + 1} / 0{BENTO_LAYOUTS.length}</span>
          </button>
        </div>

        <div className="nav-controls-group">
          <button 
            className="nav-pill-btn"
            onClick={toggleSound}
            title={soundOn ? 'Mute sound' : 'Enable sound'}
          >
            {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span className="btn-subtext">{soundOn ? 'SFX On' : 'Muted'}</span>
          </button>

          <button 
            className="nav-pill-btn"
            onClick={() => { playSound('toggle'); toggleTheme(); }}
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            <span className="btn-subtext">{theme === 'light' ? 'Night' : 'Day'}</span>
          </button>
        </div>
      </header>

      {/* 4-Column x 3-Row Bento Grid with FLIP Persistence */}
      <main className="bento-generator-grid">
        {Object.entries(currentLayout.cards).map(([cardId, config]) => {
          const gridStyle = {
            gridColumn: `${config.colStart} / span ${config.colSpan}`,
            gridRow: `${config.rowStart} / span ${config.rowSpan}`,
          };

          return (
            <div
              key={cardId}
              ref={(el) => (cardRefs.current[cardId] = el)}
              className={`bento-card-slot slot-${cardId} card-type-${config.size}`}
              style={gridStyle}
              data-card-id={cardId}
              data-size={config.size}
            >
              {renderCard(cardId, config)}
            </div>
          );
        })}
      </main>

      {/* Subtle Hint Footer */}
      <footer className="bento-generator-footer">
        <span className="footer-hint">Press <kbd>Space</kbd> or click <strong>Regenerate Bento</strong> to rearrange layouts</span>
      </footer>
    </div>
  );
}
