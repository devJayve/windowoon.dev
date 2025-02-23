'use client';
import React, { useState } from 'react';
import { Dialog } from '@/shared/components/dialog/dialog';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { IconWindow } from '@/shared/components/icons';

function LoginModal() {
  const [isOpen, setIsOpen] = useState(true);
  const { data } = useSession();
  const router = useRouter();

  if (data) {
    router.back();
  }

  const handleClose = () => {
    setIsOpen(false);
    //router.back();
  };

  return (
    <Dialog open={isOpen}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={handleClose} />
        <div className="relative z-50 w-full max-w-md rounded-lg bg-white/70 p-6 shadow-lg backdrop-blur-md dark:bg-black/10">
          <div className="flex flex-col items-center justify-center space-y-4">
            <IconWindow width={60} height={40} />
            <button
              className="flex w-full items-center gap-3 rounded-lg bg-github-dark px-4 py-2 text-white shadow-sm transition-colors duration-200 ease-in-out"
              onClick={() => signIn('github', {})}
            >
              <Image src="/images/github_logo.png" alt="github" width={30} height={30} />
              <span>Github로 로그인하기</span>
            </button>

            <button
              className="flex w-full items-center gap-3 rounded-lg bg-white px-4 py-2 text-white shadow-sm transition-colors duration-200 ease-in-out"
              onClick={() => signIn('google', {})}
            >
              <Image src="/images/google_logo.png" alt="google" width={30} height={30} />
              <span className="text-neutral-900">Google로 로그인하기</span>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default LoginModal;
