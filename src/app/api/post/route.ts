import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { desc, eq } from 'drizzle-orm';
import { CategoryTable, PostTable, PostCategoryTable } from '@/db/schema';
import { ApiResponse } from '@/shared/types/response';
import { CreatePostRequest, Post, PostMeta } from '@/features/post/types';
import { createErrorResponse, createSuccessResponse } from '@/shared/lib/api';

export async function GET(): Promise<NextResponse<ApiResponse<PostMeta[]>>> {
  try {
    const posts: PostMeta[] = await db
      .select({
        id: PostTable.id,
        title: PostTable.title,
        description: PostTable.description,
        slug: PostTable.slug,
        views: PostTable.views,
        createdAt: PostTable.createdAt,
        updatedAt: PostTable.updatedAt,
        categories: PostTable.categories,
      })
      .from(PostTable)
      .orderBy(desc(PostTable.createdAt));

    return createSuccessResponse(posts);
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function POST(request: Request): Promise<NextResponse<ApiResponse<Post>>> {
  try {
    const { title, description, content, slug, categories } =
      (await request.json()) as CreatePostRequest;

    const newPost = await db.transaction(async tx => {
      const [newPost] = await db
        .insert(PostTable)
        .values({ title, description, content, slug, categories })
        .returning();

      const categoryIds = await Promise.all(
        categories.map(async (categoryName: string) => {
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

    return createSuccessResponse(newPost, 201);
  } catch (error) {
    return createErrorResponse(error);
  }
}
