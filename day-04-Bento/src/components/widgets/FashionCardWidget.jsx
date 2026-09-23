import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function FashionCardWidget({ size = 'wide' }) {
  const [lookIndex, setLookIndex] = useState(0);

  const collections = [
    { title: 'Where Fashion Meets Elegance.', tag: 'Autumn / Winter', season: 'Look 01', note: 'Tailored architectural silhouettes crafted in charcoal wool.' },
    { title: 'Structured Lines & Avant-Garde Form.', tag: 'Haute Couture', season: 'Look 02', note: 'Monochrome precision with sculpted waistlines and sharp collars.' },
    { title: 'Sartorial Mastery Across Modern Cuts.', tag: 'Runway Edition', season: 'Look 03', note: 'Contemporary outerwear redefining minimalist luxury.' },
  ];

  const handleNextLook = (e) => {
    e.stopPropagation();
    playSound('click');
    setLookIndex((prev) => (prev + 1) % collections.length);
  };

  const current = collections[lookIndex];

  return (
    <div 
      className={`bento-card bento-card-light fashion-widget size-${size}`}
      onClick={handleNextLook}
      title="Click to view next editorial look"
      role="button"
      tabIndex={0}
    >
      {size === 'compact' && (
        <div className="fashion-compact-layout">
          <div className="fashion-compact-header">
            <span className="fashion-compact-title">Where Fashion Meets Elegance.</span>
            <span className="fashion-orange-dot"></span>
          </div>
          <div className="fashion-compact-img-wrap">
            <img src="/images/fashion.jpg" alt="Fashion Models" className="fashion-compact-img" loading="lazy" />
            <button className="fashion-arrow-circle-btn mini" onClick={handleNextLook}>
              <ArrowRight size={11} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}

      {size === 'wide' && (
        <div className="fashion-wide-layout">
          <div className="fashion-wide-content">
            <div className="fashion-header">
              <span className="fashion-wide-badge">{current.tag}</span>
              <span className="fashion-orange-dot"></span>
            </div>
            <h4 className="fashion-headline">{current.title}</h4>
            <p className="fashion-wide-desc">{current.note}</p>
            <div className="fashion-wide-footer">
              <span className="fashion-look-num">{current.season}</span>
              <button className="fashion-arrow-circle-btn" onClick={handleNextLook}>
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          <div className="fashion-wide-img-wrap">
            <img src="/images/fashion.jpg" alt="Fashion Runway Models" className="fashion-photo" loading="lazy" />
          </div>
        </div>
      )}

      {size === 'tall' && (
        <div className="fashion-tall-layout">
          <img src="/images/fashion.jpg" alt="Runway Models" className="fashion-tall-img" loading="lazy" />
          <div className="fashion-tall-overlay">
            <div className="fashion-tall-header">
              <span className="fashion-look-badge">{current.season}</span>
              <span className="fashion-orange-dot"></span>
            </div>
            <div className="fashion-tall-footer">
              <h4 className="fashion-tall-title">{current.title}</h4>
              <button className="fashion-arrow-circle-btn" onClick={handleNextLook}>
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {size === 'hero' && (
        <div className="fashion-hero-layout">
          <div className="fashion-hero-img-col">
            <img src="/images/fashion.jpg" alt="Fashion Editorial" className="fashion-hero-img" loading="lazy" />
            <div className="fashion-hero-tag-chip">
              <Sparkles size={12} /> {current.tag}
            </div>
          </div>
          <div className="fashion-hero-content-col">
            <div className="fashion-hero-top">
              <span className="fashion-eyebrow">EDITORIAL VOL. 04</span>
              <span className="fashion-orange-dot large"></span>
            </div>
            <h3 className="fashion-hero-heading">{current.title}</h3>
            <p className="fashion-hero-body">{current.note}</p>
            <div className="fashion-hero-credits">
              <div className="credit-item">
                <span className="c-lbl">CREATIVE DIRECTION</span>
                <strong className="c-val">Paris / Milan Studio</strong>
              </div>
              <div className="credit-item">
                <span className="c-lbl">PALETTE</span>
                <strong className="c-val">Noir, Oatmeal & Slate</strong>
              </div>
            </div>
            <div className="fashion-hero-bottom-bar">
              <span className="fashion-look-pill">{current.season} of 08</span>
              <button className="fashion-hero-next-btn" onClick={handleNextLook}>
                <span>Next Runway Look</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
