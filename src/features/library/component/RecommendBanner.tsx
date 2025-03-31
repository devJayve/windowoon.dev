import { Button } from '@/shared/components/button/button';
import { BookUp } from 'lucide-react';
import Link from 'next/link';

function RecommendBanner() {
  return (
    <div className="flex justify-between rounded-lg border-1 border-blue-500 bg-blue-500/30 p-5 dark:bg-blue-600/30">
      <div>
        <p className="text-md font-semibold sm:text-lg">개발 서적이 아니어도 좋아요!</p>
        <p className="text-sm">간단한 추천 사유와 함께 책을 추천해주세요</p>
      </div>
      <Link href={'library/recommendation/create'}>
        <Button className="flex gap-1 bg-blue-500 font-semibold text-white hover:bg-blue-500/30">
          <BookUp />
          추천 도서 등록하기
        </Button>
      </Link>
    </div>
  );
}

export default RecommendBanner;
