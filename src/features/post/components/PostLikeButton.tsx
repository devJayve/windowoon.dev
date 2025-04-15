'use client';
import React, { startTransition, useEffect, useState } from 'react';
import LikeButton from '@/features/library/component/LikeButton';
import { toggleLikeAction } from '@/features/post/action/toggleLikeAction';
import { useDebouncedCallback } from 'use-debounce';
import { getLikeAction } from '@/features/post/action/getLikeAction';

export interface LikeState {
  isLiked: boolean;
  count: number;
}

interface PostLikeButtonProps {
  postId: number;
}

function PostLikeButton({ postId }: PostLikeButtonProps) {
  const [likeState, setLikeState] = useState<LikeState>({ isLiked: false, count: 0 });

  const debouncedToggleLike = useDebouncedCallback((postId: number) => {
    startTransition(async () => {
      await toggleLikeAction(postId);
    });
  }, 500);

  const handleLike = async () => {
    setLikeState(prevState => ({
      isLiked: !prevState.isLiked,
      count: prevState.isLiked ? prevState.count - 1 : prevState.count + 1,
    }));

    debouncedToggleLike(postId);
  };

  useEffect(() => {
    getLikeAction(postId).then(setLikeState);
  }, [postId]);

  return (
    <div className="flex items-center justify-center">
      <LikeButton
        onClick={handleLike}
        isLiked={likeState.isLiked}
        count={likeState.count}
        className="cursor-pointer rounded-2xl border-[1.5px] border-neutral-400 px-5 py-2 dark:border-neutral-200"
      />
    </div>
  );
}

export default PostLikeButton;
