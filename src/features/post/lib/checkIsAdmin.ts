import { Session } from 'next-auth';

export function checkIsAdmin(session: Session | null) {
  return session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
}
