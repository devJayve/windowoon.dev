import {sync} from "glob";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

const BASE_PATH = '/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export const getAllPosts = () =>  {
    const postPaths = sync(`${POSTS_PATH}/**/*.mdx`);

    return postPaths.map((path) => {
        console.log(path);
        return {
            slug: path.slice(path.indexOf(BASE_PATH)).replace('.mdx', ''),
        }
    });
}

export const getPostData = (slug: string) => {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContents);

    return { content, frontMatter: data };
}