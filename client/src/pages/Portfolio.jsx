import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

export const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const caseStudies = [
    {
      id: 'cs-1',
      title: 'Fintech High-Throughput API Modernization',
      category: 'Services',
      client: 'Global Payment Gateway Firm',
      impact: '150k TPS Latency Reduced by 42%',
      problem: 'Legacy microservices faced transaction bottlenecks during high-volume spikes.',
      solution: 'Re-architected backend onto Go microservices with Redis clustering and zero-trust API validation.',
      outcome: 'Achieved 99.999% uptime during peak holiday sales volume with sub-15ms response times.',
      tags: ['Go', 'Redis', 'Kubernetes', 'API Security']
    },
    {
      id: 'cs-2',
      title: 'Enterprise Knowledge Graph RAG Deployment',
      category: 'Products',
      client: 'Multi-National Legal Firm',
      impact: 'Saved 12,000+ Operational Hours',
      problem: 'Attorneys spent 15+ hours weekly manually searching through unorganized case PDF archives.',
      solution: 'Deployed Denesens Intelligence Engine (DIE) with vector search and custom LLM document extraction.',
      outcome: 'Instant semantic search cut document analysis times from hours to seconds with strict data residency.',
      tags: ['Python', 'RAG Vector Search', 'React', 'FastAPI']
    },
    {
      id: 'cs-3',
      title: 'Cross-Platform Mobile Logistics Platform',
      category: 'Services',
      client: 'Supply Chain Operations Provider',
      impact: '100k+ Active Driver Downloads',
      problem: 'Drivers needed offline-capable routing and instant barcode scanning in low-connectivity areas.',
      solution: 'Built React Native cross-platform application with offline SQLite sync and automated manifest parsing.',
      outcome: 'Improved parcel delivery fulfillment speed by 35% across 45 regional hubs.',
      tags: ['React Native', 'Node.js', 'SQLite', 'WebSockets']
    },
    {
      id: 'cs-4',
      title: 'Multi-Cloud Infrastructure Cost Sentinel',
      category: 'Products',
      client: 'High-Growth SaaS Enterprise',
      impact: '$180,000 Annual Cloud Savings',
      problem: 'Unmonitored Kubernetes pod over-provisioning caused unexpected monthly cloud billing spikes.',
      solution: 'Implemented Denesens Cloud Pulse for automated pod scaling and anomalous spend alerts.',
      outcome: 'Trimmed idle cloud compute costs by 32% within the first 60 days of deployment.',
      tags: ['DevOps', 'Cloud Pulse', 'Prometheus', 'AWS']
    }
  ];

  const filteredStudies = filter === 'All'
    ? caseStudies
    : caseStudies.filter(cs => cs.category === filter);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-dark-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-gold-400">CASE STUDIES & PORTFOLIO</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
            Proven Client & Product Impact
          </h1>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Examine how Denesens Solutions solves critical technical challenges across custom software engineering and proprietary SaaS products.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-3">
          {['All', 'Services', 'Products'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-xl border transition-all ${
                filter === cat
                  ? 'bg-gold-gradient text-dark-950 border-gold-400 font-extrabold shadow-gold-glow'
                  : 'bg-dark-850 text-gray-300 border-dark-700 hover:border-gold-500/40 hover:text-white'
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
              key={cs.id}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-dark-850 border border-gold-500/30 flex flex-col justify-between hover:border-gold-500/60 hover:shadow-gold-glow transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-gold-500/10 text-gold-400 border border-gold-500/30 px-3 py-1 rounded">
                    {cs.category}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                    {cs.impact}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-heading text-white group-hover:text-gold-300 transition-colors">
                  {cs.title}
                </h3>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Client: {cs.client}</p>

                <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
                  {cs.problem}
                </p>
              </div>

              <div className="pt-6 border-t border-dark-700 flex items-center justify-between mt-6">
                <div className="flex flex-wrap gap-1.5">
                  {cs.tags.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-dark-900 text-gray-400 px-2.5 py-1 rounded border border-dark-700">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedCaseStudy(cs)}
                  className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300"
                >
                  <span>Case Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Study Modal */}
        <Modal
          isOpen={!!selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          title={selectedCaseStudy?.title || ''}
        >
          {selectedCaseStudy && (
            <div className="space-y-6">
              <div className="bg-gold-500/10 border border-gold-500/30 p-4 rounded-xl">
                <p className="text-xs font-bold uppercase tracking-widest text-gold-400">MEASURABLE IMPACT</p>
                <p className="text-lg font-extrabold text-white mt-1">{selectedCaseStudy.impact}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase text-rose-400 tracking-wider">The Challenge / Problem</h4>
                  <p className="text-sm text-gray-300 mt-1 leading-relaxed">{selectedCaseStudy.problem}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase text-gold-400 tracking-wider">The Architectural Solution</h4>
                  <p className="text-sm text-gray-300 mt-1 leading-relaxed">{selectedCaseStudy.solution}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Business Outcome</h4>
                  <p className="text-sm text-gray-300 mt-1 leading-relaxed">{selectedCaseStudy.outcome}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-dark-700 flex justify-end">
                <Link
                  to="/contact"
                  onClick={() => setSelectedCaseStudy(null)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-dark-950 bg-gold-gradient rounded-xl shadow-gold-glow"
                >
                  Request Similar Implementation
                </Link>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </div>
  );
};

export default Portfolio;
