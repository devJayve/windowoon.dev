'use client';
import { PenSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { checkIsAdmin } from '@/features/post/lib';
import { clsx } from 'clsx';

function FloatingActionButton() {
  const router = useRouter();
  const { status, data } = useSession();

  if (status === 'loading') return null;
  if (!checkIsAdmin(data)) return null;

  const handleClick = () => {
    router.push('/post/write');
  };

  return (
    <button
      className={clsx(
        'fixed bottom-8 right-8 rounded-full bg-white p-4',
        'shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_0_18px_rgba(0,0,0,0.3)]',
      )}
      onClick={handleClick}
    >
      <PenSquare color="black" />
    </button>
  );
}

export default FloatingActionButton;
