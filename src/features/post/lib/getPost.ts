import { Post } from '@/features/post/types';
import { ApiResponse } from '@/shared/types/response';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPost(id: number): Promise<Post> {
  const response = await fetch(`${BASE_URL}/api/post/${id}`);
  const result = (await response.json()) as ApiResponse<Post>;

  if (!response.ok || result.error) {
    throw new Error(result.error || `Failed to fetch post ${id}`);
  }

  return result.data!;
}
