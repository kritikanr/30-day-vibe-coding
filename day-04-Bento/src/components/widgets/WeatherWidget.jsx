import React, { useState } from 'react';
import { playSound } from '../../utils/sound';

export default function WeatherWidget() {
  const [unit, setUnit] = useState('C');
  const [cityIndex, setCityIndex] = useState(0);

  const cities = [
    { name: 'Dubai', tempC: 32, cond: 'Sunny & Warm' },
    { name: 'San Francisco', tempC: 21, cond: 'Coastal Breeze' },
    { name: 'Tokyo', tempC: 25, cond: 'Partly Cloudy' },
    { name: 'Zurich', tempC: 18, cond: 'Clear Sky' },
  ];

  const current = cities[cityIndex];
  const displayTemp = unit === 'C' ? current.tempC : Math.round((current.tempC * 9) / 5 + 32);

  const toggleUnit = (e) => {
    e.stopPropagation();
    playSound('click');
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  const handleNextCity = () => {
    playSound('click');
    setCityIndex((prev) => (prev + 1) % cities.length);
  };

  return (
    <div 
      className="bento-pill-widget weather-widget"
      onClick={handleNextCity}
      title="Click to cycle city"
      role="button"
      tabIndex={0}
    >
      {/* Left Temperature Readout with toggleable C/F */}
      <div className="weather-temp-group">
        <span className="weather-degrees">{displayTemp}°</span>
        <div className="weather-unit-toggle" onClick={toggleUnit} title="Toggle Celsius / Fahrenheit">
          <span className={`w-unit ${unit === 'C' ? 'active' : ''}`}>C</span>
          <span className="w-divider">/</span>
          <span className={`w-unit ${unit === 'F' ? 'active' : ''}`}>F</span>
        </div>
        <span className="weather-city-name">{current.name}</span>
      </div>

      {/* Right 3D Sun & Cloud Graphic */}
      <div className="weather-icon-visual">
        <div className="weather-golden-sun"></div>
        <div className="weather-cloud-shape"></div>
      </div>
    </div>
  );
}
