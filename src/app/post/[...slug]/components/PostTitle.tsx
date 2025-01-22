import React from 'react';

import { PostTitleProps } from '@/types/post';

export function PostTitle({ frontMatter }: PostTitleProps) {
  const { title } = frontMatter;

  return (
    <header className="mb-8">
      <p className="text-center text-4xl font-semibold">{title}</p>
      <div className="my-5 h-0.5 bg-white/50"></div>
    </header>
  );
}

export default PostTitle;
