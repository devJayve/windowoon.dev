import { PenSquare } from 'lucide-react';
import { checkIsAdmin } from '@/features/post/lib';
import { clsx } from 'clsx';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';

interface FloatingActionButtonProps {
  href: string;
}

async function FloatingActionButton({ href }: FloatingActionButtonProps) {
  const session = await getServerSession(authOptions);

  if (!checkIsAdmin(session)) return null;

  return (
    <Link
      href={href}
      className={clsx(
        'fixed bottom-8 right-8 rounded-full bg-white p-4',
        'shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_0_18px_rgba(0,0,0,0.3)]',
      )}
    >
      <PenSquare color="black" />
    </Link>
  );
}

export default FloatingActionButton;
