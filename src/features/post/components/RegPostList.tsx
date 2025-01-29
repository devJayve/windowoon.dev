import RegPost from '@/features/post/components/RegPost';
import { RegPostListProps } from '@/shared/types/post';

export default function RegPostList({ posts }: RegPostListProps) {
  return (
    <div>
      {posts.map((post, index) => (
        <RegPost key={index} post={post} />
      ))}
    </div>
  );
}
