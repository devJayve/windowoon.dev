'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export function Footer() {
  const { data } = useSession();
  return (
    <footer>
      <div className="container mx-auto my-5 flex-col items-center justify-center justify-items-center">
        {data ? (
          <button onClick={() => signOut()}>로그아웃</button>
        ) : (
          <button onClick={() => signIn()}>로그인</button>
        )}
        <p className="text-sm font-light text-gray-200">© 2025. Dowoon Kim all rights reserved.</p>
      </div>
    </footer>
  );
}
