import { CategoryResponse } from '@/features/write/types';

export const fetchCategories = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/category`);

  const categoryResponse: CategoryResponse = await response.json();

  return categoryResponse.data.categories;
};
