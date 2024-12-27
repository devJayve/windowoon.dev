import {MDXRemoteSerializeResult} from "next-mdx-remote";

export interface PostMatter {
    title: string;
    date: string;
    author: string;
    tags: string[];
    summary: string;
    thumbnailURL?: string;
}

export interface Post {
    content: string
    slug: string
    category: string
    frontMatter: PostMatter
}


export interface PostTitleProps {
    frontMatter: PostMatter
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
    posts : Post[];
}

export interface RegPostProps {
    frontMatter: PostMatter;
    slug: string;
    category: string;
}
