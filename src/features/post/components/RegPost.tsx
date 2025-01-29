import Link from 'next/link';
import { Post } from '@/features/post/types';

interface RegPostProps {
  post: Post;
}

export default function RegPost({ post }: RegPostProps) {
  return (
    <Link href={`/post/${post.id}/${post.slug}`}>
      <div className="flex p-4">
        <div className="grow basis-3/4">
          <p className="mt-3 text-sm font-light">{post.createdAt.toLocaleString()}</p>
          <div className="font-semibold">{post.title}</div>
        </div>
        <div className="grow basis-1/4"></div>
      </div>
    </Link>
  );
}
