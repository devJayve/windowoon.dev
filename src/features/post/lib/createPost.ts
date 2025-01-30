import { CreatePostRequest, Post } from '@/features/post/types';
import { db } from '@/db/drizzle';
import { CategoryTable, PostCategoryTable, PostTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function createPost(post: CreatePostRequest): Promise<Post> {
  return await db.transaction(async tx => {
    const [newPost] = await db
      .insert(PostTable)
      .values({ ...post })
      .returning();

    const categoryIds = await Promise.all(
      post.categories.map(async (categoryName: string) => {
        const [existingCategory] = await tx
          .select()
          .from(CategoryTable)
          .where(eq(CategoryTable.name, categoryName));

        if (existingCategory) {
          return existingCategory.id;
        }

        const [newCategory] = await tx
          .insert(CategoryTable)
          .values({ name: categoryName })
          .returning();

        return newCategory.id;
      }),
    );

    await tx
      .insert(PostCategoryTable)
      .values(categoryIds.map(categoryId => ({ postId: newPost.id, categoryId })));

    return newPost;
  });
}
