import RegPostList from '@/features/post/components/RegPostList';
import FloatingActionButton from '@/shared/components/button/FloatingActionButton';
import { Suspense } from 'react';
import { PostResponse } from '@/features/post/types';

export default async function BlogPage() {
  const fetchPosts = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/post`);

    const data: PostResponse = await response.json();

    console.log(data);

    return data.posts;
  };

  const allPosts = await fetchPosts();

  return (
    <>
      <div className="flex flex-col justify-center">
        <Suspense fallback={<div>loading</div>}>
          <RegPostList posts={allPosts} />
        </Suspense>
        <FloatingActionButton />
      </div>
    </>
  );
}
