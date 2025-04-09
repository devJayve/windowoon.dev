import { CreatePostRequest, Post } from '@/features/post/types';
import { db } from '@/db/drizzle';
import { PostCategoryTable, PostTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { resolveCategoryIds } from '@/features/category/lib/resolveCategoryIds';

export async function updatePost(postId: number, post: CreatePostRequest): Promise<Post> {
  return await db.transaction(async tx => {
    const [updatedPost] = await tx
      .update(PostTable)
      .set({
        title: post.title,
        content: post.content,
        description: post.description,
        slug: post.slug,
        categories: post.categories,
        updatedAt: new Date(),
      })
      .where(eq(PostTable.id, postId))
      .returning();

    await tx.delete(PostCategoryTable).where(eq(PostCategoryTable.postId, postId));

    const categoryIds = await resolveCategoryIds(post.categories, db);

    await tx
      .insert(PostCategoryTable)
      .values(categoryIds.map(categoryId => ({ postId, categoryId })));

    return updatedPost;
  });
}
