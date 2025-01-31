'use client';
import React, { useState } from 'react';
import { Dialog } from '@/shared/components/dialog/dialog';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

function LoginModal() {
  const [isOpen, setIsOpen] = useState(true);
  const { data } = useSession();
  const router = useRouter();

  if (data) {
    router.back();
  }

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  return (
    <Dialog open={isOpen}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={handleClose} />
        <div className="relative z-50 w-full max-w-lg rounded-lg bg-white/70 p-6 shadow-lg backdrop-blur-md dark:bg-white/20">
          <h2 className="mb-4 text-xl font-semibold">로그인</h2>
          <button onClick={() => signIn('github', {})}>깃허브로 로그인하기</button>
        </div>
      </div>
    </Dialog>
  );
}

export default LoginModal;
