import { ReadTimeResults } from 'reading-time';
import { formatDate } from '@/shared/lib/date';
import dayjs from 'dayjs';
import { Calendar, Clock } from 'lucide-react';
import PostControl from '@/features/post/components/PostControl';
import dynamic from 'next/dynamic';

interface PostTitleProps extends PostMetaProps {
  title: string;
}

interface PostMetaProps {
  postId: number;
  date: Date;
  readingTime: ReadTimeResults;
  views: number;
}

const ViewCounter = dynamic(() => import('@/features/post/components/ViewCounter'), { ssr: false });

export function PostTitle({ postId, title, date, readingTime, views }: PostTitleProps) {
  return (
    <header className="mb-8 space-y-2">
      <h1 className="text-center text-2xl font-semibold sm:text-5xl">{title}</h1>
      <div className="relative flex items-center justify-center">
        <PostMeta postId={postId} readingTime={readingTime} date={date} views={views} />
        <PostControl postId={postId} />
      </div>
    </header>
  );
}

function PostMeta({ postId, date, readingTime, views }: PostMetaProps) {
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
      <ViewCounter postId={postId} views={views} />
    </div>
  );
}

export default PostTitle;
