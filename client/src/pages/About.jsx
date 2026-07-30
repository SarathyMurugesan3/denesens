import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Award, Linkedin, Twitter, Github, CheckCircle2, Milestone } from 'lucide-react';
import GoldOrnament from '../components/GoldOrnament';
import { fetchTeam, fetchSettings, subscribeCMSUpdate } from '../services/api';

export const About = () => {
  const [team, setTeam] = useState([]);
  const [settings, setSettings] = useState({
    aboutTitle: 'Engineering High-Performance Digital Intelligence',
    aboutSubtitle: 'Denesens Solutions is a premier corporate software architecture firm based in Salem, Tamil Nadu, India. We fuse luxury design aesthetics with robust software engineering.',
    missionText: 'To empower forward-thinking organizations with intelligent, secure, and infinitely scalable software solutions—eliminating technical friction and accelerating enterprise innovation.',
    visionText: 'To stand as the global gold standard for luxury tech engineering—recognized for combining deep artificial intelligence, resilient cloud infrastructure, and unmatched visual design polish.'
  });

  const loadData = () => {
    fetchTeam().then(res => setTeam(res));
    fetchSettings().then(res => { if (res) setSettings(res); });
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeCMSUpdate(() => {
      loadData();
    });
    return () => unsubscribe();
  }, []);

  const milestones = [
    { year: '2023', title: 'Foundation & Vision', desc: 'Established Denesens Solutions in Salem, Tamil Nadu, focused on luxury software engineering.' },
    { year: '2024', title: 'Enterprise Services Scale', desc: 'Delivered custom AI knowledge platform & microservice backend architectures for fintech clients.' },
    { year: '2025', title: 'In-House SaaS Ecosystem', desc: 'Launched Denesens Intelligence Engine (DIE) and Cloud Pulse observability sentinel.' },
    { year: '2026', title: 'Global Enterprise Expansion', desc: 'Expanded global delivery capabilities and high-throughput cloud infrastructure consulting.' }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-gold-700">ABOUT DENESENS SOLUTIONS</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900">
            <span className="gold-text">{settings.aboutTitle}</span>
          </h1>
          <p className="text-base text-slate-600 leading-relaxed font-medium">
            {settings.aboutSubtitle}
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 relative overflow-hidden shadow-card">
            <div className="w-12 h-12 rounded-xl bg-gold-100 border border-gold-400/30 flex items-center justify-center text-gold-700 shadow-sm">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-slate-900">Our Mission</h2>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {settings.missionText}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 relative overflow-hidden shadow-card">
            <div className="w-12 h-12 rounded-xl bg-gold-100 border border-gold-400/30 flex items-center justify-center text-gold-700 shadow-sm">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-slate-900">Our Vision</h2>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {settings.visionText}
            </p>
          </div>
        </div>

        <GoldOrnament direction="horizontal" />

        {/* Team Leadership Section */}
        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold tracking-widest uppercase text-gold-700">EXECUTIVE LEADERSHIP</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">Meet Our Core Team</h2>
            <p className="text-sm text-slate-600 font-medium">
              The visionaries driving Denesens Solutions' corporate direction and technical execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <motion.div
                key={member._id}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-6 shadow-card relative group hover:border-gold-400/60 transition-all duration-300"
              >
                {/* Round Avatar Profile Picture Frame */}
                <div className="relative w-28 h-28 mx-auto rounded-full border-2 border-gold-400 p-0.5 bg-white shadow-md">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-heading font-extrabold text-2xl tracking-wider">
                      {member.initials}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold font-heading text-slate-900 group-hover:text-gold-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 py-1 px-3 rounded-full inline-block border border-gold-400/30">
                    {member.role}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic font-medium">
                  "{member.bio}"
                </p>

                {/* Social Links */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-center space-x-4">
                  <a href={member.socialLinks?.linkedin || '#'} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-gold-100 hover:text-gold-800 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={member.socialLinks?.twitter || '#'} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-gold-100 hover:text-gold-800 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href={member.socialLinks?.github || '#'} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-gold-100 hover:text-gold-800 transition-colors">
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
            <span className="text-xs font-bold tracking-widest uppercase text-gold-700">GROWTH TRAJECTORY</span>
            <h2 className="text-3xl font-extrabold font-heading text-slate-900">Company Milestones</h2>
          </div>

          <div className="relative border-l-2 border-gold-400/40 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-10">
            {milestones.map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-white border-2 border-gold-500 group-hover:bg-gold-400 transition-colors shadow-sm" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-gold-700">{item.year}</span>
                <h3 className="text-lg font-bold font-heading text-slate-900 mt-0.5">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
