
import React, { useState, useEffect, useMemo } from 'react';
import { ACTION_CONFIG } from './data/ecoData';
import UserPointsCard from './components/UserPointsCard';
import ImpactForm from './components/ImpactForm';
import ImpactMetrics from './components/ImpactMetrics';
import CelebrationModal from './components/CelebrationModal';
import FlowchartTab from './components/FlowchartTab';
import SourcesTab from './components/SourcesTab';
import './EcoCalculator.css';

export default function EcoCalculator() {
  const [inputs, setInputs] = useState({
    tree: 0, recycle: 0, noPlastic: 0, reportLeak: 0, saveEnergy: 0
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ecodrop_profile');
    return saved ? JSON.parse(saved) : { points: 120, history: [] };
  });

  const [showCelebration, setShowCelebration] = useState(false);
  const [activeTab, setActiveTab] = useState('calc');

  useEffect(() => {
    localStorage.setItem('ecodrop_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Calculate cumulative impact
  const currentImpact = useMemo(() => {
    let co2 = 0, water = 0, waste = 0, energy = 0, pointsToAdd = 0;

    Object.keys(inputs).forEach((key) => {
      const val = Number(inputs[key]) || 0;
      const cfg = ACTION_CONFIG[key];
      if (cfg && val > 0) {
        co2 += cfg.co2Kg * val;
        water += cfg.waterLiters * val;
        waste += cfg.wasteKg * val;
        energy += cfg.energyKwh * val;
        pointsToAdd += cfg.pointsPerUnit * val;
      }
    });

    return {
      co2: co2.toFixed(2),
      water: Math.round(water),
      waste: waste.toFixed(1),
      energy: energy.toFixed(1),
      pointsToAdd
    };
  }, [inputs]);

  const handleInputChange = (key, val) => {
    const num = Math.max(0, parseInt(val) || 0);
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const handleLogAction = (e) => {
    e.preventDefault();
    if (currentImpact.pointsToAdd <= 0) return;

    setUserProfile((prev) => ({
      ...prev,
      points: prev.points + currentImpact.pointsToAdd,
    }));

    setShowCelebration(true);
    setInputs({ tree: 0, recycle: 0, noPlastic: 0, reportLeak: 0, saveEnergy: 0 });

    setTimeout(() => setShowCelebration(false), 3000);
  };

  return (
    <div className="eco-calculator-wrapper">
      {showCelebration && (
        <CelebrationModal message={`You successfully added ${currentImpact.pointsToAdd} environmental points to your account!`} />
      )}

      {/* Header & Banner */}
      <div className="calc-header-banner">
        <div>
          <span className="hero-tag">Environmental Impact Calculator</span>
          <h1>EcoDrop Basra Impact Calculator 🌿</h1>
          <p>Calculate the impact of your daily contribution to protecting the Shatt al-Arab and Basra's environment</p>
        </div>
        <UserPointsCard points={userProfile.points} />
      </div>

      {/* Tabs */}
      <div className="calc-tabs">
        <button 
          onClick={() => setActiveTab('calc')} 
          className={activeTab === 'calc' ? 'active' : ''}
        >
          🧮 Calculator & Achievements
        </button>
        <button 
          onClick={() => setActiveTab('flowchart')} 
          className={activeTab === 'flowchart' ? 'active' : ''}
        >
          📊 Impact Flowchart
        </button>
        <button 
          onClick={() => setActiveTab('sources')} 
          className={activeTab === 'sources' ? 'active' : ''}
        >
          📚 Scientific Sources
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'calc' && (
        <div className="calc-main-grid">
          <ImpactForm 
            inputs={inputs} 
            onInputChange={handleInputChange} 
            onSubmit={handleLogAction} 
            pointsToAdd={currentImpact.pointsToAdd} 
          />
          <ImpactMetrics impact={currentImpact} />
        </div>
      )}

      {activeTab === 'flowchart' && <FlowchartTab />}
      {activeTab === 'sources' && <SourcesTab />}
    </div>
  );
}

