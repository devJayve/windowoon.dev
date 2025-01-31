import { Session } from 'next-auth';

export function checkIsAdmin(session: Session | null) {
  return session?.user?.role === 'admin';
}
