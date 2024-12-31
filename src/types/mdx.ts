import {DetailedHTMLProps, HTMLAttributes} from "react";
import {MDXRemoteSerializeResult} from "next-mdx-remote";
import {PostMatter} from "@/types/post";

export interface MdxComponentProps extends HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    className?: string;
}

export interface CodeBlockProps extends MdxComponentProps {
    node?: any,
    inline?: boolean,
    language?: string;
}

export interface MDXImageProps extends MdxComponentProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

export interface MdxContentProps {
    source: MDXRemoteSerializeResult;
}
