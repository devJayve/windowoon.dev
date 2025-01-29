'use client';
import { clsx } from 'clsx';
import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/constants/navigation';

export function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="flex items-center justify-between p-4">
      <Image src="/images/window_logo.png" alt="logo" width={40} height={40} />
      <nav className="flex gap-6">
        {NAV_LINKS.map(link => (
          <Link key={link.href} href={link.href} className={clsx('transition-all duration-150')}>
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={clsx(
          'rounded-lg p-2 transition-colors duration-200',
          theme === 'dark' ? 'text-yellow-300' : 'text-gray-700 dark:text-gray-300',
        )}
      >
        {theme === 'dark' ? <Moon /> : <Sun className="text-red-700" />}
      </button>
    </header>
  );
}
