import React from 'react';

/**
 * Recreates the visiting card's thin gold vertical lines 
 * with diamond/rhombus shapes stacked along the edges.
 */
export const GoldOrnament = ({ className = '', direction = 'vertical' }) => {
  if (direction === 'horizontal') {
    return (
      <div className={`flex items-center justify-center gap-3 w-full my-6 ${className}`}>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-500/50 to-gold-500" />
        <div className="flex items-center gap-1.5 text-gold-500">
          <span className="w-1.5 h-1.5 rotate-45 border border-gold-400 bg-dark-900" />
          <span className="w-2.5 h-2.5 rotate-45 bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 shadow-gold-glow" />
          <span className="w-1.5 h-1.5 rotate-45 border border-gold-400 bg-dark-900" />
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-500/50 to-gold-500" />
      </div>
    );
  }

  return (
    <div className={`hidden lg:flex flex-col items-center gap-4 py-8 pointer-events-none select-none ${className}`}>
      <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-500/40 to-gold-500" />
      <div className="flex flex-col items-center gap-2 text-gold-500">
        <span className="w-2 h-2 rotate-45 border border-gold-400/80 bg-dark-900" />
        <span className="w-3.5 h-3.5 rotate-45 bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 shadow-gold-glow" />
        <span className="w-2 h-2 rotate-45 border border-gold-400/80 bg-dark-900" />
      </div>
      <div className="w-[1px] h-24 bg-gradient-to-b from-gold-500 via-gold-500/30 to-transparent" />
    </div>
  );
};

export default GoldOrnament;
