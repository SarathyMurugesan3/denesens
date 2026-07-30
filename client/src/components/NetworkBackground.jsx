import React from 'react';

export const NetworkBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-white">
      {/* Crisp Subtle Grid Lines for White Theme */}
      <svg className="absolute w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldStreak" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="50%" stopColor="#B8860B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#goldStreak)" strokeWidth="1" strokeDasharray="6 8" />
        <line x1="0" y1="45%" x2="100%" y2="45%" stroke="url(#goldStreak)" strokeWidth="1" strokeDasharray="10 15" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="url(#goldStreak)" strokeWidth="1" strokeDasharray="8 12" />
      </svg>
    </div>
  );
};

export default NetworkBackground;
