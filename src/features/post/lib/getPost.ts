import { Post } from '@/features/post/types';
import { ApiResponse } from '@/shared/types/response';
import { BASE_URL } from '@/shared/config/api';

export async function getPost(id: number): Promise<Post> {
  console.log('id', id);
  const response = await fetch(`${BASE_URL}/api/post/${id}`, {
    next: { revalidate: 0 },
  });
  const result = (await response.json()) as ApiResponse<Post>;

  if (!response.ok || result.error) {
    throw new Error(result.error || `Failed to fetch post ${id}`);
  }

  return result.data!;
}
