'use client';

import { useRouter } from 'next/navigation';

function BookDetailBackdrop() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };
  return <div onClick={handleClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />;
}

export default BookDetailBackdrop;
