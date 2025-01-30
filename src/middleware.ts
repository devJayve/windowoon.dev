import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const VIEW_COOKIE_PREFIX = 'post_view_';
const COOKIE_EXPIRY_DAYS = 1;

export const config = {
  matcher: '/post/:path*',
};

export const getViewCookieKey = (postId: string) => `${VIEW_COOKIE_PREFIX}${postId}`;

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const pathname = request.nextUrl.pathname;
  const postId = pathname.split('/')[2];
  const viewCookieKey = getViewCookieKey(postId);

  // // 이미 조회한 경우
  if (request.cookies.has(viewCookieKey)) {
    return response;
  }

  // 쿠키 설정
  response.cookies.set(viewCookieKey, '1', {
    expires: new Date(Date.now() + COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
