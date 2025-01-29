import RegPost from '@/features/post/components/RegPost';
import { PostMeta } from '@/features/post/types';

export interface RegPostListProps {
  posts: PostMeta[];
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
