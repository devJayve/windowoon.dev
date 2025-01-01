import RegPostList from '@/app/blog/components/RegPostList';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  const allPosts = getAllPosts();
  return (
    <>
      <div className="flex flex-col justify-center">
        <RegPostList posts={allPosts} />
      </div>
    </>
  );
}
