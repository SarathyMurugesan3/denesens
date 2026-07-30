import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';
import { fetchPortfolio } from '../services/api';

export const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);

  useEffect(() => {
    fetchPortfolio().then(res => setCaseStudies(res));
  }, []);

  const categories = ['All', ...new Set(caseStudies.map(cs => cs.category))];

  const filteredStudies = filter === 'All'
    ? caseStudies
    : caseStudies.filter(cs => cs.category === filter);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-dark-950 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-gold-400">CASE STUDIES & PORTFOLIO</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
            <span className="gold-text">Proven Client & Product Impact</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Examine how Denesens Solutions solves critical technical challenges across custom software engineering and proprietary SaaS products.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-xl border transition-all ${
                filter === cat
                  ? 'bg-gold-gradient text-dark-950 border-gold-400 font-extrabold shadow-gold-glow'
                  : 'bg-dark-900 text-gray-300 border-gold-500/10 hover:border-gold-400/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((cs) => (
            <motion.div
              key={cs._id || cs.id}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-dark-900 border border-gold-400/30 flex flex-col justify-between hover:border-gold-300 hover:shadow-gold-glow transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30">
                    {cs.category}
                  </span>
                  {cs.client && (
                    <span className="text-xs text-gray-400">{cs.client}</span>
                  )}
                </div>

                <h2 className="text-2xl font-bold font-heading text-white group-hover:text-gold-300 transition-colors">
                  {cs.title}
                </h2>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {cs.description}
                </p>

                {cs.impact && (
                  <div className="p-3.5 rounded-xl bg-dark-950 border border-gold-400/30 text-xs font-semibold text-gold-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>{cs.impact}</span>
                  </div>
                )}

                {cs.tags && cs.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {cs.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-gray-400 bg-dark-850 px-2.5 py-1 rounded-lg border border-dark-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-dark-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCaseStudy(cs)}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-white transition-colors"
                >
                  <span>View Case Overview</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-dark-900 border border-gold-400/30 text-center space-y-6 shadow-gold-glow">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">Have a Complex Enterprise Challenge?</h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
            Partner with Denesens Solutions to build scalable software architecture, custom AI engines, or cloud pipelines.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 text-xs font-bold uppercase tracking-widest shadow-gold-glow"
          >
            <span>Request Architecture Proposal</span>
          </Link>
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <Modal isOpen={!!selectedCaseStudy} onClose={() => setSelectedCaseStudy(null)} title={selectedCaseStudy.title}>
          <div className="space-y-4 text-gray-200">
            <p className="text-xs text-gold-300 font-semibold">{selectedCaseStudy.category} — {selectedCaseStudy.client}</p>
            <p className="text-sm leading-relaxed">{selectedCaseStudy.description}</p>
            {selectedCaseStudy.impact && (
              <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-bold">
                Impact: {selectedCaseStudy.impact}
              </div>
            )}
          </div>
        </Modal>
      )}

    </div>
  );
};

export default Portfolio;
