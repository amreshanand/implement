import type {
  SnowfallProps,
  RainProps,
  ConfettiProps,
  SparklesProps,
  AuroraProps,
  ParticleFieldProps,
  CursorTrailProps,
  MeteorShowerProps,
} from '@amresh8241/atmosfx';

export type EffectId =
  | 'snowfall'
  | 'rain'
  | 'confetti'
  | 'sparkles'
  | 'aurora'
  | 'particle-field'
  | 'cursor-trail'
  | 'meteor-shower';

export type EffectCategory = 'Weather' | 'Celebratory' | 'Atmospheric' | 'Interactive' | 'Cosmic';

export interface PropControlDef {
  key: string;
  label: string;
  description: string;
  type: 'slider' | 'boolean' | 'color' | 'select' | 'color-array' | 'range';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: { label: string; value: string }[];
  category?: 'General' | 'Appearance' | 'Physics' | 'Interaction';
}

export interface EffectMeta<T = any> {
  id: EffectId;
  name: string;
  componentName: string;
  category: EffectCategory;
  tagline: string;
  description: string;
  defaultProps: T;
  controls: PropControlDef[];
  icon: string; // lucide icon identifier
}

export type AnyEffectProps =
  | SnowfallProps
  | RainProps
  | ConfettiProps
  | SparklesProps
  | AuroraProps
  | ParticleFieldProps
  | CursorTrailProps
  | MeteorShowerProps;
