// components/MdxContent.tsx
"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import CodeBlock from './CodeBlock';

interface MdxContentProps {
    source: MDXRemoteSerializeResult;
}

// `MDXRemote`를 동적 import로 불러옵니다.
const MDXRemote = dynamic(() => import('next-mdx-remote').then(mod => mod.MDXRemote), { ssr: false });

const components = { CodeBlock };

export default function MdxContent({ source }: MdxContentProps) {
    const [like, setLike] = useState(0);

    return (
        <div>
            <button onClick={() => setLike(like + 1)}>좋아요 {like}</button>
            <MDXRemote {...source} components={components} />
        </div>
    );
}