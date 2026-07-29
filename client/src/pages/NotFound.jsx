import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto shadow-gold-glow">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-5xl font-extrabold font-heading text-white gold-text">404</h1>
        <p className="text-base text-gray-300 font-medium">
          The requested page route does not exist in Denesens Solutions directory.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-dark-950 font-bold uppercase tracking-widest text-xs shadow-gold-glow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
