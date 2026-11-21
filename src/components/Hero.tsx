import React, { useState } from 'react';
import { Copy, Check, Terminal, ShieldCheck, Zap, Sparkles, Sliders } from 'lucide-react';

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activePm, setActivePm] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');

  const installCommands = {
    npm: 'npm install @amresh8241/atmosfx',
    pnpm: 'pnpm add @amresh8241/atmosfx',
    yarn: 'yarn add @amresh8241/atmosfx',
    bun: 'bun add @amresh8241/atmosfx',
  };

  const currentCommand = installCommands[activePm];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Subtle pill banner */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/30 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>8 Production Canvas Effects for React</span>
        </div>

        {/* Heading & Description */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
          Bring your interfaces to life.
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Lightweight, customizable visual effects for React applications.
        </p>

        {/* Installation Terminal Box */}
        <div className="max-w-xl mx-auto bg-[#0d121f] rounded-xl border border-slate-800 shadow-2xl p-2.5 sm:p-3 transition-all hover:border-slate-700/80">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 px-1">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 ml-1">
                <Terminal className="w-3 h-3 text-cyan-400" /> terminal
              </span>
            </div>

            {/* Package Manager Selector */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-md border border-slate-800 text-[11px] font-mono">
              {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setActivePm(pm)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activePm === pm
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 px-2 py-1.5 bg-slate-950/80 rounded-lg border border-slate-800/50">
            <code className="text-xs sm:text-sm font-mono text-cyan-300 truncate select-all">
              <span className="text-slate-500">$ </span>
              {currentCommand}
            </code>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-xs font-mono text-slate-300 hover:text-white transition-all shrink-0"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" /> 60fps RequestAnimationFrame
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Accessibility & Reduced Motion
          </span>
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" /> 100% Typed Real Props
          </span>
        </div>
      </div>
    </section>
  );
};
