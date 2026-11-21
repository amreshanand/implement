import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { EffectMeta } from '../types/effects';

interface ApiReferenceProps {
  effect: EffectMeta;
}

export const ApiReference: React.FC<ApiReferenceProps> = ({ effect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col bg-[#0d121f] rounded-xl border border-slate-800/80 shadow-xl overflow-hidden mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-slate-900/60 hover:bg-slate-900/80 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
            TypeScript API & Type Definitions: {effect.componentName}Props
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>{isExpanded ? 'Collapse' : 'Expand API Specs'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/80">
          <div className="mb-4">
            <h4 className="text-xs font-mono font-semibold text-cyan-300 uppercase mb-1">
              Component Signature
            </h4>
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              <code>
                <span className="text-purple-400">export declare const</span>{' '}
                <span className="text-cyan-400">{effect.componentName}</span>:{' '}
                <span className="text-blue-400">React.FC</span>&lt;
                <span className="text-amber-300">{effect.componentName}Props</span>&gt;;
              </code>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 pr-4 font-semibold">Prop</th>
                  <th className="py-2 pr-4 font-semibold">Type</th>
                  <th className="py-2 pr-4 font-semibold">Default</th>
                  <th className="py-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {effect.controls.map((ctrl) => {
                  const defaultVal = effect.defaultProps[ctrl.key];
                  return (
                    <tr key={ctrl.key} className="hover:bg-slate-900/30">
                      <td className="py-2.5 pr-4 text-cyan-300 font-semibold">{ctrl.key}</td>
                      <td className="py-2.5 pr-4 text-purple-300">
                        {ctrl.type === 'slider'
                          ? 'number'
                          : ctrl.type === 'boolean'
                          ? 'boolean'
                          : ctrl.type === 'color'
                          ? 'string'
                          : ctrl.type === 'select'
                          ? ctrl.options?.map((o) => `'${o.value}'`).join(' | ')
                          : 'any'}
                      </td>
                      <td className="py-2.5 pr-4 text-amber-300">
                        {defaultVal !== undefined ? JSON.stringify(defaultVal) : 'undefined'}
                      </td>
                      <td className="py-2.5 text-slate-400 font-sans text-xs">
                        {ctrl.description}
                      </td>
                    </tr>
                  );
                })}
                {/* Inherited Base Effect Props */}
                <tr className="hover:bg-slate-900/30">
                  <td className="py-2.5 pr-4 text-cyan-300 font-semibold">fullScreen</td>
                  <td className="py-2.5 pr-4 text-purple-300">boolean</td>
                  <td className="py-2.5 pr-4 text-amber-300">true</td>
                  <td className="py-2.5 text-slate-400 font-sans text-xs">
                    Render fixed across full viewport or inside containerRef.
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="py-2.5 pr-4 text-cyan-300 font-semibold">containerRef</td>
                  <td className="py-2.5 pr-4 text-purple-300">React.RefObject&lt;HTMLElement&gt;</td>
                  <td className="py-2.5 pr-4 text-amber-300">undefined</td>
                  <td className="py-2.5 text-slate-400 font-sans text-xs">
                    Optional reference to parent bounding container when fullScreen is false.
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="py-2.5 pr-4 text-cyan-300 font-semibold">className</td>
                  <td className="py-2.5 pr-4 text-purple-300">string</td>
                  <td className="py-2.5 pr-4 text-amber-300">undefined</td>
                  <td className="py-2.5 text-slate-400 font-sans text-xs">
                    Additional CSS classes passed to the canvas element.
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="py-2.5 pr-4 text-cyan-300 font-semibold">style</td>
                  <td className="py-2.5 pr-4 text-purple-300">React.CSSProperties</td>
                  <td className="py-2.5 pr-4 text-amber-300">undefined</td>
                  <td className="py-2.5 text-slate-400 font-sans text-xs">
                    Inline styles merged onto the underlying canvas element.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
