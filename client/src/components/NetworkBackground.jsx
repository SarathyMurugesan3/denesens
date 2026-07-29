import React from 'react';
import { motion } from 'framer-motion';

export const NetworkBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Radial Gold Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gold-500/10 via-gold-600/5 to-transparent rounded-full blur-3xl" />
      
      {/* Animated SVG Circuit Signal Lines */}
      <svg className="absolute w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldStreak" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="50%" stopColor="#F5D67A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B8860B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal Network Lines */}
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#goldStreak)" strokeWidth="1" strokeDasharray="6 8" />
        <line x1="0" y1="45%" x2="100%" y2="45%" stroke="url(#goldStreak)" strokeWidth="1" strokeDasharray="10 15" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="url(#goldStreak)" strokeWidth="1" strokeDasharray="8 12" />

        {/* Network Nodes */}
        <circle cx="15%" cy="20%" r="3" fill="#F5D67A" className="animate-pulse" />
        <circle cx="45%" cy="45%" r="4" fill="#D4AF37" className="animate-pulse" />
        <circle cx="80%" cy="75%" r="3" fill="#F5D67A" className="animate-pulse" />
      </svg>

      {/* Floating Gold Nodes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-gold-400 rounded-full shadow-gold-glow opacity-40"
          style={{
            top: `${(i * 8 + 12) % 90}%`,
            left: `${(i * 13 + 5) % 95}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
};

export default NetworkBackground;
