import { BASE_URL } from '@/shared/config/api';
import { ApiResponse } from '@/shared/types/response';
import { PutBlobResult } from '@vercel/blob';

export async function uploadToStorage(file: File) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const extension = file.name.split('.').pop();
  const filename = `image_${timestamp}-${random}.${extension}`;

  const response = await fetch(`${BASE_URL}/api/post/image?filename=${filename}`, {
    method: 'POST',
    body: file,
  });
  const result = (await response.json()) as ApiResponse<PutBlobResult>;

  if (!response.ok || result.error) {
    throw new Error(result.error || 'Failed to upload image');
  }

  return { url: result.data!.url, filename };
}
