import { NextResponse } from 'next/server';
import { ApiResponse } from '@/shared/types/response';

export function createSuccessResponse<T>(
  data: T,
  statusCode: number = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      data,
      success: true,
    },
    { status: statusCode },
  );
}

export function createErrorResponse(
  error: unknown,
  statusCode: number = 500,
): NextResponse<ApiResponse<never>> {
  const message = error instanceof Error ? error.message : String(error);
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: statusCode },
  );
}
