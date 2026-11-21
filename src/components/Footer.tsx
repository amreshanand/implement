import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#060911] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-white font-mono font-bold tracking-tight text-sm">
              Atmos<span className="text-cyan-400">FX</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">v1.0.0</span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Hardware-accelerated visual effects for React. Lightweight, dependency-free, and
            designed for production interfaces.
          </p>
        </div>

        {/* Compatibility and Specs */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified: React &gt;= 18.0.0 &amp; 19.x</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            License: MIT
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <a
            href="https://www.npmjs.com/package/@amresh8241/atmosfx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>npm registry</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <a
            href="https://github.com/amreshanand/npm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 font-mono">
        <span>© {new Date().getFullYear()} AtmosFX. Published under MIT License.</span>
        <span>Built for high-performance React applications.</span>
      </div>
    </footer>
  );
};
