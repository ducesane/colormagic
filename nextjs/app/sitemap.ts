import type { MetadataRoute } from 'next';
import { seoColors, seoPalettes } from '@/lib/seo/catalog';

const BASE_URL = 'https://colormagic.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      changeFrequency: 'weekly',
      priority: 1
    }
  ];

  const colorRoutes = seoColors.map((color) => ({
    url: `${BASE_URL}/colors/${color.hex}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));

  const paletteRoutes = seoPalettes.map((palette) => ({
    url: `${BASE_URL}/palettes/${palette.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...colorRoutes, ...paletteRoutes];
}
