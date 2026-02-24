# ColorMagic Next.js Migration

This folder contains a full migration scaffold from Nuxt/Vue to Next.js/React with TanStack Query.

## Included

- Next.js App Router setup
- TanStack React Query provider (`components/query-provider.tsx`)
- API route parity examples:
  - `GET /api/random-color`
  - `POST /api/palette/arrange`
- Ported color utilities from Nuxt layer code:
  - `lib/random-color.ts`
  - `lib/color-arrange.ts`
  - `lib/color-converter.ts`

## Run

```bash
cd nextjs
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Migration Notes

This scaffold is designed so you can port each Nuxt page/layer gradually into `app/` while keeping API and utility parity.

## AdSense Revenue Maximization

To maximize AdSense earnings during migration, prioritize:

- **Viewability first**: keep key ad units in visible, stable positions and avoid layout shifts.
- **Performance**: optimize LCP/CLS/INP so users stay longer and see more ad impressions.
- **Placement testing**: run controlled A/B tests for in-content vs sidebar/footer units.
- **Audience segmentation**: adjust ad density and formats by device and top locales.
- **Content depth**: add internal links and related tools to improve pages/session.
- **Measurement loop**: monitor RPM, CTR, and session duration weekly and iterate incrementally.


## Programmatic SEO Included

This scaffold now includes programmatic SEO patterns out of the box:

- Dynamic long-tail pages for colors: `app/colors/[hex]/page.tsx`
- Dynamic long-tail pages for palettes: `app/palettes/[slug]/page.tsx`
- Shared SEO content catalog: `lib/seo/catalog.ts`
- Auto sitemap generation: `app/sitemap.ts`
- Robots rules: `app/robots.ts`

To scale this, replace the in-repo catalog with CMS or database content and expand static params generation.

