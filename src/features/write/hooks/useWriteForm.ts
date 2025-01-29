import { useState } from 'react';
import { WriteFormState } from '@/features/write/types';
import { createPost } from '@/features/post/lib';
import { useRouter } from 'next/navigation';

export const useWriteForm = () => {
  const router = useRouter();
  const [form, setForm] = useState<WriteFormState>({
    title: '',
    slug: '',
    categories: [],
    description: '',
    content: '',
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
      await createPost(form);

      alert('업로드 성공');
      router.push('/post');
    } catch (error) {
      alert(`오류가 발생했습니다. ${error}`);
    }
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
