import React from 'react';

export const NetworkBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated SVG Grid Matrix & Clean Circuit Lines without floating bubbles */}
      <svg className="absolute w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldStreak" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E5A900" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Crisp Network Grid Lines */}
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#goldStreak)" strokeWidth="1" strokeDasharray="6 8" />
        <line x1="0" y1="45%" x2="100%" y2="45%" stroke="url(#goldStreak)" strokeWidth="1" strokeDasharray="10 15" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="url(#goldStreak)" strokeWidth="1" strokeDasharray="8 12" />
      </svg>
    </div>
  );
};

export default NetworkBackground;

