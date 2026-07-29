import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import { fetchProducts } from '../services/api';
import { Link } from 'react-router-dom';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts().then(res => setProducts(res));
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-dark-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-gold-400">PROPRIETARY SAAS ECOSYSTEM</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
            In-House SaaS & Automation Tools
          </h1>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Discover Denesens Solutions' turnkey enterprise products—built for autonomous knowledge management, DevOps observability, and zero-trust API protection.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onSelect={setSelectedProduct} />
          ))}
        </div>

        {/* Product Modal */}
        <Modal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          title={selectedProduct?.name || ''}
        >
          {selectedProduct && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-3 py-1 rounded border border-gold-500/20">
                  {selectedProduct.badge}
                </span>
                <p className="text-sm text-gold-300 font-semibold mt-2">{selectedProduct.tagline}</p>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {selectedProduct.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Key Capabilities:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProduct.features?.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300 bg-dark-900 p-2.5 rounded border border-dark-700">
                      <Zap className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-dark-700 flex justify-end">
                <Link
                  to="/contact"
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-dark-950 bg-gold-gradient rounded-xl shadow-gold-glow"
                >
                  Schedule Demo & Trial
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
