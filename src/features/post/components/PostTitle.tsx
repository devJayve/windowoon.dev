import { ReadTimeResults } from 'reading-time';
import { formatDate } from '@/shared/lib/date';
import dayjs from 'dayjs';
import { Calendar, Clock, Eye } from 'lucide-react';
import PostControl from '@/features/post/components/PostControl';

interface PostTitleProps extends PostMetaProps {
  title: string;
}

interface PostMetaProps {
  date: Date;
  readingTime: ReadTimeResults;
  views: number;
}

export function PostTitle({ title, date, readingTime, views }: PostTitleProps) {
  return (
    <header className="mb-8 space-y-2">
      <h1 className="text-center text-6xl font-semibold">{title}</h1>
      <div className="relative flex items-center justify-center">
        <PostMeta readingTime={readingTime} date={date} views={views} />
        <PostControl />
      </div>
    </header>
  );
}

function PostMeta({ date, readingTime, views }: PostMetaProps) {
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
      <div className="flex items-center gap-1">
        <Eye size={15} />
        {views}
      </div>
    </div>
  );
}

export default PostTitle;
