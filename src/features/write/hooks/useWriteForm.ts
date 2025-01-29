import { useState } from 'react';
import { WriteFormState } from '@/features/write/types';
import { router } from 'next/client';

export const useWriteForm = () => {
  const [form, setForm] = useState<WriteFormState>({
    title: '',
    slug: '',
    categories: [],
    description: '',
    content: undefined,
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
    setForm(prev => ({ ...prev, content }));
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

    const response = await fetch('http://localhost:3000/api/post', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    const result = await response.json();
    if (result.success) {
      alert('업로드 성공');
      await router.push('/');
    }
    // TODO: DB 업로드
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
