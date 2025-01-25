import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { PostModel, PostResponse } from '@/features/post/types';

//TODO::zod 안정성 보완
export async function GET(): Promise<NextResponse<PostResponse>> {
  try {
    const sql = neon(process.env.DATABASE_URL!);

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
