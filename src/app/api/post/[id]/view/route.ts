import { NextRequest } from 'next/server';
import { db } from '@/db/drizzle';
import { PostTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { createErrorResponse, createSuccessResponse } from '@/shared/lib/api';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const postId = parseInt(params.id);

  try {
    const [views] = await db
      .update(PostTable)
      .set({
        views: sql`${PostTable.views} + 1`,
      })
      .where(eq(PostTable.id, postId))
      .returning({ views: PostTable.views });

    return createSuccessResponse(views);
  } catch (error) {
    console.error(error);
    return createErrorResponse(error);
  }
}
