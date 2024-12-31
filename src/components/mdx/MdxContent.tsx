"use client";
import dynamic from 'next/dynamic';
import {components} from "@/components/mdx/MdxComponents";
import {MdxContentProps} from "@/types/mdx";

const MDXRemote = dynamic(() => import('next-mdx-remote').then(mod => mod.MDXRemote), { ssr: false });

export default function MdxContent({ source }: MdxContentProps) {
    return (
        <div className="relative">
            <div className="mb-8">
                <MDXRemote {...source} components={components} />
            </div>
        </div>
    );
}
