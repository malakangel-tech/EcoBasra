
import React from 'react';

export default function FlowchartTab() {
  return (
    <div className="flowchart-tab">
      <h2>📊 Environmental Impact Flowchart in Basra</h2>
      <p className="tab-subtitle">The path from your simple daily action to a tangible benefit for the province:</p>

      <div className="flowchart-grid">
        <div className="flow-step step-1">
          <span className="step-num">1</span>
          <h4>Individual Action</h4>
          <p>Planting a seedling, reducing plastic, or reporting a leak</p>
        </div>

        <div className="flow-step step-2">
          <span className="step-num">2</span>
          <h4>Direct Calculation</h4>
          <p>Converting the action into carbon equivalents and liters of water</p>
        </div>

        <div className="flow-step step-3">
          <span className="step-num">3</span>
          <h4>Collecting Points</h4>
          <p>Improving your environmental rank and contributing to the EcoDrop platform</p>
        </div>

        <div className="flow-step step-4">
          <span className="step-num">4</span>
          <h4>A Better Basra Environment</h4>
          <p>Cleaner air, cleaner water, and more green spaces</p>
        </div>
      </div>
    </div>
  );
}

