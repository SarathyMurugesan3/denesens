import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import Modal from '../components/Modal';
import { fetchServices, subscribeCMSUpdate } from '../services/api';
import { Link } from 'react-router-dom';

export const Services = () => {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);

  const loadData = () => {
    fetchServices().then(res => setServices(res));
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeCMSUpdate(() => {
      loadData();
    });
    return () => unsubscribe();
  }, []);

  const categories = ['All', 'Development', 'Intelligence', 'Infrastructure', 'Design & Strategy'];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-gold-700">OUR SERVICE OFFERINGS</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900">
            Custom Software & Technology Consulting
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            We deliver tailored digital products across enterprise software development, intelligent AI engines, cloud DevOps, and strategic IT advisory.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl border transition-all ${
                activeCategory === cat
                  ? 'bg-gold-gradient text-slate-950 border-gold-400 shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-gold-400 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service._id} service={service} onSelect={setSelectedService} />
          ))}
        </div>

        {/* Service Detail Modal */}
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService?.title || ''}
        >
          {selectedService && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-3 py-1 rounded border border-gold-500/20">
                  {selectedService.category}
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {selectedService.fullDesc}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Key Features & Modules:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.features?.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-300 bg-dark-900 p-2 rounded border border-dark-700">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-dark-700 flex justify-end">
                <Link
                  to="/contact"
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-dark-950 bg-gold-gradient rounded-xl shadow-gold-glow"
                >
                  Request Technical Proposal
                </Link>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </div>
  );
};

export default Services;
