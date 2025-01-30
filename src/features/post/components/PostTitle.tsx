import { ReadTimeResults } from 'reading-time';
import { formatDate } from '@/shared/lib/date';
import dayjs from 'dayjs';
import { Calendar, Clock, Eye } from 'lucide-react';

interface PostTitleProps {
  title: string;
  readingTime: ReadTimeResults;
  date: Date;
  views: number;
}

export function PostTitle({ title, date, readingTime, views }: PostTitleProps) {
  return (
    <header className="mb-8 space-y-2">
      <h1 className="text-center text-6xl font-semibold">{title}</h1>
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
    </header>
  );
}

export default PostTitle;
