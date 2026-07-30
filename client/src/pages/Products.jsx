import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import { fetchProducts, subscribeCMSUpdate } from '../services/api';
import { Link } from 'react-router-dom';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadData = () => {
    fetchProducts().then(res => setProducts(res));
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeCMSUpdate(() => {
      loadData();
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-gold-700">PROPRIETARY SAAS ECOSYSTEM</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900">
            In-House SaaS & Automation Tools
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Discover Denesens Solutions' turnkey enterprise products—built for autonomous knowledge management, DevOps observability, and zero-trust API protection.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onSelect={setSelectedProduct} />
          ))}
        </div>

        {/* Product Details Modal */}
        <Modal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          title={selectedProduct?.name || ''}
        >
          {selectedProduct && (
            <div className="space-y-6 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-800 bg-gold-100 px-3 py-1 rounded-full border border-gold-400/30">
                  {selectedProduct.badge}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                  selectedProduct.status === 'Live' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  Status: {selectedProduct.status}
                </span>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900 font-heading">{selectedProduct.tagline}</p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">
                  {selectedProduct.description}
                </p>
              </div>

              {selectedProduct.fullDetails && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="text-xs font-bold text-gold-700 uppercase tracking-wider">Full Platform Architecture & Technical Breakdown</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {selectedProduct.fullDetails}
                  </p>
                </div>
              )}

              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Enterprise Capabilities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProduct.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm">
                        <Zap className="w-4 h-4 text-gold-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProduct.techStack && selectedProduct.techStack.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Core Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.techStack.map((tech, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <Link
                  to="/contact"
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-950 bg-gold-gradient rounded-xl shadow-md hover:bg-gold-gradient-hover transition-all inline-flex items-center gap-2"
                >
                  <span>Request Demo & Enterprise License</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </div>
  );
};

export default Products;
