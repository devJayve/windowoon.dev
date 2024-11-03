import React from 'react';

const CategoryRadioButton = ({category} : { category : string }) => {
    return (
        <div className='rounded-3xl border px-4 py-1 mt-3'>
            {category}
        </div>
    );
};

export default CategoryRadioButton;