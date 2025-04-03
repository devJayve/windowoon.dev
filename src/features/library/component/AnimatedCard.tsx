import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/cn';
import Link from 'next/link';
import book from '../../../../public/images/book_test.png';
import { Quote } from 'lucide-react';
import { Noto_Serif_KR } from 'next/font/google';
import Image from 'next/image';

const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400'],
});

function AnimatedCard() {
  return (
    <Link href="/library/1">
      <motion.div
        className="relative aspect-square overflow-hidden rounded-lg"
        whileHover="hover"
        initial="initial"
      >
        <motion.div
          className="absolute z-10 flex size-full flex-col items-center justify-center p-4"
          variants={{
            initial: {
              y: 10,
            },
            hover: {
              y: -10,
              transition: {
                duration: 0.3,
              },
            },
          }}
        >
          <Image src={book} alt="book1" className="mb-2 w-2/5 rounded-r-lg shadow-2xl" />
          <h2 className="font-semibold">전문가를 위한 리액트</h2>
          <p className="line-clamp-1 text-sm font-light text-neutral-200">
            빠르고 성능이 뛰어난 직관적인 애플리케이션 구축하기
          </p>
          <motion.div
            className="mx-2 mt-2 flex gap-2"
            variants={{
              initial: {
                opacity: 0,
              },
              hover: {
                opacity: 1,
                transition: {
                  duration: 0.3,
                  delay: 0.1,
                },
              },
            }}
          >
            <Quote className="-rotate-180" size="12" />
            <p className={cn('line-clamp-3 text-sm tracking-tight', notoSerifKr.className)}>
              {
                'React의 동작 원리를 더 깊이 파고들어 이해할 수 있는 책 React의 동작 원리를 더 깊이 파고들어 이해할 수 있는 책 React의 동작 원리를 더 깊이 파고들어 이해할 수 있는 책'
              }
            </p>
            <Quote size="12" />
          </motion.div>
        </motion.div>
        <Image src={book} alt="book1" objectFit="cover" className="rounded-lg" />
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-t-lg backdrop-blur"
          variants={{
            initial: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
            hover: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              transition: {
                duration: 0.3,
              },
            },
          }}
        />
      </motion.div>
    </Link>
  );
}

export default AnimatedCard;
