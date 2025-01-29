import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { PostTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createErrorResponse, createSuccessResponse } from '@/shared/lib/api';
import { ApiResponse } from '@/shared/types/response';
import { Post } from '@/features/post/types';

export async function GET({
  params,
}: {
  params: { id: string };
}): Promise<NextResponse<ApiResponse<Post>>> {
  try {
    const [post] = await db
      .select()
      .from(PostTable)
      .where(eq(PostTable.id, parseInt(params.id)))
      .execute();

    if (!post) {
      return createErrorResponse(Error(`${params.id}에 해당하는 게시물을 찾을 수 없습니다`), 404);
    }

    return createSuccessResponse(post);
  } catch (error) {
    return createErrorResponse(error);
  }
}
