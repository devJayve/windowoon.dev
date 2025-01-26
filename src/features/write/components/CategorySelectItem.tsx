import React from 'react';

interface CategorySelectItemProps {
  value: string;
  removeCategory: (category: string) => void;
}

function CategorySelectItem({ value, removeCategory }: CategorySelectItemProps) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-black/30 px-2 text-sm dark:bg-white/30">
      {value}
      <button
        type="button"
        onClick={() => removeCategory(value)}
        className="font-bold hover:text-red-500"
      >
        ×
      </button>
    </span>
  );
}

export default CategorySelectItem;
