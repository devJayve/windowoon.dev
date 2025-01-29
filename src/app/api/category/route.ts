import { db } from '@/db/drizzle';
import { CategoryTable } from '@/db/schema/post';
import { desc } from 'drizzle-orm';
import { createErrorResponse, createSuccessResponse } from '@/shared/lib/api';
import { NextResponse } from 'next/server';
import { ApiResponse } from '@/shared/types/response';
import { Category } from '@/features/write/types';

export async function GET(): Promise<NextResponse<ApiResponse<Category[]>>> {
  try {
    const categories = await db
      .select()
      .from(CategoryTable)
      .orderBy(desc(CategoryTable.createdAt))
      .execute();

    return createSuccessResponse(categories);
  } catch (error) {
    return createErrorResponse(error);
  }
}
