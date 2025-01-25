import fs from 'fs';
import path from 'path';

import { sync } from 'glob';
import matter from 'gray-matter';
import { Post, PostMatter } from '@/shared/types/post';
const BASE_PATH = '/public/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

/**
 * posts 내에 모든 mdx 파일 및 메타정보 추출
 */
export function getAllPosts(): Post[] {
  // posts 폴더 내의 모든 index.mdx 파일 경로를 가져옴
  const postPaths = sync(`${POSTS_PATH}/**/index.mdx`);

  return postPaths
    .map(filePath => {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { content, data } = matter(fileContents);

      // 파일 경로에서 category와 slug 추출
      const pathParts = filePath.replace(`${POSTS_PATH}/`, '').replace('/index.mdx', '').split('/');

      const category = pathParts[0];
      const slug = pathParts[1];

      return {
        slug,
        category,
        content,
        frontMatter: data as PostMatter,
      };
    })
    .sort(
      (a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime(),
    );
}

export function getPost(category: string, slug: string): Post {
  const postPath = path.join(POSTS_PATH, category, slug);
  const fullPath = path.join(postPath, 'index.mdx');

  const fileContent = fs.readFileSync(fullPath, 'utf8');

  const { content, data } = matter(fileContent);

  return {
    category,
    slug,
    content,
    frontMatter: data as PostMatter,
  };
}

/**
 * 카테고리를 기준으로 posts 추출
 */
export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(post => post.category === category);
}

/**
 * 모든 카테고리 추출
 */
export function getAllCategories(): string[] {
  return Array.from(new Set(getAllPosts().map(post => post.category)));
}

/**
 * frontMatter url값을 기반으로 image 주소 반환
 * TODO: production 예외 처리 및 default 이미지 처리
 */
export function getImagePath(category: string, slug: string, thumbnailURL: string) {
  if (/^https?:\/\//.test(thumbnailURL)) {
    return thumbnailURL;
  }

  if (thumbnailURL.startsWith('/')) {
    return thumbnailURL;
  }

  const cleanPath = thumbnailURL.replace(/^\.\//, '');

  return `posts/${category}/${slug}/${cleanPath}`;
}
