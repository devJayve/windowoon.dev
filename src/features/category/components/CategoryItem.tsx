import { cn } from '@/shared/lib/cn';

function CategoryItem({ category, className }: { category: string; className?: string }) {
  return (
    <span
      key={category}
      className={cn(
        'inline-flex items-center rounded-md bg-gray-200 px-2.5 text-xs font-medium dark:bg-gray-100/20',
        className,
      )}
    >
      {category}
    </span>
  );
}

export default CategoryItem;
