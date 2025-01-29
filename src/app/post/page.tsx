import RegPostList from '@/features/post/components/RegPostList';
import FloatingActionButton from '@/shared/components/button/FloatingActionButton';
import { getAllPosts } from '@/features/post/lib';

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  return (
    <>
      <div className="flex flex-col justify-center">
        <RegPostList posts={allPosts} />
        <FloatingActionButton />
      </div>
    </>
  );
}
