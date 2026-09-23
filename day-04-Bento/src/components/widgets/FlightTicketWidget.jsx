import React, { useState } from 'react';
import { Plane, X } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function FlightTicketWidget() {
  const [showPass, setShowPass] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleModal = () => {
    playSound('click');
    setShowPass(!showPass);
  };

  return (
    <>
      <div 
        className="bento-card bento-card-light flight-widget"
        onClick={toggleModal}
        title="View Boarding Pass"
        role="button"
        tabIndex={0}
      >
        {/* Top Departure & Flight Type */}
        <div className="flight-header">
          <div className="flight-meta-left">
            <span className="flight-label">Tomorrow</span>
            <span className="flight-time">8:45<small>am</small></span>
          </div>
          <div className="flight-meta-right">
            <span className="flight-duration">16h</span>
            <span className="flight-type">Direct</span>
          </div>
        </div>

        {/* Center Flight Path with Airplane */}
        <div className="flight-route-visual">
          <div className="flight-dashed-line"></div>
          <div className="flight-plane-badge">
            <Plane size={15} className="flight-plane-icon" fill="#FF5E1E" strokeWidth={0} />
          </div>
        </div>

        {/* Bottom Airports */}
        <div className="flight-airports">
          <div className="airport-col origin">
            <h4 className="airport-code">DXB</h4>
            <span className="airport-city">Dubai</span>
          </div>
          <div className="airport-col destination">
            <h4 className="airport-code">SFO</h4>
            <span className="airport-city">San Francisco</span>
          </div>
        </div>
      </div>

      {/* Boarding Pass Modal */}
      {showPass && (
        <div className="bento-modal-overlay" onClick={() => setShowPass(false)}>
          <div className="bento-modal flight-pass-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bento-modal-close" onClick={() => setShowPass(false)}>
              <X size={18} />
            </button>
            <div className="pass-header">
              <div className="pass-airline">EMIRATES • EK 225</div>
              <span className="pass-class">BUSINESS</span>
            </div>
            
            <div className="pass-route-row">
              <div>
                <h2>DXB</h2>
                <p>Dubai Intl</p>
                <strong>08:45 AM</strong>
              </div>
              <div className="pass-airplane-sep">
                <Plane size={20} fill="#FF5E1E" strokeWidth={0} />
                <span>16h 00m</span>
              </div>
              <div>
                <h2>SFO</h2>
                <p>San Francisco</p>
                <strong>01:45 PM</strong>
              </div>
            </div>

            <div className="pass-details-grid">
              <div>
                <span className="detail-lbl">PASSENGER</span>
                <span className="detail-val">KRITIKA / V</span>
              </div>
              <div>
                <span className="detail-lbl">GATE</span>
                <span className="detail-val gate-val">B24</span>
              </div>
              <div>
                <span className="detail-lbl">SEAT</span>
                <span className="detail-val seat-val">12A</span>
              </div>
              <div>
                <span className="detail-lbl">ZONE</span>
                <span className="detail-val">02</span>
              </div>
            </div>

            {/* Barcode strip */}
            <div className="pass-barcode-wrap">
              <div className="pass-fake-barcode"></div>
              <span className="pass-ticket-num">ETKT: 176 9902348512 • BOARDING 08:05 AM</span>
            </div>

            <button 
              className={`pass-add-apple ${isSaved ? 'saved' : ''}`}
              onClick={() => { playSound('success'); setIsSaved(!isSaved); }}
            >
              {isSaved ? 'Added to Apple Wallet ✓' : 'Add to Apple Wallet'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
