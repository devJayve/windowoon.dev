import React from 'react';
import {PostTitleProps} from "@/types/post";

export function PostTitle({frontMatter} : PostTitleProps) {
    const {title, date, author, tags} = frontMatter;

    return (
        <header className="mb-8">
            <h1 className="test-3xl">
                <p className='font-semibold text-xl'>{title}</p>
            </h1>
        </header>
    );
}

export default PostTitle;
