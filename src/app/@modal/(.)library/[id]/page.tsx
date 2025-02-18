import BookDetail from '@/features/library/component/BookDetail';
import BookDetailBackdrop from '@/features/library/component/BookDetailBackdrop';

interface LibraryDetailPageProps {
  params: {
    id: string;
  };
}

export default function LibraryDetailPage({}: LibraryDetailPageProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <BookDetailBackdrop />
      <div className="absolute left-1/2 top-1/2 h-full max-h-[calc(100vh-8rem)] w-[calc(100%-6rem)] max-w-3xl -translate-x-1/2  -translate-y-1/2 overflow-hidden overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-neutral-900">
        <BookDetail />
      </div>
    </div>
  );
}
