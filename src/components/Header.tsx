import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Terminal, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install @amresh8241/atmosfx');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080b11]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <Sparkles className="w-5 h-5 animate-pulse text-cyan-400" />
            <div className="absolute inset-0 rounded-lg bg-cyan-400/10 blur-sm -z-10" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white font-mono">
                Atmos<span className="text-cyan-400">FX</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                v1.0.0
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              React Visual Effects Library
            </span>
          </div>
        </div>

        {/* Center / Navigation Badges */}
        <div className="hidden md:flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            React 18 & 19 Ready
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            HTML5 Canvas FX
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            Zero Runtime Deps
          </span>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyInstall}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/30 text-slate-300 hover:text-white transition-all shadow-sm"
            title="Click to copy npm install command"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>npm i @amresh8241/atmosfx</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

          <a
            href="https://www.npmjs.com/package/@amresh8241/atmosfx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-red-300 hover:text-red-200 transition-colors"
          >
            <span className="font-bold text-[11px] tracking-wide text-red-400">npm</span>
            <ExternalLink className="w-3 h-3 text-red-400/80" />
          </a>

          <a
            href="https://github.com/amreshanand/npm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
