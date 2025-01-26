'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { LoremIpsum } from 'lorem-ipsum';
import { clsx } from 'clsx';
import CategorySelect from '@/features/write/components/CategorySelect';
import Input from '@/shared/components/input/Input';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function WritePage() {
  const lorem = new LoremIpsum();
  const [markdown, setMarkdown] = useState<string | undefined>(lorem.generateParagraphs(10));
  const { theme } = useTheme();

  const handleMarkdown = (value: string | undefined) => {
    setMarkdown(value);
  };

  const handleSubmit = () => {
    //TODO: DB 업로드
  };

  return (
    <div data-color-mode={theme} className="flex grow flex-col space-y-4 overflow-hidden p-8">
      <Input className="px-2 py-1" placeholder="제목 입력" />
      <CategorySelect />
      <MDEditor value={markdown} onChange={handleMarkdown} visibleDragbar={false} height="700px" />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!markdown}
          className={clsx(
            'rounded-lg bg-green-600 px-3 py-1 font-semibold text-white',
            'disabled:opacity-70',
          )}
        >
          업로드하기
        </button>
      </div>
    </div>
  );
}
