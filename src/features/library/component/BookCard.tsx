import React from 'react';
import Image from 'next/image';
import { Badge } from '@/shared/components/Badge';
import { Progress } from '@/shared/components/Progress';

// 메인 북카드 컴포넌트
export default function BookCard() {
  const book = {
    id: '1',
    title: '전문가를 위한 리액트',
    author: '애덤 프리먼',
    coverImage: '/images/book_test.png',
    status: 'reading', // 'reading', 'completed', 'wishlist'
    progress: 65, // 읽기 진행률 (%)
    startDate: '2023-09-01',
    completedDate: null,
    rating: 4.5,
    description: '리액트의 핵심 원리부터 고급 패턴까지 다루는 종합 가이드',
  };

  return (
    <div className="flex w-full gap-3 rounded-lg border border-neutral-300 p-4 transition-colors hover:border-blue-600">
      <Image
        src={book.coverImage}
        alt={book.title}
        width={100}
        height={110}
        className="rounded-r-lg"
      />

      <div className="flex grow flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="line-clamp-1 font-semibold text-white">{book.title}</h3>
              <p className="text-sm text-neutral-400">{book.author}</p>
            </div>
          </div>

          <p className="my-1 line-clamp-2 text-xs text-neutral-400">{book.description}</p>

          <Badge>Development</Badge>
        </div>

        <div className="mt-4">
          {book.status === 'reading' && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-neutral-400">
                <span>진행률</span>
                <span>{book.progress}%</span>
              </div>
              <Progress value={book.progress} className="h-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
