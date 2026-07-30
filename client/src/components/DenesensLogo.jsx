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
      {/* Round Gold Logo Emblem */}
      <div className="relative group cursor-pointer flex-shrink-0">
        <div className={`relative rounded-full overflow-hidden border-2 border-gold-400 p-0.5 bg-white shadow-sm flex items-center justify-center ${sizeClasses[size] || 'h-10'} aspect-square`}>
          <img 
            src="/logo.jpg" 
            alt="Denesens Solutions Logo" 
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-heading font-extrabold tracking-[0.25em] text-slate-900 text-lg sm:text-xl leading-none">
            DENESENS
          </span>
          <span className="font-heading text-[9px] sm:text-[10px] tracking-[0.3em] text-gold-600 uppercase font-bold mt-1">
            BUILDING INTELLIGENT SOLUTIONS
          </span>
        </div>
      )}
    </div>
  );
};

export default DenesensLogo;
