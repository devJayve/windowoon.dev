'use client';
import { clsx } from 'clsx';
import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { NAV_LINKS } from '@/constants/navigation';
import { useEffect, useState } from 'react';
import { InfoDialog } from '@/shared/components/dialog/InfoDialog';

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [infoDialog, setInfoDialog] = useState({
    isOpen: false,
    label: '',
  });
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleNavClick = (href: string, label: string, e: React.MouseEvent) => {
    if (href !== '/post') {
      e.preventDefault();
      setInfoDialog({
        isOpen: true,
        label: label,
      });
    }
  };

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <Image src="/images/window_logo.png" alt="logo" width={40} height={40} />
        <nav className="flex gap-6">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={e => handleNavClick(link.href, link.label, e)}
              className={clsx('transition-all duration-150')}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className={clsx(
            'rounded-lg p-2 transition-colors duration-200',
            resolvedTheme === 'dark' ? 'text-yellow-300' : 'text-gray-700 dark:text-gray-300',
          )}
        >
          {resolvedTheme === 'dark' ? <Moon /> : <Sun className="text-red-700" />}
        </button>
      </header>
      <InfoDialog
        title={`${infoDialog.label} 페이지는 준비중이에요.`}
        description="좋은 컨텐츠를 가지고 곧 찾아뵐게요. 조금만 기다려주세요."
        isOpen={infoDialog.isOpen}
        onClose={() => setInfoDialog({ isOpen: false, label: '' })}
      />
    </>
  );
}
