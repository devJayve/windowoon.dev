'use client';
import React, { useRef } from 'react';
import { ImageInput } from '@/features/post/components/ImageInput';
import { Input } from '@/shared/components/input/Input';
import CategorySelect from '@/features/post-form/components/CategorySelect';
import TextArea from '@/shared/components/textarea/TextArea';
import { clsx } from 'clsx';
import { Category } from '../../write/types';
import { useTheme } from 'next-themes';
import { usePostForm } from '@/features/post-form/hooks/usePostForm';
import dynamic from 'next/dynamic';
import { Post } from '@/features/post/types';

interface PostFormProps {
  postId?: number;
  categories: Category[];
  mode: 'create' | 'edit';
  initialData?: Post;
}

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

function PostForm({ postId, mode, initialData, categories }: PostFormProps) {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    form,
    isValid,
    handleSubmit,
    handleContent,
    handleCategories,
    handleTitle,
    handleSlug,
    handleDescription,
    handleImageUpload,
  } = usePostForm({ postId, mode, initialData });

  const handleImageCommandClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="flex grow flex-col space-y-4 overflow-hidden p-8">
      <ImageInput fileInputRef={fileInputRef} handleImageUpload={handleImageUpload} />
      <Input
        className="px-2 py-1"
        placeholder="제목 입력"
        value={form.title}
        onChange={e => handleTitle(e.target.value)}
      />
      <Input
        className="px-2 py-1"
        placeholder="경로명 입력"
        value={form.slug}
        onChange={e => handleSlug(e.target.value)}
      />
      <CategorySelect
        initialCategories={form.categories}
        categories={categories}
        onChange={handleCategories}
      />
      <TextArea
        value={form.description}
        placeholder="설명 입력"
        onChange={e => handleDescription(e.target.value)}
      />

      <MDEditor
        data-color-mode={theme === 'dark' ? 'dark' : 'light'}
        value={form.content}
        onChange={handleContent}
        visibleDragbar={false}
        height="700px"
        commandsFilter={command => {
          if (command.name !== 'image') return command;
          return { ...command, execute: handleImageCommandClick };
        }}
      />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={clsx(
            'rounded-lg bg-green-600 px-3 py-1 font-semibold text-white',
            'disabled:opacity-70',
          )}
        >
          업로드하기
        </button>
      </div>
    </form>
  );
}

export default PostForm;
