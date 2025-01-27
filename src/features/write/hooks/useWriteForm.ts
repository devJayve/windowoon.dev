import { useState } from 'react';
import { WriteFormState } from '@/features/write/types';

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
