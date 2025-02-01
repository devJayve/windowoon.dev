import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Session } from 'next-auth';

const ADMIN_PATHS = ['/post/write'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const ip = request.ip ?? request.headers.get('X-Forwarded-For');
  if (ip) response.headers.set('X-next-ip', ip);

  const isAdminPath = ADMIN_PATHS.some(path => request.nextUrl.pathname.startsWith(path));

  if (isAdminPath) {
    try {
      const sessionCookie = request.cookies.get('next-auth.session-token')?.value;

      const response = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
        headers: {
          Cookie: `next-auth.session-token=${sessionCookie}`,
        },
      });

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
