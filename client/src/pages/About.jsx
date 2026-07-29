import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Award, Linkedin, Twitter, Github, CheckCircle2, Milestone } from 'lucide-react';
import GoldOrnament from '../components/GoldOrnament';
import { fetchTeam } from '../services/api';

export const About = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchTeam().then(res => setTeam(res));
  }, []);

  const milestones = [
    { year: '2023', title: 'Foundation & Vision', desc: 'Established Denesens Solutions in Salem, Tamil Nadu, focused on luxury software engineering.' },
    { year: '2024', title: 'Enterprise Services Scale', desc: 'Delivered custom AI knowledge platform & microservice backend architectures for fintech clients.' },
    { year: '2025', title: 'In-House SaaS Ecosystem', desc: 'Launched Denesens Intelligence Engine (DIE) and Cloud Pulse observability sentinel.' },
    { year: '2026', title: 'Global Enterprise Expansion', desc: 'Expanded global delivery capabilities and high-throughput cloud infrastructure consulting.' }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-dark-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-gold-400">ABOUT DENESENS SOLUTIONS</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
            Engineering High-Performance Digital Intelligence
          </h1>
          <p className="text-base text-gray-400 leading-relaxed">
            Denesens Solutions is a premier corporate software architecture firm based in Salem, Tamil Nadu, India. We fuse luxury design aesthetics with robust software engineering.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-dark-850 border border-gold-500/30 space-y-4 relative overflow-hidden shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">Our Mission</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              To empower forward-thinking organizations with intelligent, secure, and infinitely scalable software solutions—eliminating technical friction and accelerating enterprise innovation.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-dark-850 border border-gold-500/30 space-y-4 relative overflow-hidden shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">Our Vision</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              To stand as the global gold standard for luxury tech engineering—recognized for combining deep artificial intelligence, resilient cloud infrastructure, and unmatched visual design polish.
            </p>
          </div>
        </div>

        <GoldOrnament direction="horizontal" />

        {/* Team Leadership Section */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold-400">EXECUTIVE LEADERSHIP</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">Meet Our Core Team</h2>
            <p className="text-sm text-gray-400">
              The visionaries driving Denesens Solutions' corporate direction and technical execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <motion.div
                key={member._id}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl bg-dark-850 border border-gold-500/30 text-center space-y-6 shadow-xl relative group hover:border-gold-500/60 transition-all duration-300"
              >
                {/* Gold-Ring Avatar Placeholder */}
                <div className="relative w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-300 p-1 shadow-gold-glow">
                  <div className="w-full h-full rounded-full bg-dark-950 flex items-center justify-center text-gold-400 font-heading font-extrabold text-2xl tracking-wider">
                    {member.initials}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold font-heading text-white group-hover:text-gold-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 py-1 px-3 rounded-full inline-block border border-gold-500/20">
                    {member.role}
                  </p>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed italic">
                  "{member.bio}"
                </p>

                {/* Social Links */}
                <div className="pt-4 border-t border-dark-700/60 flex items-center justify-center space-x-4">
                  <a href={member.socialLinks?.linkedin || '#'} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={member.socialLinks?.twitter || '#'} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href={member.socialLinks?.github || '#'} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold-400 font-bold">GROWTH TRAJECTORY</span>
            <h2 className="text-3xl font-extrabold font-heading text-white">Company Milestones</h2>
          </div>

          <div className="relative border-l-2 border-gold-500/30 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-10">
            {milestones.map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-dark-950 border-2 border-gold-400 group-hover:bg-gold-500 transition-colors shadow-gold-glow" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-gold-400">{item.year}</span>
                <h3 className="text-lg font-bold font-heading text-white mt-0.5">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
