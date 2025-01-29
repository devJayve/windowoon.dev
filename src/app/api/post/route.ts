import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { desc, eq } from 'drizzle-orm';
import { category, post, postCategories } from '@/db/schema';

export async function GET() {
  try {
    const posts = await db.select().from(post).orderBy(desc(post.createdAt));
    // 성공 응답 반환
    return NextResponse.json({
      posts,
      success: true,
    });
  } catch (error) {
    console.error('Failed to fetch posts:', error);

    // 에러 응답 반환
    return NextResponse.json(
      {
        posts: [],
        success: false,
        error: 'Failed to fetch posts',
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, content, slug, categories } = await request.json();

    const newPost = await db.transaction(async tx => {
      const [newPost] = await db
        .insert(post)
        .values({ title, description, content, slug, categories })
        .returning();

      const categoryIds = await Promise.all(
        categories.map(async (categoryName: string) => {
          const [existingCategory] = await tx
            .select()
            .from(category)
            .where(eq(category.name, categoryName));

          if (existingCategory) {
            return existingCategory.id;
          }

          const [newCategory] = await tx
            .insert(category)
            .values({ name: categoryName })
            .returning();

          return newCategory.id;
        }),
      );

      await tx
        .insert(postCategories)
        .values(categoryIds.map(categoryId => ({ postId: newPost.id, categoryId })));

      return newPost;
    });

    return NextResponse.json(
      {
        data: newPost,
        success: true,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: `Failed to create post: ${error}` });
  }
}
