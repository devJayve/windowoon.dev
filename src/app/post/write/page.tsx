'use client';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { clsx } from 'clsx';
import CategorySelect from '@/features/write/components/CategorySelect';
import Input from '@/shared/components/input/Input';
import { useWriteForm } from '@/features/write/hooks/useWriteForm';
import TextArea from '@/shared/components/textarea/TextArea';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function WritePage() {
  const { theme } = useTheme();
  const {
    form,
    isValid,
    handleSubmit,
    handleContent,
    handleCategories,
    handleTitle,
    handleSlug,
    handleDescription,
  } = useWriteForm();

  return (
    <form onSubmit={handleSubmit} className="flex grow flex-col space-y-4 overflow-hidden p-8">
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
      <CategorySelect onChange={handleCategories} />
      <TextArea placeholder="설명 입력" onChange={e => handleDescription(e.target.value)} />
      <MDEditor
        data-color-mode={theme === 'dark' ? 'dark' : 'light'}
        value={form.content}
        onChange={handleContent}
        visibleDragbar={false}
        height="700px"
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
