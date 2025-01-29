import { Category } from '@/features/write/types';
import { ApiResponse } from '@/shared/types/response';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/api/categories`);
  const result = (await response.json()) as ApiResponse<Category[]>;

  if (!response.ok || result.error) {
    throw new Error(result.error || 'Failed to fetch categories');
  }

  return result.data!;
}
