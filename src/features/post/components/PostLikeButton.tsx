'use client';
import React, { useOptimistic } from 'react';
import LikeButton from '@/features/library/component/LikeButton';
import { toggleLikeAction } from '@/features/post/action/toggleLikeAction';
import { useSession } from 'next-auth/react';

export interface LikeState {
  isLiked: boolean;
  likeCount: number;
}

interface PostLikeButtonProps {
  postId: number;
  initialLikeState: LikeState;
}

function PostLikeButton({ postId, initialLikeState }: PostLikeButtonProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [optimisticState, addOptimistic] = useOptimistic<LikeState, Partial<LikeState>>(
    {
      isLiked: initialLikeState.isLiked,
      likeCount: initialLikeState.likeCount,
    },
    (state, newState) => ({ ...state, ...newState }),
  );

  const handleLike = async () => {
    console.log('userid', userId);
    if (!userId) return;

    const newIsLiked = !optimisticState.isLiked;
    const newLikeCount = newIsLiked ? optimisticState.likeCount + 1 : optimisticState.likeCount - 1;

    addOptimistic({
      isLiked: newIsLiked,
      likeCount: newLikeCount,
    });

    await toggleLikeAction(postId, userId);
  };

  return (
    <form action={handleLike} className="flex items-center justify-center">
      <LikeButton
        disabled={!session}
        isLiked={optimisticState.isLiked}
        count={optimisticState.likeCount}
        className="cursor-pointer rounded-2xl border-[1.5px] border-neutral-400 px-5 py-2 dark:border-neutral-200"
      />
    </form>
  );
}

export default PostLikeButton;
