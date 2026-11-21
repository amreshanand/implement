import React, { useState } from 'react';
import { Code2, Copy, Check } from 'lucide-react';
import { EffectMeta } from '../types/effects';

interface CodePreviewProps {
  effect: EffectMeta;
  props: Record<string, any>;
}

export const CodePreview: React.FC<CodePreviewProps> = ({ effect, props }) => {
  const [copied, setCopied] = useState(false);
  const [showFullConfig, setShowFullConfig] = useState(false);

  // Determine props to display
  const generateSnippet = () => {
    const importStatement = `import { ${effect.componentName} } from '@amresh8241/atmosfx';`;

    const propLines: string[] = [];

    // Always include fullScreen={false} for container demo or omit if user prefers
    Object.keys(props).forEach((key) => {
      const val = props[key];
      const defaultVal = effect.defaultProps[key];

      // If not showing full config, skip props that equal defaults
      if (!showFullConfig && JSON.stringify(val) === JSON.stringify(defaultVal)) {
        return;
      }

      // Format prop according to type
      if (typeof val === 'boolean') {
        if (val) {
          propLines.push(`  ${key}`);
        } else {
          propLines.push(`  ${key}={false}`);
        }
      } else if (typeof val === 'number') {
        propLines.push(`  ${key}={${val}}`);
      } else if (typeof val === 'string') {
        propLines.push(`  ${key}="${val}"`);
      } else if (Array.isArray(val) || typeof val === 'object') {
        propLines.push(`  ${key}={${JSON.stringify(val)}}`);
      }
    });

    let jsx = '';
    if (propLines.length === 0) {
      jsx = `<${effect.componentName} />`;
    } else {
      jsx = `<${effect.componentName}\n${propLines.join('\n')}\n/>`;
    }

    return `${importStatement}\n\nexport default function App() {\n  return (\n    <div className="relative w-full h-[400px] overflow-hidden">\n      ${jsx.split('\n').join('\n      ')}\n    </div>\n  );\n}`;
  };

  const snippet = generateSnippet();

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col bg-[#0d121f] rounded-xl border border-slate-800/80 shadow-xl overflow-hidden mt-4">
      {/* Code Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800/80 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
            React Implementation Code
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            TSX
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Full vs Modified Props */}
          <button
            onClick={() => setShowFullConfig(!showFullConfig)}
            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            {showFullConfig ? 'Showing All Props' : 'Showing Customized Props'}
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code View Block */}
      <div className="p-4 bg-slate-950/90 overflow-x-auto text-xs font-mono leading-relaxed select-all">
        <pre className="text-slate-300">
          <code>
            {snippet.split('\n').map((line, idx) => {
              // Basic syntax highlight coloring
              let formatted = <span className="text-slate-300">{line}</span>;
              if (line.startsWith('import')) {
                formatted = (
                  <span>
                    <span className="text-purple-400">import</span>
                    <span className="text-slate-200">
                      {' '}
                      &#123;{' '}
                      <span className="text-cyan-300 font-bold">{effect.componentName}</span> &#125;{' '}
                    </span>
                    <span className="text-purple-400">from</span>{' '}
                    <span className="text-emerald-300">'@amresh8241/atmosfx'</span>;
                  </span>
                );
              } else if (line.includes(`<${effect.componentName}`) || line.includes(`</`)) {
                formatted = <span className="text-cyan-400 font-bold">{line}</span>;
              } else if (line.includes('export default') || line.includes('function') || line.includes('return')) {
                formatted = <span className="text-purple-400">{line}</span>;
              } else if (line.trim().includes('=')) {
                formatted = <span className="text-amber-200">{line}</span>;
              }

              return (
                <div key={idx} className="table-row">
                  <span className="table-cell pr-4 select-none text-slate-400 text-right w-8 text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="table-cell">{formatted}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
};
