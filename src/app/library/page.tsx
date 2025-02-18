import BookCard from '@/features/library/component/BookCard';
import dynamic from 'next/dynamic';

const FloatingActionButton = dynamic(
  () => import('@/shared/components/button/FloatingActionButton'),
  { ssr: true },
);

export default function LibraryPage() {
  return (
    <>
      <div className="flex w-full justify-center px-4">
        <div className="grid w-full max-w-sm grid-cols-1 gap-6 p-5 sm:max-w-3xl sm:grid-cols-2">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </div>
      <FloatingActionButton href="/" />
    </>
  );
}
