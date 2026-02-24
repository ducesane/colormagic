import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getColorByHex, seoColors } from '@/lib/seo/catalog';

interface Props {
  params: { hex: string };
}

export function generateStaticParams() {
  return seoColors.map((entry) => ({ hex: entry.hex }));
}

export function generateMetadata({ params }: Props): Metadata {
  const color = getColorByHex(params.hex);

  if (!color) {
    return {
      title: 'Color not found | ColorMagic'
    };
  }

  return {
    title: `${color.name} (#${color.hex.toUpperCase()}) meaning, CSS, and palette ideas`,
    description: `Use ${color.name} (#${color.hex.toUpperCase()}) for ${color.intent}. Includes CSS snippets and palette inspiration.`
  };
}

export default function ColorSeoPage({ params }: Props) {
  const color = getColorByHex(params.hex);

  if (!color) {
    notFound();
  }

  const hex = `#${color.hex.toUpperCase()}`;

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 780, margin: '40px auto', lineHeight: 1.6 }}>
      <h1>{color.name} ({hex})</h1>
      <p>
        {color.name} is ideal for brands that need a {color.intent} visual tone. This page is generated
        programmatically for long-tail SEO queries like "{color.name} hex meaning" and "{color.name} CSS color".
      </p>

      <div style={{ width: '100%', height: 140, borderRadius: 10, border: '1px solid #ddd', background: hex }} />

      <h2>CSS snippets</h2>
      <pre style={{ background: '#f8fafc', padding: 14, borderRadius: 8, overflowX: 'auto' }}>
{`.primary {
  color: ${hex};
}

.primary-bg {
  background-color: ${hex};
}`}
      </pre>

      <h2>SEO intent</h2>
      <ul>
        <li>Target query cluster: {color.name.toLowerCase()} color meaning</li>
        <li>Secondary query cluster: {color.name.toLowerCase()} hex and rgb</li>
        <li>Commercial intent: designers selecting palettes for landing pages and ads</li>
      </ul>
    </main>
  );
}
