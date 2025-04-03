'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ModalProvider } from '@/shared/provider/ModalProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ModalProvider>{children}</ModalProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
