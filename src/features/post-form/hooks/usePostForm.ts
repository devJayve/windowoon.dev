import { useState } from 'react';
import { WriteFormState } from '@/features/write/types';
import { createPost } from '@/features/post/lib';
import { useRouter } from 'next/navigation';
import { Post } from '@/features/post/types';
import { updatePost } from '@/features/post/lib/updatePost';

interface UsePostFormProps {
  postId?: number;
  mode: 'create' | 'edit';
  initialData?: Post;
}

export const usePostForm = ({ postId, mode, initialData }: UsePostFormProps) => {
  const router = useRouter();
  const [form, setForm] = useState<WriteFormState>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    categories: initialData?.categories || [],
    description: initialData?.description || '',
    content: initialData?.content || '',
  });

  const isValid =
    form.title.trim() &&
    form.categories.length > 0 &&
    form.content?.trim() &&
    form.slug.length > 0 &&
    form.description.length > 0;

  const handleTitle = (value: string) => {
    setForm(prev => ({ ...prev, title: value }));
  };

  const handleCategories = (categories: string[]) => {
    setForm(prev => ({ ...prev, categories }));
  };

  const handleContent = (content: string | undefined) => {
    setForm(prev => ({ ...prev, content: content || '' }));
  };

  const handleSlug = (slug: string) => {
    setForm(prev => ({ ...prev, slug }));
  };

  const handleDescription = (description: string) => {
    setForm(prev => ({ ...prev, description }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      if (mode === 'create') {
        await handleCreatePost();
      } else {
        await handleEditPost();
      }
    } catch (error) {
      alert(`오류가 발생했습니다. ${error}`);
    }
  };

  const handleCreatePost = async () => {
    await createPost(form);
    alert('업로드 성공');
    router.push('/post');
  };

  const handleEditPost = async () => {
    if (!postId) throw Error('postId가 없습니다.');

    await updatePost(postId, form);
    alert('수정 성공');
    router.push(`/post/${initialData?.id}/${form.slug}`);
  };

  return {
    form,
    isValid,
    handleTitle,
    handleCategories,
    handleContent,
    handleSlug,
    handleDescription,
    handleSubmit,
  };
};
