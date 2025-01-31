'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export function Footer() {
  const { data } = useSession();

  return (
    <footer>
      <div className="container mx-auto my-5 flex flex-col items-center justify-center justify-items-center">
        {data ? (
          <button onClick={() => signOut()}>로그아웃</button>
        ) : (
          <Link href={'/login'}>로그인</Link>
        )}
        <p className="text-center text-sm font-light text-neutral-800 dark:text-neutral-200">
          © 2025. Dowoon Kim all rights reserved.
        </p>
      </div>
    </footer>
  );
}
