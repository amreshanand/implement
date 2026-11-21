import React from 'react';
import {
  Snowflake,
  CloudRain,
  PartyPopper,
  Sparkles,
  Waves,
  Share2,
  MousePointerClick,
  Flame,
} from 'lucide-react';
import { EffectMeta, EffectId } from '../types/effects';

interface EffectSelectorProps {
  effects: EffectMeta[];
  selectedId: EffectId;
  onSelect: (id: EffectId) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Snowflake: <Snowflake className="w-4 h-4" />,
  CloudRain: <CloudRain className="w-4 h-4" />,
  PartyPopper: <PartyPopper className="w-4 h-4" />,
  SparklesIcon: <Sparkles className="w-4 h-4" />,
  Waves: <Waves className="w-4 h-4" />,
  Share2: <Share2 className="w-4 h-4" />,
  MousePointerClick: <MousePointerClick className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
};

export const EffectSelector: React.FC<EffectSelectorProps> = ({
  effects,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="flex flex-col h-full bg-[#0d121f] rounded-xl border border-slate-800/80 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/60">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
            Available Effects
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/20 text-cyan-300">
            {effects.length} components
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Select an effect to mount its live canvas and tweak real props.
        </p>
      </div>

      {/* Effects list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5 focus:outline-none">
        {effects.map((effect) => {
          const isSelected = effect.id === selectedId;
          const iconNode = ICON_MAP[effect.icon] || <Sparkles className="w-4 h-4" />;

          return (
            <button
              key={effect.id}
              onClick={() => onSelect(effect.id)}
              className={`w-full text-left p-3 rounded-lg transition-all group relative border ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.08)]'
                  : 'bg-slate-950/40 hover:bg-slate-900/50 border-slate-800/60 hover:border-slate-700/80'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 p-2 rounded-md transition-colors ${
                    isSelected
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'bg-slate-800/60 text-slate-400 group-hover:text-slate-200 border border-slate-700/50'
                  }`}
                >
                  {iconNode}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-sm font-semibold tracking-tight transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                      }`}
                    >
                      {effect.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                      &lt;{effect.componentName} /&gt;
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {effect.tagline}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
