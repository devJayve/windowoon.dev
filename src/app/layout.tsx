import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/shared/components/layout/Header';
import { AppProviders, Footer } from '@/shared/components/layout';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { pretendard } from '@/styles/fonts';

export const metadata: Metadata = {
  title: "Windowoon's Log",
  description: '개발 과정에서 마주친 도전과 인사이트를 기록합니다.',
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
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://windowoon.dev',
    siteName: "Windowoon's Log",
    images: [
      {
        url: 'https://8kaup4frtn8k4vpk.public.blob.vercel-storage.com/blog_thumbnail-S2TFhB6NRM1yhpo6JxKd6ACeAH60Cr.png',
        width: 1200,
        height: 630,
        alt: "Windowoon's Log",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className={`${pretendard.variable}`}>
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
        <SpeedInsights />
      </body>
    </html>
  );
}
