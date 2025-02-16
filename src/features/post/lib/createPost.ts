import { CreatePostRequest, Post } from '@/features/post/types';
import { db } from '@/db/drizzle';
import { PostCategoryTable, PostTable } from '@/db/schema';
import { resolveCategoryIds } from '@/features/category/lib/resolveCategoryIds';

export async function createPost(post: CreatePostRequest): Promise<Post> {
  return await db.transaction(async tx => {
    const [newPost] = await tx
      .insert(PostTable)
      .values({
        title: post.title,
        content: post.content,
        description: post.description,
        slug: post.slug,
        categories: post.categories,
      })
      .returning();

    const categoryIds = await resolveCategoryIds(post.categories, db);

    await tx
      .insert(PostCategoryTable)
      .values(categoryIds.map(categoryId => ({ postId: newPost.id, categoryId })));

    return newPost;
  });
}
