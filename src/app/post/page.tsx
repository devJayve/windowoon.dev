import FloatingActionButton from '@/shared/components/button/FloatingActionButton';
import { getAllPosts } from '@/features/post/lib';
import PostItem from '@/features/post/components/PostItem';

export default async function PostPage() {
  const allPosts = await getAllPosts();

  return (
    <>
      <div className="mx-auto max-w-3xl">
        {allPosts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <FloatingActionButton />
    </>
  );
}
