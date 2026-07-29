import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Brain, Cloud, Palette, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Code: Code,
  Smartphone: Smartphone,
  Brain: Brain,
  Cloud: Cloud,
  Palette: Palette,
  Compass: Compass,
};

export const ServiceCard = ({ service, onSelect }) => {
  const IconComponent = iconMap[service.icon] || Code;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="relative group rounded-2xl bg-dark-850/80 border border-gold-500/20 p-8 flex flex-col justify-between backdrop-blur-sm hover:border-gold-500/60 hover:shadow-gold-glow transition-all duration-300 overflow-hidden"
    >
      {/* Subtle Background Radial Glow on Hover */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/20 transition-all duration-500" />

      <div>
        {/* Category Badge & Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-xl bg-dark-900 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:border-gold-400 group-hover:bg-gold-500/10 transition-all duration-300">
            <IconComponent className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-gold-400/90 bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded-full">
            {service.category}
          </span>
        </div>

        {/* Service Title & Description */}
        <h3 className="text-xl font-bold font-heading text-white group-hover:text-gold-300 transition-colors mb-3">
          {service.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
          {service.shortDesc}
        </p>

        {/* Feature Highlights Bullet list */}
        {service.features && (
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-center text-xs text-gray-300 gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-dark-700/60 flex items-center justify-between mt-4">
        <div className="flex flex-wrap gap-1.5">
          {service.tags?.slice(0, 2).map((t, idx) => (
            <span key={idx} className="text-[10px] bg-dark-900 text-gray-400 px-2 py-0.5 rounded border border-dark-700">
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={() => onSelect && onSelect(service)}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 group-hover:text-gold-300 transition-colors"
        >
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
