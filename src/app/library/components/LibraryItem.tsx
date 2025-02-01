'use client';
import Image from 'next/image';
import { useState } from 'react';

import BookReviewModal from '@/app/library/components/BookReviewModal';

import book from '../../../../public/images/book_test.png';

export default function LibraryItem() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="flex aspect-[4/5] w-full max-w-xs cursor-pointer flex-col overflow-hidden rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex-[3]">
          <BookImage />
        </div>
        <div className="flex-1">
          <BookDescription />
        </div>
      </div>
      {isOpen && <BookReviewModal onClose={() => setIsOpen(false)} />}
    </>
  );
}

function BookImage() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="absolute z-10">
        <Image src={book} alt="book1" width={120} height={0} className="shadow-lg" />
      </div>
      <div className="relative size-full">
        <Image src={book} alt="book1" fill objectFit="cover" />
        <div className="absolute inset-0 bg-white/20 backdrop-blur dark:bg-black/20"></div>
      </div>
    </div>
  );
}

function BookDescription() {
  return (
    <div className="flex h-full items-center justify-center bg-white dark:bg-neutral-800">
      북 설명
    </div>
  );
}
