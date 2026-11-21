import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EffectSelector } from './components/EffectSelector';
import { PreviewStage } from './components/PreviewStage';
import { ControlPanel } from './components/ControlPanel';
import { CodePreview } from './components/CodePreview';
import { ApiReference } from './components/ApiReference';
import { Footer } from './components/Footer';
import { EFFECTS_REGISTRY } from './data/effectsRegistry';
import { EffectId } from './types/effects';

export const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<EffectId>('snowfall');

  // Store active props per effect ID
  const [propsMap, setPropsMap] = useState<Record<string, Record<string, any>>>(() => {
    const initial: Record<string, Record<string, any>> = {};
    EFFECTS_REGISTRY.forEach((eff) => {
      initial[eff.id] = { ...eff.defaultProps };
    });
    return initial;
  });

  const selectedEffect =
    EFFECTS_REGISTRY.find((e) => e.id === selectedId) || EFFECTS_REGISTRY[0];
  const currentProps = propsMap[selectedId] || selectedEffect.defaultProps;

  const handlePropChange = (key: string, value: any) => {
    setPropsMap((prev) => ({
      ...prev,
      [selectedId]: {
        ...prev[selectedId],
        [key]: value,
      },
    }));
  };

  const handleReset = () => {
    setPropsMap((prev) => ({
      ...prev,
      [selectedId]: { ...selectedEffect.defaultProps },
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080b11] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Navigation Header */}
      <Header />

      {/* Hero with npm install command */}
      <Hero />

      {/* Main Two-Panel Playground */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Effect Selector (All 8 real effects) */}
          <aside className="lg:col-span-4 h-full sticky top-24">
            <EffectSelector
              effects={EFFECTS_REGISTRY}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </aside>

          {/* Right Panel: Live Canvas Preview, Real Controls, Code Generator, API Reference */}
          <section className="lg:col-span-8 flex flex-col">
            {/* Live Preview Area */}
            <PreviewStage
              effect={selectedEffect}
              props={currentProps}
              onReset={handleReset}
              onUpdateProp={handlePropChange}
            />

            {/* Customization Controls (Strictly real props from TypeScript definitions) */}
            <ControlPanel
              effect={selectedEffect}
              values={currentProps}
              onChange={handlePropChange}
              onReset={handleReset}
            />

            {/* Code Preview (Dynamic import & JSX usage with copy button) */}
            <CodePreview effect={selectedEffect} props={currentProps} />

            {/* TypeScript API Specifications */}
            <ApiReference effect={selectedEffect} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
