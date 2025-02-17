import Image from 'next/image';

import book from '../../../../public/images/book_test.png';
import Link from 'next/link';
import { HeartIcon } from 'lucide-react';

export default function BookCard() {
  return (
    <div className="flex flex-col ">
      <BookImage />
      <BookDescription />
    </div>
  );
}

function BookImage() {
  return (
    <Link href="/library/1">
      <div className="relative flex h-[300px] items-center justify-center rounded-t-lg">
        <div className="absolute z-10">
          <Image src={book} alt="book1" width={120} className="shadow-lg" />
        </div>
        <div className="relative size-full">
          <Image src={book} alt="book1" fill objectFit="cover" className="rounded-t-lg" />
          <div className="absolute inset-0 overflow-hidden rounded-t-lg bg-black/10 backdrop-blur dark:bg-black/40"></div>
        </div>
      </div>
    </Link>
  );
}

function BookDescription() {
  return (
    <div className="flex w-full flex-col  rounded-b-lg bg-neutral-100 p-5 dark:bg-neutral-900">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <HeartIcon />
          <p>3</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="https://product.kyobobook.co.kr/detail/S000214977649"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/gyobo_icon.png"
              alt="gyobo"
              width={30}
              height={30}
              className="rounded-full"
            />
          </Link>
          <Link
            href="https://product.kyobobook.co.kr/detail/S000214977649"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/yes24_icon.png"
              alt="yes24"
              width={30}
              height={30}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
      <Link href="/library/1">
        <div className="flex flex-col">
          <p>전문가를 위한 리액트</p>
          <p className="text-sm font-light">빠르고 성능이 뛰어난 직관적인 애플리케이션 구축하기</p>
        </div>
      </Link>
    </div>
  );
}
