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
      className="relative group rounded-2xl bg-white border border-slate-200 p-8 flex flex-col justify-between shadow-card hover:shadow-luxury hover:border-gold-400/50 transition-all duration-300 overflow-hidden"
    >
      <div>
        {/* Category Badge & Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-xl bg-slate-50 border border-gold-400/30 flex items-center justify-center text-gold-600 group-hover:scale-110 group-hover:bg-gold-100 transition-all duration-300">
            <IconComponent className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-gold-700 bg-gold-100 border border-gold-400/30 px-3 py-1 rounded-full">
            {service.category}
          </span>
        </div>

        {/* Service Title & Description */}
        <h3 className="text-xl font-bold font-heading text-slate-900 group-hover:text-gold-700 transition-colors mb-3">
          {service.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
          {service.shortDesc}
        </p>

        {/* Feature Highlights Bullet list */}
        {service.features && (
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-center text-xs text-slate-700 gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
        <div className="flex flex-wrap gap-1.5">
          {service.tags?.slice(0, 2).map((t, idx) => (
            <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
              #{t}
            </span>
          ))}
        </div>
        <button
          onClick={() => onSelect && onSelect(service)}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-700 hover:text-slate-900 transition-colors"
        >
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
