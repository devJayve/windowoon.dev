import RegPostList from '@/features/post/components/RegPostList';
import FloatingActionButton from '@/shared/components/button/FloatingActionButton';
import { checkIsAdmin, getAllPosts } from '@/features/post/lib';
import { getServerSession } from 'next-auth';

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const session = await getServerSession();

  return (
    <>
      <div className="flex flex-col justify-center">
        <RegPostList posts={allPosts} />
        {checkIsAdmin(session) && <FloatingActionButton />}
      </div>
    </>
  );
}
