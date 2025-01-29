import RegPost from '@/features/post/components/RegPost';
import { Post } from '@/features/post/types';

export interface RegPostListProps {
  posts: Post[];
}

export default function RegPostList({ posts }: RegPostListProps) {
  return (
    <div>
      {posts.map((post, index) => (
        <RegPost key={index} post={post} />
      ))}
    </div>
  );
}
