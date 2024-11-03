import React from 'react';
import CategoryRadioButton from "@/app/blog/CategoryRadioButton";

const categoryList : string[] = [
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
        <div className='flex flex-wrap space-x-4 justify-center my-4 cursor-pointer'>
            {categoryList.map((category, index) => (
                <CategoryRadioButton key={index} category={category}/>
            ))}
        </div>
    );
};

export default CategoryRadioList;