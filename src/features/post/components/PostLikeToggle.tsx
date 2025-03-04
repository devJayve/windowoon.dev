import { getPostLikes } from '@/features/post/lib/getPostLikes';
import React from 'react';
import PostLikeButton from '@/features/post/components/PostLikeButton';

interface PostLikeToggleProps {
  postId: number;
}

async function PostLikeToggle({ postId }: PostLikeToggleProps) {
  const { count, isLiked } = await getPostLikes(postId);

  return (
    <PostLikeButton
      postId={postId}
      initialLikeState={{
        isLiked: isLiked,
        likeCount: count,
      }}
    />
  );
}

export default PostLikeToggle;
