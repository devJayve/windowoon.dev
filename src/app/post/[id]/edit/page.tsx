import { getCategories } from '@/features/category/lib/getCategories';
import PostForm from '@/features/post-form/components/PostForm';
import { getPost } from '@/features/post/lib';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const postId = Number(params.id);
  const [categories, post] = await Promise.all([
    getCategories(),
    getPost(postId).catch(() => null),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <Suspense>
      <PostForm postId={postId} mode="edit" categories={categories} initialData={post} />
    </Suspense>
  );
}
