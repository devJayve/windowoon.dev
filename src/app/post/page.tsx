import { getAllPosts } from '@/features/post/lib';
import PostItem from '@/features/post/components/PostItem';
import dynamic from 'next/dynamic';

const FloatingActionButton = dynamic(
  () => import('@/shared/components/button/FloatingActionButton'),
  { ssr: true },
);

export default async function PostPage() {
  const allPosts = await getAllPosts();

  return (
    <>
      <div className="mx-auto max-w-3xl">
        {allPosts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <FloatingActionButton href="/post/create" />
    </>
  );
}
