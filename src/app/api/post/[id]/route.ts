import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { post } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // ID로 빠른 조회
    const [findingPost] = await db
      .select()
      .from(post)
      .where(eq(post.id, parseInt(params.id)))
      .execute();

    if (!findingPost) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: findingPost,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: `Failed to fetch post: ${error}`,
    });
  }
}
