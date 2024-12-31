import React from 'react';
import {PostTitleProps} from "@/types/post";

export function PostTitle({frontMatter}: PostTitleProps) {
    const {title, date, author, tags} = frontMatter;
    const formattedDate = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <header className="mb-8">
            <p className='font-semibold text-4xl text-center'>{title}</p>
            <div className='flex space-x-2 justify-center'>{tags.map((tag, index) => {
                return (<span key={index} className='font-medium text-lg bg-indigo-300 rounded-full px-2'>{tag}</span>)
            })}</div>
            <div>{formattedDate}</div>
            <div className='h-0.5 my-5 bg-white'></div>
        </header>
    );
}

export default PostTitle;
