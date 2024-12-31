import {MDXRemoteSerializeResult} from "next-mdx-remote";

export interface PostMatter {
    title: string;
    date: Date;
    author: string;
    tags: string[];
    summary: string;
    thumbnailURL?: string;
}

export interface Post {
    category: string
    slug: string
    content: string
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
