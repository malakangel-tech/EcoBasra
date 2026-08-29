
import React from 'react';
import { SCIENTIFIC_SOURCES, ACTION_CONFIG } from '../data/ecoData';

export default function SourcesTab() {
  return (
    <div className="sources-tab">
      <h2>📚 Scientific Sources and Approved Formulas</h2>
      
      <div className="sources-cards">
        {SCIENTIFIC_SOURCES.map((src, i) => (
          <div key={i} className="source-card">
            <h4>{src.title}</h4>
            <p>{src.detail}</p>
          </div>
        ))}
      </div>

      <div className="sources-table-wrapper">
        <h3>🔬 Calculation Standards per Unit:</h3>
        <table className="sources-table">
          <thead>
            <tr>
              <th>Activity</th>
              <th>CO₂ / kg</th>
              <th>Water / Liter</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(ACTION_CONFIG).map((k) => {
              const c = ACTION_CONFIG[k];
              return (
                <tr key={k}>
                  <td>{c.title}</td>
                  <td>{c.co2Kg}</td>
                  <td>{c.waterLiters}</td>
                  <td className="pts-td">+{c.pointsPerUnit}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

