import React, { useState } from 'react';
import { playSound } from '../../utils/sound';

export default function BookReaderWidget() {
  const [pageIndex, setPageIndex] = useState(0);
  const [isTurning, setIsTurning] = useState(false);

  const chapters = [
    {
      chapter: 'Chapter 1',
      page: 'Page 90',
      title: 'Modern Banking',
      text: 'Banking today is more dynamic than ever. Seamless digital infrastructure, cryptographic ledgers, and instant settlement protocols redefine global commerce.'
    },
    {
      chapter: 'Chapter 2',
      page: 'Page 91',
      title: 'Decentralized Trust',
      text: 'Trust is no longer housed solely within stone vaults. Algorithmic consensus and sovereign identity grant users unprecedented autonomy over assets.'
    },
    {
      chapter: 'Chapter 3',
      page: 'Page 92',
      title: 'Tactile Interfaces',
      text: 'Human-computer interfaces thrive when digital artifacts mirror the tactile physics of paper, springs, and gears—grounding utility in visceral delight.'
    }
  ];

  const handleNextPage = () => {
    if (isTurning) return;
    playSound('flip');
    setIsTurning(true);
    setTimeout(() => {
      setPageIndex((prev) => (prev + 1) % chapters.length);
      setIsTurning(false);
    }, 280);
  };

  const current = chapters[pageIndex];

  return (
    <div 
      className="bento-card book-widget"
      onClick={handleNextPage}
      title="Click to turn book page"
      role="button"
      tabIndex={0}
    >
      {/* Outer leather/hardcover binding */}
      <div className="book-cover-backing"></div>

      {/* Realistic open book pages */}
      <div className={`book-pages-wrapper ${isTurning ? 'turning' : ''}`}>
        {/* Left page spine shadow */}
        <div className="book-spine-crease"></div>

        {/* Top page header */}
        <div className="book-page-meta">
          <span className="book-chapter-name">{current.chapter}</span>
          <span className="book-page-num">{current.page}</span>
        </div>

        {/* Content */}
        <div className="book-content-body">
          <h5 className="book-chapter-heading">{current.title}</h5>
          <p className="book-snippet-text">{current.text}</p>
        </div>

        {/* Page lines texture */}
        <div className="book-lines-decor">
          <span className="bline"></span>
          <span className="bline"></span>
          <span className="bline"></span>
        </div>

        {/* Bottom curl indicator */}
        <div className="book-curl-indicator">
          <span>Click to turn ⤹</span>
        </div>
      </div>
    </div>
  );
}
