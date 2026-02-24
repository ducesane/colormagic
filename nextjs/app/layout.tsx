import type { Metadata } from 'next';
import { QueryProvider } from '@/components/query-provider';

export const metadata: Metadata = {
  title: 'ColorMagic Next.js Migration',
  description: 'Next.js + TanStack Query migration scaffold for ColorMagic'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
