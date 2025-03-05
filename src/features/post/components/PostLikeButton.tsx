'use client';
import React, { startTransition } from 'react';
import LikeButton from '@/features/library/component/LikeButton';
import { toggleLikeAction } from '@/features/post/action/toggleLikeAction';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLikeState } from '@/features/post/hooks/useLikeState';
import { useDebouncedCallback } from 'use-debounce';

interface PostLikeButtonProps {
  postId: number;
}

function PostLikeButton({ postId }: PostLikeButtonProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { likeState, setLikeState } = useLikeState(postId);

  const debouncedToggleLike = useDebouncedCallback((postId: number, userId: string) => {
    startTransition(async () => {
      await toggleLikeAction(postId, userId);
    });
  }, 500);

  const handleLike = async () => {
    if (!userId) {
      router.push('/login');
      return;
    }

    setLikeState(prevState => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked ? prevState.likeCount - 1 : prevState.likeCount + 1,
    }));

    debouncedToggleLike(postId, userId);
  };

  return (
    <div className="flex items-center justify-center">
      <LikeButton
        onClick={handleLike}
        isLiked={likeState.isLiked}
        count={likeState.likeCount}
        className="cursor-pointer rounded-2xl border-[1.5px] border-neutral-400 px-5 py-2 dark:border-neutral-200"
      />
    </div>
  );
}

export default PostLikeButton;
