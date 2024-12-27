"use client";
import dynamic from 'next/dynamic';
import CodeBlock from './CodeBlock';
import {MdxContentProps} from "@/types/post";

// `MDXRemote`를 동적 import로 불러옵니다.
const MDXRemote = dynamic(() => import('next-mdx-remote').then(mod => mod.MDXRemote), { ssr: false });
const components = { CodeBlock };

export default function MdxContent({ source, frontMatter }: MdxContentProps) {
    return (
        <div className="relative">
            <div className="mb-8">
                <MDXRemote {...source} components={components} />
            </div>
        </div>
    );
}
