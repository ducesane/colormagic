import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPaletteBySlug, seoPalettes } from '@/lib/seo/catalog';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return seoPalettes.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const palette = getPaletteBySlug(params.slug);

  if (!palette) {
    return {
      title: 'Palette not found | ColorMagic'
    };
  }

  return {
    title: `${palette.title} | Free hex codes for UI, branding, and ads`,
    description: palette.description
  };
}

export default function PaletteSeoPage({ params }: Props) {
  const palette = getPaletteBySlug(params.slug);

  if (!palette) {
    notFound();
  }

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 780, margin: '40px auto' }}>
      <h1>{palette.title}</h1>
      <p>{palette.description}</p>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 8 }}>
        {palette.colors.map((color) => (
          <div key={color} style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ height: 80, background: color }} />
            <p style={{ margin: 8, fontSize: 12 }}>{color}</p>
          </div>
        ))}
      </section>

      <h2>Programmatic SEO structure</h2>
      <p>
        This palette page is generated from a content catalog and can scale to thousands of long-tail combinations
        (industry + intent + style) while keeping unique titles, metadata, and on-page value.
      </p>
    </main>
  );
}
