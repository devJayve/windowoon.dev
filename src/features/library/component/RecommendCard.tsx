import React from 'react';
import Image from 'next/image';
import book from '../../../../public/images/book_test.png';

function RecommendCard() {
  return (
    <div className="relative flex min-w-[200px] overflow-hidden rounded-lg">
      <Image src={book} alt="blur background" fill className="rounded-lg object-cover blur-sm" />
      <div className="relative flex flex-col items-center justify-center bg-neutral-800/50 p-4">
        <Image src={book} alt="book1" width={80} className="rounded-r-lg shadow-2xl" />
        <h2 className="line-clamp-1 text-sm font-semibold">전문가를 위한 리액트</h2>
        <p className="line-clamp-1 text-xs font-light text-neutral-100">
          빠르고 성능이 뛰어난 직관적인 애플리케이션 구축하기
        </p>
      </div>
    </div>
  );
}

export default RecommendCard;
