import React from 'react';

export const DenesensLogo = ({ size = 'medium', showText = true, className = '' }) => {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-16',
    xl: 'h-24'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Stylized Gold Circuit D Logo Mark */}
      <div className="relative group cursor-pointer">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700 opacity-30 blur-sm group-hover:opacity-75 transition duration-500"></div>
        <img 
          src="/logo.jpg" 
          alt="Denesens Solutions Logo" 
          className={`relative rounded-md object-contain ${sizeClasses[size] || 'h-10'}`}
          onError={(e) => {
            // Render inline SVG if image file is not found
            e.target.style.display = 'none';
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-heading font-extrabold tracking-[0.25em] text-white text-lg sm:text-xl leading-none">
            DENESENS
          </span>
          <span className="font-heading text-[9px] sm:text-[10px] tracking-[0.3em] text-gold-400 uppercase font-semibold mt-1">
            BUILDING INTELLIGENT SOLUTIONS
          </span>
        </div>
      )}
    </div>
  );
};

export default DenesensLogo;
