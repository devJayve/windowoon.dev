import {HTMLAttributes} from "react";
import {MDXRemoteSerializeResult} from "next-mdx-remote";

export interface MdxComponentProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export interface CodeBlockProps extends MdxComponentProps {
    node?: any,
    inline?: boolean,
    className?: string;
    language?: string;
}

export interface MdxContentProps {
    source: MDXRemoteSerializeResult;
}
