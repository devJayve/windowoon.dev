import React from 'react';

const CategoryRadioButton = ({ category }: { category: string }) => {
  return <div className="mt-3 rounded-3xl border px-4 py-1">{category}</div>;
};

export default CategoryRadioButton;
