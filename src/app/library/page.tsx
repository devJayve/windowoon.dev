import LibraryItem from '@/app/library/components/LibraryItem';

export default function LibraryPage() {
  return (
    <div className="flex w-full justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2">
          <LibraryItem />
          <LibraryItem />
          <LibraryItem />
          <LibraryItem />
          <LibraryItem />
          <LibraryItem />
          <LibraryItem />
          <LibraryItem />
        </div>
      </div>
    </div>
  );
}
