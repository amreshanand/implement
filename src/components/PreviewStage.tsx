import React, { useRef, useState, useEffect } from 'react';
import {
  Snowfall,
  Rain,
  Confetti,
  Sparkles,
  Aurora,
  ParticleField,
  CursorTrail,
  MeteorShower,
} from '@amresh8241/atmosfx';
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles as SparklesIcon,
  MousePointer,
  Palette,
} from 'lucide-react';
import { EffectMeta } from '../types/effects';

interface PreviewStageProps {
  effect: EffectMeta;
  props: Record<string, any>;
  onReset: () => void;
  onUpdateProp: (key: string, value: any) => void;
}

const BG_PRESETS = [
  { name: 'Deep Space', class: 'bg-[#060911]' },
  { name: 'Pitch Black', class: 'bg-[#000000]' },
  { name: 'Midnight Navy', class: 'bg-[#081226]' },
  { name: 'Dark Slate', class: 'bg-[#0f172a]' },
];

export const PreviewStage: React.FC<PreviewStageProps> = ({
  effect,
  props,
  onReset,
  onUpdateProp,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeBgIndex, setActiveBgIndex] = useState(0);
  const [confettiBurstKey, setConfettiBurstKey] = useState(0);

  // Esc key exits fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Trigger burst for Confetti
  const triggerConfetti = () => {
    setConfettiBurstKey((prev) => prev + 1);
    onUpdateProp('trigger', true);
  };

  const renderActiveEffect = () => {
    const commonProps = {
      containerRef,
      fullScreen: isFullscreen,
      ...props,
    };

    switch (effect.id) {
      case 'snowfall':
        return <Snowfall key="snowfall" {...commonProps} />;
      case 'rain':
        return <Rain key="rain" {...commonProps} />;
      case 'confetti':
        return (
          <Confetti
            key={`confetti-${confettiBurstKey}`}
            {...commonProps}
            onComplete={() => {
              if (!props.recycle) {
                // finished burst
              }
            }}
          />
        );
      case 'sparkles':
        return <Sparkles key="sparkles" {...commonProps} />;
      case 'aurora':
        return <Aurora key="aurora" {...commonProps} />;
      case 'particle-field':
        return <ParticleField key="particle-field" {...commonProps} />;
      case 'cursor-trail':
        return <CursorTrail key="cursor-trail" {...commonProps} />;
      case 'meteor-shower':
        return <MeteorShower key="meteor-shower" {...commonProps} />;
      default:
        return null;
    }
  };

  const isInteractiveEffect =
    effect.id === 'cursor-trail' ||
    effect.id === 'particle-field' ||
    (effect.id === 'snowfall' && props.interaction);

  return (
    <div className="flex flex-col rounded-xl border border-slate-800/80 bg-[#0d121f] shadow-xl overflow-hidden">
      {/* Top stage toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800/80 bg-slate-900/70">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                props.enabled !== false ? 'bg-emerald-400 opacity-75' : 'bg-rose-400 opacity-75'
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                props.enabled !== false ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            ></span>
          </span>
          <span className="text-xs font-mono font-medium text-slate-200">
            Live Canvas Sandbox
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700/60">
            &lt;{effect.componentName} /&gt;
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Confetti Trigger Button */}
          {effect.id === 'confetti' && (
            <button
              onClick={triggerConfetti}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 transition-colors"
            >
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Fire Burst</span>
            </button>
          )}

          {/* Background preset switch */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs text-slate-400">
            <Palette className="w-3 h-3 ml-1 text-slate-400" />
            <div className="flex gap-1 ml-1">
              {BG_PRESETS.map((preset, idx) => (
                <button
                  key={preset.name}
                  onClick={() => setActiveBgIndex(idx)}
                  className={`w-4 h-4 rounded-full border transition-all ${preset.class} ${
                    activeBgIndex === idx
                      ? 'border-cyan-400 scale-110 shadow-[0_0_6px_rgba(0,240,255,0.4)]'
                      : 'border-slate-700 hover:border-slate-500'
                  }`}
                  title={`Background: ${preset.name}`}
                />
              ))}
            </div>
          </div>

          {/* Reset Props */}
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Reset props to library defaults"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'View in full screen'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Full Screen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Canvas Stage */}
      <div
        ref={containerRef}
        className={`relative w-full h-[360px] sm:h-[440px] overflow-hidden select-none transition-colors ${
          BG_PRESETS[activeBgIndex].class
        } ${isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen !m-0 !rounded-none' : ''}`}
      >
        {/* Actual published AtmosFX Effect rendered here */}
        {renderActiveEffect()}

        {/* Ambient Center Graphic / Mock Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center z-10">
          <div className="max-w-md bg-slate-950/70 border border-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              {effect.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed font-normal">
              {effect.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700/60 text-cyan-300">
                {effect.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700/60 text-slate-300">
                HTML5 2D Context
              </span>
              {isInteractiveEffect && (
                <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center gap-1">
                  <MousePointer className="w-3 h-3" /> Interactive Pointer
                </span>
              )}
            </div>
          </div>

          {/* Interactive Hint */}
          {isInteractiveEffect && (
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/20 text-cyan-300 text-xs font-mono backdrop-blur-sm">
              <MousePointer className="w-3 h-3 animate-bounce" />
              <span>Move cursor around this stage to trigger physics</span>
            </div>
          )}
        </div>

        {/* Exit fullscreen overlay floating button */}
        {isFullscreen && (
          <div className="absolute top-6 right-6 z-50 pointer-events-auto">
            <button
              onClick={() => setIsFullscreen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-mono border border-cyan-500/30 backdrop-blur-md shadow-2xl transition-all"
            >
              <Minimize2 className="w-4 h-4 text-cyan-400" />
              <span>Exit Full Screen (Esc)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
