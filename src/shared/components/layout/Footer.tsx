'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import IconLinkedIn from '@/shared/components/icons/IconLinkedIn';
import IconGithub from '@/shared/components/icons/IconGithub';

export function Footer() {
  const { data, status } = useSession();

  return (
    <footer>
      <div className="container mx-auto my-5 flex flex-col place-items-center justify-center">
        <div className="flex items-center">
          <Link
            href={'https://www.linkedin.com/in/dowoon-kim/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconLinkedIn className="text-foreground" />
          </Link>
          <Link href={'https://github.com/devJayve'} target="_blank" rel="noopener noreferrer">
            <IconGithub className="text-foreground" />
          </Link>
          <div className="ml-2 mr-4 h-5 w-px bg-foreground" />
          {status !== 'loading' &&
            (data ? (
              <button onClick={() => signOut()}>로그아웃</button>
            ) : (
              <Link href={'/login'}>로그인</Link>
            ))}
        </div>
        <p className="text-center text-sm font-light text-neutral-800 dark:text-neutral-200">
          © 2025. Dowoon Kim all rights reserved.
        </p>
      </div>
    </footer>
  );
}
