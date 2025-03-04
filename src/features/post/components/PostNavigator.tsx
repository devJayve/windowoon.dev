import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Post } from '@/features/post/types';
import Link from 'next/link';

interface PostNavigatorProps {
  previousPost?: Pick<Post, 'id' | 'title' | 'slug'> | null;
  nextPost?: Pick<Post, 'id' | 'title' | 'slug'> | null;
}

function PostNavigator({ previousPost, nextPost }: PostNavigatorProps) {
  return (
    <div className="mt-4 flex items-start justify-between">
      {previousPost ? (
        <div className="group flex w-1/2 items-start space-x-1 pr-4">
          <ChevronLeft className="mt-1 size-4 shrink-0 text-neutral-500 transition-colors group-hover:text-neutral-800  dark:group-hover:text-neutral-100" />
          <Link
            href={`/post/${previousPost.id}/${previousPost.slug}`}
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-800  dark:hover:text-neutral-100"
          >
            <span className="block text-xs text-neutral-400 dark:text-neutral-300">
              이전 게시물
            </span>
            <div className="line-clamp-2">{previousPost.title}</div>
          </Link>
        </div>
      ) : (
        <div className="w-24" />
      )}

      {nextPost ? (
        <div className="group flex w-1/2 items-start justify-end space-x-1 pl-4 text-right">
          <Link
            href={`/post/${nextPost.id}/${nextPost.slug}`}
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-800  dark:hover:text-neutral-100"
          >
            <span className="block text-xs text-neutral-400 dark:text-neutral-300">
              다음 게시물
            </span>
            <div className="line-clamp-2">{nextPost.title}</div>
          </Link>
          <ChevronRight className="mt-1 size-4 shrink-0  text-neutral-500 transition-colors group-hover:text-neutral-800  dark:group-hover:text-neutral-100" />
        </div>
      ) : (
        <div className="w-24" />
      )}
    </div>
  );
}

export default PostNavigator;
