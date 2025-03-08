import { ReadTimeResults } from 'reading-time';
import { formatDate } from '@/shared/lib/date';
import dayjs from 'dayjs';
import { Calendar, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';

interface PostTitleProps extends PostMetaProps {
  title: string;
}

interface PostMetaProps {
  postId: number;
  date: Date;
  readingTime: ReadTimeResults;
}

const ViewCounter = dynamic(() => import('@/features/post/components/ViewCounter'), { ssr: false });
const PostControl = dynamic(() => import('@/features/post/components/PostControl'), { ssr: false });

export function PostTitle({ postId, title, date, readingTime }: PostTitleProps) {
  return (
    <header className="mb-8 space-y-2">
      <h1 className="my-5 text-center text-3xl font-semibold sm:text-4xl">{title}</h1>
      <div className="relative flex flex-col">
        <PostMeta postId={postId} readingTime={readingTime} date={date} />
        <PostControl postId={postId} />
      </div>
    </header>
  );
}

function PostMeta({ postId, date, readingTime }: PostMetaProps) {
  return (
    <div className="flex items-center justify-center gap-4 text-sm">
      <div className="flex items-center gap-1">
        <Calendar size={15} />
        <time dateTime={dayjs(date).toISOString()}>{formatDate(date)}</time>
      </div>
      <div className="flex items-center gap-1">
        <Clock size={15} />
        <p>{readingTime.text}</p>
      </div>
      <ViewCounter postId={postId} />
    </div>
  );
}

export default PostTitle;
