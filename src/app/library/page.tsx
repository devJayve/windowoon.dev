import LibraryItem from '@/app/library/components/LibraryItem';

export default function LibraryPage() {
  console.log('lint test');
  return (
    <div className="container mx-auto p-4">
      <div className="relative grid grid-cols-2 gap-4">
        <LibraryItem />
        <LibraryItem />
        <LibraryItem />
        <LibraryItem />
      </div>
    </div>
  );
}
