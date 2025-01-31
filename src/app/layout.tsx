import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/shared/components/layout/Header';
import { AppProviders, Footer } from '@/shared/components/layout';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Windowoon.dev',
  description: "dowoon's tech blog",
  authors: [{ name: 'dowoon' }],
  keywords: [
    'Tech',
    'Web Development',
    'Programming',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
  ],
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          {modal}
        </AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
