'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ImageInput } from '@/features/post/components/ImageInput';
import { Input } from '@/shared/components/input/Input';
import CategorySelect from '@/features/post-form/components/CategorySelect';
import { Textarea } from '@/shared/components/textarea/TextArea';
import { Category, WriteFormState } from '../../write/types';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { Post } from '@/features/post/types';
import { Button } from '@/shared/components/button/button';
import { useFormState } from 'react-dom';
import { submitPostAction } from '@/features/post-form/action/submitPostAction';
import { useRouter } from 'next/navigation';
import { ImageUploadResult } from '@/features/post/lib/uploadToStorageAction';

interface PostFormProps {
  postId?: number;
  categories: Category[];
  mode: 'create' | 'edit';
  initialData?: Post;
}

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const baseForm: WriteFormState = {
  title: '',
  slug: '',
  description: '',
  categories: [],
  content: '',
};

function PostForm({ postId, mode, initialData, categories }: PostFormProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState(initialData || baseForm);

  const handleFormChange = (key: keyof WriteFormState, value: string | string[]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleImageCommandClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUploadStart = (markerId: string) => {
    console.log('marker 0', markerId);
    const loadingText = `[이미지 업로드중...${markerId}]`;
    const newContent = `${form.content}\n${loadingText}\n`;

    handleFormChange('content', newContent);
  };

  const handleImageUploadComplete = async (markerId: string, result?: ImageUploadResult) => {
    const imageMarkdown = result
      ? `<Image src="${result.url}" alt="${result.filename}" />`
      : `[이미지 업로드 실패 ${markerId}]`;

    console.log(result);
    const loadingRegex = new RegExp(`\\[이미지 업로드중...${markerId}\\]`, 'g');

    if (form.content.includes(`[이미지 업로드중...${markerId}]`)) {
      const newContent = form.content.replace(loadingRegex, imageMarkdown);
      handleFormChange('content', newContent);
    } else {
      handleFormChange('content', `${form.content}\n${imageMarkdown}\n`);
    }
  };

  const submitPost = submitPostAction.bind(null, mode, form, postId);
  const [state, formAction] = useFormState(submitPost, null);

  useEffect(() => {
    if (state) {
      alert(state.message);
      if (state.success) {
        router.push('/');
      }
    }
  }, [state]);

  return (
    <>
      <ImageInput
        imageInputRef={fileInputRef}
        onUploadStart={handleImageUploadStart}
        onUploadComplete={handleImageUploadComplete}
      />
      <form
        action={formAction}
        className="md-editor-wrapper flex grow flex-col space-y-4 overflow-hidden p-8"
      >
        <Input
          className="px-2 py-1"
          placeholder="제목 입력"
          value={form.title}
          onChange={e => handleFormChange('title', e.target.value)}
        />
        <Input
          className="px-2 py-1"
          placeholder="경로명 입력"
          value={form.slug}
          onChange={e => handleFormChange('slug', e.target.value)}
        />
        <CategorySelect
          initialCategories={form.categories}
          categories={categories}
          onChange={value => handleFormChange('categories', value)}
        />
        <Textarea
          value={form.description}
          placeholder="설명 입력"
          onChange={e => handleFormChange('description', e.target.value)}
        />
        <MDEditor
          data-color-mode={theme === 'dark' ? 'dark' : 'light'}
          value={form.content}
          onChange={value => handleFormChange('content', value || '')}
          visibleDragbar={false}
          height="700px"
          commandsFilter={command => {
            if (command.name !== 'image') return false;
            return { ...command, execute: handleImageCommandClick };
          }}
        />
        <div className="flex justify-end">
          <Button type="submit">업로드하기</Button>
        </div>
      </form>
    </>
  );
}

export default PostForm;
