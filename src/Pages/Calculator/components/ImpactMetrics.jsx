
import React from 'react';

export default function ImpactMetrics({ impact }) {
  return (
    <div className="metrics-container">
      <h3 className="metrics-title">📈 Your Daily Environmental Impact:</h3>

      <div className="metrics-grid">
        <div className="metric-card co2">
          <span className="metric-label">CO₂ Emissions Reduced</span>
          <div className="metric-value">{impact.co2} <span>kg</span></div>
        </div>

        <div className="metric-card water">
          <span className="metric-label">Water Protected/Saved</span>
          <div className="metric-value">{impact.water} <span>Liters</span></div>
        </div>

        <div className="metric-card waste">
          <span className="metric-label">Waste Diverted</span>
          <div className="metric-value">{impact.waste} <span>kg</span></div>
        </div>

        <div className="metric-card energy">
          <span className="metric-label">Energy Saved</span>
          <div className="metric-value">{impact.energy} <span>kWh</span></div>
        </div>
      </div>

      <div className="basra-tip-box">
        <strong>Did you know? 💡</strong>
        <p>Saving water and recycling directly reduce pollutants reaching the Shatt al-Arab and waterways in Basra.</p>
      </div>
    </div>
  );
}

