'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { LoremIpsum } from 'lorem-ipsum';
import { clsx } from 'clsx';

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

  //TODO: 카테고리 태그 생성 및 추가

  return (
    <div data-color-mode={theme} className="flex grow flex-col space-y-4 overflow-hidden p-8">
      <label htmlFor="title-input">제목</label>
      <input id="title-input" className="rounded border border-gray-600 px-3 py-1" type="text" />
      <MDEditor value={markdown} onChange={handleMarkdown} visibleDragbar={false} height="700px" />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!markdown}
          className={clsx('rounded-lg bg-green-600 px-3 py-1 font-semibold', 'disabled:opacity-70')}
        >
          업로드하기
        </button>
      </div>
    </div>
  );
}
