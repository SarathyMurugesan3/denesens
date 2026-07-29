import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Zap, ArrowUpRight, Cpu } from 'lucide-react';

export const ProductCard = ({ product, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-2xl bg-dark-850 border border-gold-500/25 p-8 flex flex-col justify-between hover:border-gold-500/60 hover:shadow-gold-glow transition-all duration-300 group"
    >
      {/* Product Card Top Info */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-gold-500/10 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-md">
            {product.badge || 'In-House SaaS'}
          </span>
          <span className={`text-[10px] font-semibold tracking-wider px-2.5 py-0.5 rounded-full border ${
            product.status === 'Live'
              ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
              : 'bg-amber-950/60 text-amber-400 border-amber-500/40'
          }`}>
            ● {product.status}
          </span>
        </div>

        <h3 className="text-2xl font-bold font-heading text-white group-hover:text-gold-300 transition-colors mb-2">
          {product.name}
        </h3>
        <p className="text-xs font-medium text-gold-400/90 mb-4 tracking-wide uppercase">
          {product.tagline}
        </p>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Key Features */}
        <div className="space-y-2 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-gold-400" />
            <span>Key Capabilities</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {product.features?.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Badges & CTA */}
      <div>
        <div className="pt-4 border-t border-dark-700/60 flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-wrap gap-1.5">
            {product.techStack?.map((tech, idx) => (
              <span key={idx} className="text-[10px] font-medium bg-dark-900 text-gray-300 px-2.5 py-1 rounded border border-dark-700">
                {tech}
              </span>
            ))}
          </div>

          <button
            onClick={() => onSelect && onSelect(product)}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-dark-950 bg-gold-gradient hover:bg-gold-gradient-hover px-4 py-2 rounded-md shadow-gold-glow transition-all"
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
