'use client';

import { useQuery } from '@tanstack/react-query';

interface RandomColorResponse {
  color: string;
}

async function fetchRandomColor(): Promise<RandomColorResponse> {
  const response = await fetch('/api/random-color');
  if (!response.ok) {
    throw new Error('failed to fetch random color');
  }
  return response.json();
}

export function PaletteDemo() {
  const query = useQuery({
    queryKey: ['random-color'],
    queryFn: fetchRandomColor
  });

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 700, margin: '40px auto' }}>
      <h1>ColorMagic Next.js + TanStack Query migration</h1>
      <p>This page demonstrates React Query in Next.js App Router.</p>
      <button type="button" onClick={() => query.refetch()}>
        Fetch random color
      </button>
      <div style={{ marginTop: 16 }}>
        {query.isLoading && <p>Loading...</p>}
        {query.isError && <p>Error: {(query.error as Error).message}</p>}
        {query.data && (
          <div>
            <p>Color: {query.data.color}</p>
            <div
              style={{
                width: 140,
                height: 70,
                border: '1px solid #ddd',
                background: query.data.color
              }}
            />
          </div>
        )}
      </div>
      <section style={{ marginTop: 28, padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}>AdSense revenue optimization checklist</h2>
        <ul>
          <li>Use responsive ad units in high-attention zones (above-the-fold, in-content, and post-content).</li>
          <li>Improve Core Web Vitals to reduce bounce rate and increase ad viewability.</li>
          <li>Run A/B tests for ad density and placement; keep UX quality high to protect session depth.</li>
          <li>Segment by locale/device and tune ad layouts independently for mobile vs desktop.</li>
          <li>Track RPM, CTR, and viewability weekly; iterate with small controlled experiments.</li>
        </ul>
      </section>
    </main>
  );
}
