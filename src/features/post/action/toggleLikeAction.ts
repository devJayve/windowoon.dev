'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';
import { cookies } from 'next/headers';
import { toggleAnonymousLike } from '@/features/post/lib/toggleAnonymousLike';
import { toggleUserLike } from '@/features/post/lib/toggleUserLike';

export async function toggleLikeAction(postId: number) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    const cookieStore = cookies();
    let anonymousId = cookieStore.get('anonymous_id')?.value;

    if (!anonymousId) {
      anonymousId = `anon_${crypto.randomUUID()}`;
      cookieStore.set('anonymous_id', anonymousId, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
      });
    }
    await toggleAnonymousLike(postId, anonymousId);
  } else {
    await toggleUserLike(postId, userId);
  }
}
