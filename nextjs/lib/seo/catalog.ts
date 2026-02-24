export interface SeoColor {
  hex: string;
  name: string;
  intent: string;
}

export interface SeoPalette {
  slug: string;
  title: string;
  description: string;
  colors: string[];
}

export const seoColors: SeoColor[] = [
  { hex: 'ff0000', name: 'Red', intent: 'bold, energetic, and attention-grabbing' },
  { hex: '00ff00', name: 'Lime', intent: 'fresh, vibrant, and high-contrast' },
  { hex: '0000ff', name: 'Blue', intent: 'trustworthy, calm, and corporate' },
  { hex: '111827', name: 'Slate 900', intent: 'modern, neutral, and professional' },
  { hex: 'f59e0b', name: 'Amber 500', intent: 'warm, optimistic, and action-oriented' },
  { hex: 'ec4899', name: 'Pink 500', intent: 'playful, creative, and expressive' },
  { hex: '06b6d4', name: 'Cyan 500', intent: 'tech-forward, clean, and bright' },
  { hex: '22c55e', name: 'Green 500', intent: 'growth, eco, and wellness positioning' }
];

export const seoPalettes: SeoPalette[] = [
  {
    slug: 'startup-saas',
    title: 'Startup SaaS color palette',
    description: 'A high-converting SaaS palette focused on trust, clarity, and strong call-to-action contrast.',
    colors: ['#111827', '#2563eb', '#22d3ee', '#f8fafc', '#f59e0b']
  },
  {
    slug: 'wellness-brand',
    title: 'Wellness brand color palette',
    description: 'A calm wellness palette blending natural greens with soft neutrals for holistic branding.',
    colors: ['#14532d', '#22c55e', '#bbf7d0', '#f0fdf4', '#166534']
  },
  {
    slug: 'luxury-editorial',
    title: 'Luxury editorial color palette',
    description: 'An upscale editorial palette with rich dark tones and elegant accent colors.',
    colors: ['#0f172a', '#334155', '#e2e8f0', '#d4af37', '#7c2d12']
  }
];

export function getColorByHex(hex: string): SeoColor | undefined {
  return seoColors.find((entry) => entry.hex.toLowerCase() === hex.toLowerCase());
}

export function getPaletteBySlug(slug: string): SeoPalette | undefined {
  return seoPalettes.find((entry) => entry.slug === slug);
}
