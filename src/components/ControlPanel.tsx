import React, { useState } from 'react';
import { Sliders, RotateCcw } from 'lucide-react';
import { EffectMeta } from '../types/effects';

interface ControlPanelProps {
  effect: EffectMeta;
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  effect,
  values,
  onChange,
  onReset,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Extract available categories
  const categories = ['all', 'Physics', 'Appearance', 'Interaction', 'General'].filter((cat) => {
    if (cat === 'all') return true;
    return effect.controls.some((c) => c.category === cat);
  });

  const filteredControls =
    activeCategory === 'all'
      ? effect.controls
      : effect.controls.filter((c) => c.category === activeCategory);

  return (
    <div className="flex flex-col bg-[#0d121f] rounded-xl border border-slate-800/80 shadow-xl overflow-hidden mt-4">
      {/* Panel header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-slate-800/80 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
            Real Component Props
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            {effect.controls.length} props
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Category filter tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-0.5 rounded transition-all capitalize ${
                  activeCategory === cat
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Reset props to default values"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredControls.map((ctrl) => {
          const value = values[ctrl.key] ?? effect.defaultProps[ctrl.key];

          return (
            <div
              key={ctrl.key}
              className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-slate-700/60 transition-colors flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-200 font-mono">
                      {ctrl.label}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400/80">
                      ({ctrl.key})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {ctrl.description}
                  </p>
                </div>

                {/* Display Current Value Badge */}
                {ctrl.type === 'slider' && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-cyan-300 shrink-0">
                    {typeof value === 'number'
                      ? Number.isInteger(value)
                        ? value
                        : value.toFixed(2)
                      : value}{' '}
                    {ctrl.unit}
                  </span>
                )}
              </div>

              {/* Render control widget */}
              <div className="mt-2">
                {ctrl.type === 'slider' && (
                  <div className="space-y-1">
                    <input
                      type="range"
                      min={ctrl.min ?? 0}
                      max={ctrl.max ?? 100}
                      step={ctrl.step ?? 1}
                      value={value}
                      onChange={(e) => onChange(ctrl.key, parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>{ctrl.min}</span>
                      <span>{ctrl.max}</span>
                    </div>
                  </div>
                )}

                {ctrl.type === 'boolean' && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Status: {value ? 'Active' : 'Disabled'}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={Boolean(value)}
                      onClick={() => onChange(ctrl.key, !value)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        value ? 'bg-cyan-500' : 'bg-slate-800'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                )}

                {ctrl.type === 'color' && (
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="color"
                        value={value || '#ffffff'}
                        onChange={(e) => onChange(ctrl.key, e.target.value)}
                        className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                    </div>
                    <input
                      type="text"
                      value={value || ''}
                      onChange={(e) => onChange(ctrl.key, e.target.value)}
                      className="flex-1 px-2.5 py-1 text-xs font-mono rounded bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/50"
                      placeholder="#ffffff"
                    />
                    {/* Quick color preset swatches */}
                    <div className="flex gap-1">
                      {['#00f0ff', '#ffffff', '#38bdf8', '#a855f7', '#ffd700', '#f43f5e'].map(
                        (swatch) => (
                          <button
                            key={swatch}
                            type="button"
                            onClick={() => onChange(ctrl.key, swatch)}
                            className="w-4 h-4 rounded-full border border-slate-700 hover:scale-110 transition-transform"
                            style={{ backgroundColor: swatch }}
                            title={`Set to ${swatch}`}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}

                {ctrl.type === 'select' && ctrl.options && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {ctrl.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => onChange(ctrl.key, opt.value)}
                        className={`px-2 py-1.5 text-xs font-mono rounded-md border text-center transition-all ${
                          value === opt.value
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                            : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
