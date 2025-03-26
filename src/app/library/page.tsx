import BookCard from '@/features/library/component/BookCard';
import dynamic from 'next/dynamic';
import RecommendCard from '@/features/library/component/RecommendCard';
import { BookUp, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/components/button/button';

const FloatingActionButton = dynamic(
  () => import('@/shared/components/button/FloatingActionButton'),
  { ssr: true },
);

export default function LibraryPage() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center space-y-5 px-4">
        <section className="flex w-full flex-col">
          <div className="flex w-full justify-between px-2 py-4">
            <div>
              <h1 className="text-xl font-semibold">추천 도서</h1>
              <p className="text-sm">자유롭게 책을 추천하고 책에 대해 토론을 나누는 공간이에요</p>
            </div>
            <ChevronRight />
          </div>
          <div className="scrollbar-hide mb-4 flex overflow-x-auto">
            <div className="flex gap-4">
              <RecommendCard />
              <RecommendCard />
              <RecommendCard />
              <RecommendCard />
            </div>
          </div>
          <div className="flex justify-between rounded-lg border-1 border-blue-500 bg-blue-500/30 p-5 dark:bg-blue-600/30">
            <div>
              <p className="text-md font-semibold sm:text-lg">개발 서적이 아니어도 좋아요!</p>
              <p className="text-sm">간단한 추천 사유와 함께 책을 추천해주세요</p>
            </div>
            <Button className="flex gap-1 bg-blue-500 font-semibold text-white hover:bg-blue-500/30">
              <BookUp />
              추천 도서 등록하기
            </Button>
          </div>
        </section>
        <section className="flex w-full flex-col">
          <div className="flex w-full justify-between px-2 py-4">
            <h1 className="text-xl font-semibold">서재</h1>
            <ChevronRight />
          </div>
          <div className="mx-auto grid max-w-sm grid-cols-1 gap-6 p-2 sm:max-w-3xl sm:grid-cols-2">
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
          </div>
        </section>
      </div>
      <FloatingActionButton href="/library/create" />
    </>
  );
}
