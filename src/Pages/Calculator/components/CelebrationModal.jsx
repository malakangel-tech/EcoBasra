import React from 'react';

export default function CelebrationModal({ message }) {
  return (
    <div className="celebration-overlay">
      <div className="celebration-card">
        <div className="celebration-emojis">🎉 🌴 🌿</div>
        <h3>إنجاز بيئي جديد!</h3>
        <p>{message}</p>
        <div className="celebration-badge">استمر في حماية بيئة البصرة 💚</div>
      </div>

      <div className="confetti-container">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="confetti-item"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.7}s`
            }}
          >
            {['✨', '🌱', '💧', '🍃', '⭐', '🎈'][i % 6]}
          </span>
        ))}
      </div>
    </div>
  );
}