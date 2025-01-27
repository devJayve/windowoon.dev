import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { PostModel, PostResponse } from '@/features/post/types';
import { ApiResponse } from '@/shared/types/response';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(): Promise<NextResponse<PostResponse>> {
  try {
    const posts: Partial<PostModel>[] = await sql`
      SELECT 
        id, 
        title, 
        description, 
        slug, 
        views, 
        created_at, 
        updated_at
      FROM posts 
      ORDER BY created_at DESC
    `;

    // 성공 응답 반환
    return NextResponse.json(
      {
        posts,
        success: true,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
        },
      },
    );
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

export async function POST(request: Request): Promise<NextResponse<ApiResponse<PostModel>>> {
  try {
    const { title, description, content, slug, categories } = await request.json();

    // Post 생성
    const [postResult] = await sql`
    INSERT INTO posts (id, title, description, content, slug, categories)
    VALUES (gen_random_uuid(), ${title}, ${description}, ${content}, ${slug}, ${categories}) 
    RETURNING id`;

    // 각 카테고리 처리
    for (const categoryName of categories) {
      // 기존 카테고리 조회
      const [existingCategory] = await sql`
        SELECT id FROM categories WHERE name = ${categoryName}
      `;

      const categoryId =
        existingCategory?.id ||
        // 새 카테고리 생성
        (
          await sql`
          INSERT INTO categories (id, name)
          VALUES (gen_random_uuid(), ${categoryName}) RETURNING id`
        )[0].id;

      // post_categories 연결
      await sql`
        INSERT INTO post_categories (post_id, category_id)
        VALUES (${postResult.id}, ${categoryId})
      `;
    }

    const newPost: PostModel = await sql`
      SELECT id, title, description, slug, categories, created_at
      FROM posts WHERE id = ${postResult.id}
    `;

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
