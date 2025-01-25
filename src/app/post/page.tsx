import RegPostList from '@/features/post/components/RegPostList';
import { getAllPosts } from '@/lib/posts';
import FloatingActionButton from '@/shared/components/FloatingActionButton';
import { Suspense } from 'react';
import { PostResponse } from '@/features/post/types';

export default async function BlogPage() {
  const allPosts = getAllPosts();

  const fetchPosts = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/post/api`);

    const data: PostResponse = await response.json();

    console.log(data);

    return data.posts;
  };

  const postsFromServer = await fetchPosts();

  return (
    <>
      <div className="flex flex-col justify-center">
        <Suspense fallback={<div>loading</div>}>
          <div>
            <p>fetch test</p>
            {postsFromServer.toString()}
          </div>
        </Suspense>
        <RegPostList posts={allPosts} />
        <FloatingActionButton />
      </div>
    </>
  );
}
