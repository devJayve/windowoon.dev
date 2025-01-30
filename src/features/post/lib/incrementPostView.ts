'use server';
import { BASE_URL } from '@/shared/config/api';
import { cookies } from 'next/headers';
import { getViewCookieKey } from '@/middleware';

export async function incrementPostView(postId: number): Promise<void> {
  try {
    const cookieStore = cookies();
    const viewCookieKey = getViewCookieKey(String(postId));
    if (cookieStore.has(viewCookieKey)) {
      return;
    }

    const response = await fetch(`${BASE_URL}/api/post/${postId}/view`, {
      method: 'POST',
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    console.error(error);
  }
}
