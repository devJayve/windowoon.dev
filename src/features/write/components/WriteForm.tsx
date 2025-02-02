'use client';
import React, { useRef } from 'react';
import { ImageInput } from '@/features/post/components/ImageInput';
import Input from '@/shared/components/input/Input';
import CategorySelect from '@/features/write/components/CategorySelect';
import TextArea from '@/shared/components/textarea/TextArea';
import { clsx } from 'clsx';
import { Category } from '../types';
import { useTheme } from 'next-themes';
import { useWriteForm } from '@/features/write/hooks/useWriteForm';
import dynamic from 'next/dynamic';

interface WriteFormProps {
  categories: Category[];
}

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

function WriteForm({ categories }: WriteFormProps) {
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
  } = useWriteForm();

  const handleImageCommandClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="flex grow flex-col space-y-4 overflow-hidden p-8">
      <ImageInput fileInputRef={fileInputRef} handleImageUpload={handleImageUpload} />
      <Input
        className="px-2 py-1"
        placeholder="제목 입력"
        onChange={e => handleTitle(e.target.value)}
      />
      <Input
        className="px-2 py-1"
        placeholder="경로명 입력"
        onChange={e => handleSlug(e.target.value)}
      />
      <CategorySelect categories={categories} onChange={handleCategories} />
      <TextArea placeholder="설명 입력" onChange={e => handleDescription(e.target.value)} />

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

export default WriteForm;
