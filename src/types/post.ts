import {MDXRemoteSerializeResult} from "next-mdx-remote";

export interface FrontMatter {
    title: string;
    date: string;
    author: string;
    category?: string;
    thumbnailURL?: string;
}

export interface PostTitleProps {
    frontMatter: FrontMatter
}

export interface MdxContentProps {
    source: MDXRemoteSerializeResult;
}

export interface PopularPostProps {
    category: string;
    title: string;
    imageUrl: string;
}

export interface PopularPostListProps {
    posts: { category: string, title: string; imageUrl: string }[];
}

export interface RegPostListProps {
    posts : RegPostProps[];
}

export interface RegPostProps {
    title: string,
    content : string,
    thumbnailUrl : string,
    date : string,
    slug: string,
}
