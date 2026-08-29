
import React from 'react';
import { ACTION_CONFIG } from '../data/ecoData';

export default function ImpactForm({ inputs, onInputChange, onSubmit, pointsToAdd }) {
  return (
    <form onSubmit={onSubmit} className="impact-form">
      <h2 className="form-heading">📝 Enter Your Daily Achievements:</h2>
      <p className="form-subheading">
        Select the quantities or activities you completed today to calculate your immediate impact and earn points:
      </p>

      <div className="action-list">
        {Object.keys(ACTION_CONFIG).map((key) => {
          const cfg = ACTION_CONFIG[key];
          return (
            <div key={key} className="action-item">
              <div className="action-info">
                <span className="action-icon">{cfg.icon}</span>
                <div>
                  <h4 className="action-title">{cfg.title}</h4>
                  <p className="action-desc">{cfg.description}</p>
                  <span className="action-pts">+{cfg.pointsPerUnit} Points / {cfg.unit}</span>
                </div>
              </div>

              <div className="action-input-wrapper">
                <input
                  type="number"
                  min="0"
                  value={inputs[key] || ''}
                  onChange={(e) => onInputChange(key, e.target.value)}
                  placeholder="0"
                  className="action-input"
                />
                <span className="action-unit">{cfg.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={pointsToAdd <= 0}
        className={`submit-btn ${pointsToAdd > 0 ? 'active' : 'disabled'}`}
      >
        🚀 {pointsToAdd > 0 ? `Log Achievement & Claim (+${pointsToAdd} Points)` : 'Enter a value in one of the fields above'}
      </button>
    </form>
  );
}

