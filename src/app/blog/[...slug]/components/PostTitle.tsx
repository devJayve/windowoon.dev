import React from 'react';

import { PostTitleProps } from '@/types/post';

export function PostTitle({ frontMatter }: PostTitleProps) {
  const { title, date, tags } = frontMatter;
  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <header className="mb-8">
      <p className="text-center text-4xl font-semibold">{title}</p>
      <div className="flex justify-center space-x-2">
        {tags.map((tag, index) => {
          return (
            <span key={index} className="rounded-full bg-indigo-300 px-2 text-lg font-medium">
              {tag}
            </span>
          );
        })}
      </div>
      <div>{formattedDate}</div>
      <div className="my-5 h-0.5 bg-white"></div>
    </header>
  );
}

export default PostTitle;
