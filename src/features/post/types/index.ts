export interface Post {
  id: number;
  title: string;
  content: string;
  description: string;
  slug: string;
  views: number;
  viewMode: 'public' | 'development' | 'private';
  createdAt: Date;
  updatedAt: Date;
  categories: string[];
}

export type PostMeta = Omit<Post, 'content'>;

export type CreatePostRequest = Pick<
  Post,
  'title' | 'content' | 'description' | 'slug' | 'categories'
>;

export interface Toc {
  value: string;
  href: string;
  depth: number;
  numbering: number[];
  parent: string;
}
