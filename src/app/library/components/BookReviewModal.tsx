import Image from 'next/image';

import { BookReviewModalProps } from '@/shared/types/library';

import book from '../../../../public/images/book_test.png';

export default function BookReviewModal({ onClose }: BookReviewModalProps) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[80vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white shadow-xl dark:bg-neutral-800">
        <div className="relative flex p-6">
          <div className="relative w-1/3">
            <div className="relative aspect-[3/4]">
              <Image src={book} alt="book detail" fill className="rounded-lg object-cover" />
            </div>
          </div>
          <div className="ml-6 flex-1">
            <h2 className="mb-4 text-2xl font-bold dark:text-white">책 제목</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              책에 대한 자세한 설명이 들어갑니다.
            </p>
            <div className="space-y-2">
              <p className="dark:text-gray-300">
                <span className="font-semibold">저자:</span> 작가 이름
              </p>
              <p className="dark:text-gray-300">
                <span className="font-semibold">출판사:</span> 출판사 이름
              </p>
              <p className="dark:text-gray-300">
                <span className="font-semibold">출판일:</span> 2024.01.01
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
