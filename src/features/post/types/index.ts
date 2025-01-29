import { PostTable } from '@/db/schema';

// export interface Post {
//   id: number;
//   title: string;
//   content: string;
//   description: string;
//   categories: string[];
//   slug: string;
//   views: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

export type Post = typeof PostTable.$inferSelect;

export type PostMeta = Omit<typeof PostTable.$inferSelect, 'content'>;

export type CreatePostRequest = Pick<
  Post,
  'title' | 'content' | 'description' | 'slug' | 'categories'
>;
