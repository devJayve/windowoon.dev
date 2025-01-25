import { Post, PostMatter } from '@/features/post/types';

export interface PostTitleProps {
  frontMatter: PostMatter;
}

export interface PopularPostProps {
  category: string;
  title: string;
  imageUrl: string;
}

export interface PopularPostListProps {
  posts: { category: string; title: string; imageUrl: string }[];
}

export interface RegPostListProps {
  posts: Post[];
}

export interface RegPostProps {
  frontMatter: PostMatter;
  slug: string;
  category: string;
}
