import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight, CheckCircle2, ShieldCheck, Cpu, ExternalLink } from 'lucide-react';
import Modal from '../components/Modal';
import { fetchPortfolio, subscribeCMSUpdate } from '../services/api';

export const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);

  const loadData = () => {
    fetchPortfolio().then(res => setCaseStudies(res));
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeCMSUpdate(() => {
      loadData();
    });
    return () => unsubscribe();
  }, []);

  const categories = ['All', ...new Set(caseStudies.map(cs => cs.category))];

  const filteredStudies = filter === 'All'
    ? caseStudies
    : caseStudies.filter(cs => cs.category === filter);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-gold-700">CASE STUDIES & PORTFOLIO</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900">
            <span className="gold-text">Proven Client & Product Impact</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
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
                  ? 'bg-gold-gradient text-slate-950 border-gold-400 font-extrabold shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-gold-400 hover:text-slate-900'
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
              className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between shadow-card hover:shadow-luxury hover:border-gold-400/60 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gold-100 text-gold-800 border border-gold-400/30">
                    {cs.category}
                  </span>
                  {cs.client && (
                    <span className="text-xs font-semibold text-slate-500">{cs.client}</span>
                  )}
                </div>

                <h2 className="text-2xl font-bold font-heading text-slate-900 group-hover:text-gold-700 transition-colors">
                  {cs.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {cs.description}
                </p>

                {cs.impact && (
                  <div className="p-3.5 rounded-xl bg-gold-50 border border-gold-300 text-xs font-bold text-gold-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                    <span>{cs.impact}</span>
                  </div>
                )}

                {cs.tags && cs.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {cs.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCaseStudy(cs)}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold-700 hover:text-slate-900 transition-colors"
                >
                  <span>View Case Overview</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rich Modal Case Study Overview */}
        {selectedCaseStudy && (
          <Modal isOpen={!!selectedCaseStudy} onClose={() => setSelectedCaseStudy(null)} title={selectedCaseStudy.title}>
            <div className="space-y-6 text-slate-700">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-gold-100 text-gold-800 border border-gold-400/30">
                  {selectedCaseStudy.category}
                </span>
                {selectedCaseStudy.client && (
                  <span className="text-xs font-bold text-slate-500">Client: {selectedCaseStudy.client}</span>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold-700 mb-1">Executive Summary</h4>
                <p className="text-sm leading-relaxed font-medium text-slate-800">{selectedCaseStudy.description}</p>
              </div>

              {selectedCaseStudy.overview && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold-700 mb-1">Full Project Overview</h4>
                  <p className="text-xs leading-relaxed font-medium text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">{selectedCaseStudy.overview}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedCaseStudy.challenge && (
                  <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200 space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-red-700">Technical Challenge</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">{selectedCaseStudy.challenge}</p>
                  </div>
                )}

                {selectedCaseStudy.solution && (
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700">Architectural Solution Delivered</h4>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">{selectedCaseStudy.solution}</p>
                  </div>
                )}
              </div>

              {selectedCaseStudy.impact && (
                <div className="p-4 rounded-2xl bg-gold-50 border border-gold-300 text-xs font-bold text-gold-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gold-700">Business Impact</span>
                    <span>{selectedCaseStudy.impact}</span>
                  </div>
                </div>
              )}

              {selectedCaseStudy.tags && selectedCaseStudy.tags.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Technologies Deployed</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCaseStudy.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedCaseStudy.liveUrl && selectedCaseStudy.liveUrl !== '#' && (
                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <a
                    href={selectedCaseStudy.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gold-gradient text-slate-950 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
                  >
                    <span>Visit Live Case Study</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </Modal>
        )}

      </div>
    </div>
  );
};

export default Portfolio;
