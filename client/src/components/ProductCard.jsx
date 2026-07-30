import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Zap, ArrowUpRight, Cpu } from 'lucide-react';

export const ProductCard = ({ product, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-2xl bg-white border border-slate-200 p-8 flex flex-col justify-between shadow-card hover:shadow-luxury hover:border-gold-400/50 transition-all duration-300 group"
    >
      {/* Product Card Top Info */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-gold-100 text-gold-700 border border-gold-400/30 px-3 py-1 rounded-md">
            {product.badge || 'In-House SaaS'}
          </span>
          <span className={`text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
            product.status === 'Live'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-amber-50 text-amber-700 border-amber-300'
          }`}>
            ● {product.status}
          </span>
        </div>

        <h3 className="text-2xl font-bold font-heading text-slate-900 group-hover:text-gold-700 transition-colors mb-2">
          {product.name}
        </h3>
        <p className="text-xs font-semibold text-gold-700 mb-4 tracking-wide uppercase">
          {product.tagline}
        </p>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Key Features */}
        <div className="space-y-2 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-gold-600" />
            <span>Key Capabilities</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {product.features?.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Badges & CTA */}
      <div>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-wrap gap-1.5">
            {product.techStack?.map((tech, idx) => (
              <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
                {tech}
              </span>
            ))}
          </div>

          <button
            onClick={() => onSelect && onSelect(product)}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 bg-gold-gradient hover:bg-gold-gradient-hover px-4 py-2 rounded-xl shadow-md transition-all"
          >
            <span>Product Details</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
