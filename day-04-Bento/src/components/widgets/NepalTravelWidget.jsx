import React, { useState } from 'react';
import { Check, X, MapPin, Compass, Mountain } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function NepalTravelWidget({ size = 'hero' }) {
  const [isBooked, setIsBooked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleBooking = (e) => {
    e.stopPropagation();
    playSound('success');
    setIsBooked(true);
    setTimeout(() => {
      setShowModal(false);
    }, 1200);
  };

  const toggleBook = (e) => {
    e.stopPropagation();
    playSound(isBooked ? 'click' : 'success');
    setIsBooked(!isBooked);
  };

  return (
    <>
      <div 
        className={`bento-card bento-card-dark nepal-widget size-${size}`}
        onClick={() => { playSound('click'); setShowModal(true); }}
        title="Explore Nepal Expedition"
        role="button"
        tabIndex={0}
      >
        {size === 'compact' && (
          <div className="nepal-compact-layout">
            <div className="nepal-header">
              <div className="nepal-title-wrap">
                <span className="nepal-eyebrow">Travel to</span>
                <h3 className="nepal-title">Nepal</h3>
              </div>
              <div className="nepal-thumb">
                <img src="/images/nepal.jpg" alt="Nepal" className="nepal-thumb-img" loading="lazy" />
              </div>
            </div>
            <p className="nepal-desc-short">Himalayan peaks & alpine heritage.</p>
            <div className="nepal-footer">
              <button className={`nepal-book-btn ${isBooked ? 'booked' : ''}`} onClick={toggleBook}>
                {isBooked ? <Check size={12} /> : <span>Booking •</span>}
              </button>
            </div>
          </div>
        )}

        {size === 'wide' && (
          <div className="nepal-wide-layout">
            <div className="nepal-wide-thumb">
              <img src="/images/nepal.jpg" alt="Nepal" className="nepal-wide-img" loading="lazy" />
              <span className="nepal-altitude-badge">5,364m</span>
            </div>
            <div className="nepal-wide-content">
              <span className="nepal-eyebrow">Travel to</span>
              <h3 className="nepal-title">Nepal</h3>
              <p className="nepal-desc">
                Embark on a journey through Nepal, where the majestic Himalayas meet vibrant cultures.
              </p>
              <div className="nepal-footer">
                <button className={`nepal-book-btn ${isBooked ? 'booked' : ''}`} onClick={toggleBook}>
                  {isBooked ? <span>Confirmed ✓</span> : <span>Booking •</span>}
                </button>
              </div>
            </div>
          </div>
        )}

        {size === 'tall' && (
          <div className="nepal-tall-layout">
            <div className="nepal-tall-hero">
              <img src="/images/nepal.jpg" alt="Nepal" className="nepal-tall-img" loading="lazy" />
              <div className="nepal-tall-badge"><Mountain size={12} /> Everest Range</div>
            </div>
            <div className="nepal-tall-body">
              <span className="nepal-eyebrow">Expedition</span>
              <h3 className="nepal-title">Nepal</h3>
              <p className="nepal-desc">Where sacred summits touch the sky and alpine trails inspire the soul.</p>
              <button className={`nepal-book-btn ${isBooked ? 'booked' : ''}`} onClick={toggleBook}>
                {isBooked ? <span>Reserved ✓</span> : <span>Booking •</span>}
              </button>
            </div>
          </div>
        )}

        {size === 'hero' && (
          <div className="nepal-hero-layout">
            <div className="nepal-hero-bg">
              <img src="/images/nepal.jpg" alt="Himalayas" className="nepal-hero-img" loading="lazy" />
              <div className="nepal-hero-overlay"></div>
            </div>
            <div className="nepal-hero-content">
              <div className="nepal-hero-top">
                <span className="nepal-hero-eyebrow"><Compass size={13} /> Alpine Expedition</span>
                <span className="nepal-season-tag">Autumn Season</span>
              </div>
              <div className="nepal-hero-middle">
                <h2 className="nepal-hero-title">Travel to Nepal</h2>
                <p className="nepal-hero-desc">
                  Embark on an iconic journey through Nepal, where the world's highest peaks meet ancient Sherpa traditions, terraced emerald valleys, and sacred Buddhist monasteries.
                </p>
              </div>
              <div className="nepal-hero-bottom">
                <div className="nepal-hero-stats">
                  <div>
                    <span className="nstat-lbl">PEAK ALTITUDE</span>
                    <strong className="nstat-v">5,364m</strong>
                  </div>
                  <div>
                    <span className="nstat-lbl">ROUTE DURATION</span>
                    <strong className="nstat-v">12 Days</strong>
                  </div>
                  <div>
                    <span className="nstat-lbl">DIFFICULTY</span>
                    <strong className="nstat-v">Moderate</strong>
                  </div>
                </div>
                <button className={`nepal-hero-book-btn ${isBooked ? 'booked' : ''}`} onClick={toggleBook}>
                  {isBooked ? <span>Expedition Confirmed ✓</span> : <span>Reserve Expedition →</span>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Modal */}
      {showModal && (
        <div className="bento-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="bento-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bento-modal-close" onClick={() => setShowModal(false)}>
              <X size={18} />
            </button>
            <div className="nepal-modal-hero">
              <img src="/images/nepal.jpg" alt="Everest Region" />
              <div className="nepal-modal-badge">
                <MapPin size={14} /> Annapurna Circuit
              </div>
            </div>
            <div className="nepal-modal-body">
              <h4>Everest Base Camp & Heritage Trek</h4>
              <p>Experience alpine panoramas, Sherpa hospitality, and ancient monasteries across 12 days.</p>
              <div className="nepal-modal-meta">
                <div>
                  <span className="meta-label">Duration</span>
                  <span className="meta-val">12 Days</span>
                </div>
                <div>
                  <span className="meta-label">Altitude</span>
                  <span className="meta-val">5,364m</span>
                </div>
                <div>
                  <span className="meta-label">Season</span>
                  <span className="meta-val">Autumn / Spring</span>
                </div>
              </div>
              <button className="nepal-modal-submit" onClick={handleBooking}>
                {isBooked ? 'Reservation Confirmed ✓' : 'Reserve Expedition — $1,850'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
