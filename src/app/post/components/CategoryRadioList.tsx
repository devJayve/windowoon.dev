import React from 'react';

import CategoryRadioButton from '@/app/post/components/CategoryRadioButton';

const categoryList: string[] = [
  'Flutter',
  'React',
  'Typescript',
  'Javascript',
  'AI',
  'Deep Learning',
  'Flutter',
  'React',
  'Typescript',
  'Javascript',
];

const CategoryRadioList = () => {
  return (
    <div className="my-4 flex cursor-pointer flex-wrap justify-center space-x-4">
      {categoryList.map((category, index) => (
        <CategoryRadioButton key={index} category={category} />
      ))}
    </div>
  );
};

export default CategoryRadioList;
