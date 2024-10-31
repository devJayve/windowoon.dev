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