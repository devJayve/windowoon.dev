import { put } from '@vercel/blob';
import { createErrorResponse, createSuccessResponse } from '@/shared/lib/api';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    const blob = await put(filename!, request.body!, {
      access: 'public',
    });

    return createSuccessResponse(blob);
  } catch (error) {
    return createErrorResponse(error);
  }
}
