import React from 'react';
import Image from 'next/image';
import book from '../../../../public/images/book_3d.png';
import { CalendarIcon } from 'lucide-react';
import CategoryItem from '@/features/category/components/CategoryItem';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import ShareButton from '@/features/library/component/ShareButton';

function BookDetail() {
  const content = `"전문가를 위한 리액트"는 단순히 리액트의 기본 문법과 사용법을 넘어서, 실제 프로덕션
            환경에서 리액트를 효과적으로 활용하는 방법을 심도있게 다루고 있는 책입니다. 특히 인상
            깊었던 점은 함수형 프로그래밍의 원리를 리액트와 연결시켜 설명하는 부분이었습니다.
            불변성, 순수 함수, 컴포지션과 같은 개념들이 왜 리액트에서 중요한지 이해하기 쉽게
            설명되어 있었습니다. 책의 구성도 매우 체계적입니다. 기초적인 개념부터 시작해 점진적으로
            고급 주제로 나아가는 구성은 독자가 자연스럽게 지식을 쌓아갈 수 있도록 도와줍니다. 특히
            Hooks에 대한 설명이 탁월했는데, 단순히 사용법을 넘어서 내부 동작 원리와 최적화 방법까지
            상세하게 다루고 있어서 깊이 있는 이해가 가능했습니다. 실제 프로젝트에서 자주 마주치는
            성능 최적화, 상태 관리, 테스팅 등의 주제들도 실전적인 예제와 함께 다루고 있어서 실무에
            바로 적용할 수 있는 지식을 얻을 수 있었습니다. 다만, 책의 난이도가 꽤 높은 편이어서
            리액트를 처음 접하는 개발자보다는 어느 정도 경험이 있는 개발자에게 더 적합해 보입니다.
            전반적으로 이 책은 리액트를 더 깊이 이해하고 효과적으로 활용하고자 하는 개발자들에게
            매우 유용한 가이드가 될 것입니다. 특히 실무에서 리액트를 사용하면서 "왜 이렇게 해야
            하는가?"에 대한 근본적인 이해를 얻고자 하는 개발자들에게 강력히 추천합니다.`;
  return (
    <article className="relative mx-auto flex max-w-3xl flex-col p-6">
      <div className="flex justify-between">
        <div className="flex">
          <div className="p-2">
            <Image src={book} alt={'book'} width={100} className="object-cover" />
          </div>
          <div className=" flex flex-col justify-between p-3">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">전문가를 위한 리액트</p>
              <p className="text-xs">테자스 쿠마르</p>
              <div className="flex items-center gap-1">
                <CalendarIcon size={13} />
                <p className="text-xs">2025.01.23 ~ 2025.02.23</p>
              </div>
            </div>
            <div className="flex gap-1">
              <CategoryItem category="react" />
              <CategoryItem category="Javascript" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between p-3">
          <div className="flex items-center gap-2">
            {/*<LikeButton count={1} />*/}
            <ShareButton />
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
      </div>
      <div className="h-px w-full rounded-lg bg-white" />
      <div className="prose prose-neutral mx-auto w-full p-4 dark:prose-invert">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BookDetail;
