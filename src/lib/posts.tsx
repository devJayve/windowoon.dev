import {sync} from "glob";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

const BASE_PATH = '/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);


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

export const getAllPosts = () =>  {
    const postPaths = sync(`${POSTS_PATH}/**/*.mdx`);

    return postPaths.map((path) => {
        return {
            slug: path.replace(`${POSTS_PATH}/`, '').replace('.mdx', ''),
        }
    });
}

export const getPostData = (slug: string) => {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContents);

    return { content, frontMatter: data };
}

interface PostMetadata {
    title: string;
    date: string;
    author: string;
    slug: string;
}

// export interface RegPostListProps {
//     posts : RegPostProps[];
// }
//
// export interface RegPostProps {
//     title: string,
//     content : string,
//     thumbnailUrl : string,
//     date : string,
//     slug: string,
// }

export function getPostMetadata(post: { slug: string, frontMatter: any }): RegPostProps {
    return {
        ...post.frontMatter,
        slug: post.slug,
        thumbnailUrl: '',
    };
}
