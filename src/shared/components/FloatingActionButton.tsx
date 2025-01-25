'use client';
import { PenSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

function FloatingActionButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/post/write');
  };

  return (
    <button className="fixed bottom-8 right-8 rounded-full bg-blue-500 p-4" onClick={handleClick}>
      <PenSquare />
    </button>
  );
}

export default FloatingActionButton;
