import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Session } from 'next-auth';

export const config = {
  // matcher: '/post/:path*',
};

const ADMIN_PATHS = ['/write'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const ip = request.ip ?? request.headers.get('X-Forwarded-For');
  if (ip) response.headers.set('X-next-ip', ip);

  const isAdminPath = ADMIN_PATHS.some(path => request.nextUrl.pathname.startsWith(path));

  if (isAdminPath) {
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/auth/session`);
      const session: Session = await response.json();

      if (!session || session.user?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}
