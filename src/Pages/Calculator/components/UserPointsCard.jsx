
import React from 'react';
import { calculateUserRank } from '../data/ecoData';

export default function UserPointsCard({ points }) {
  const rank = calculateUserRank(points);
  const progressPercent = Math.min(100, (points / rank.nextAt) * 100);

  return (
    <div className="user-points-card">
      <div className="card-header">
        <span className="badge-tag">EcoDrop Basra Profile</span>
        <span className="rank-emoji">{rank.badge}</span>
      </div>
      
      <div className="rank-title">{rank.title}</div>

      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="card-footer">
        <span className="footer-label">Points Balance:</span>
        <span className="footer-points">
          {points} <span className="pts-unit">Points</span>
        </span>
      </div>
    </div>
  );
}

