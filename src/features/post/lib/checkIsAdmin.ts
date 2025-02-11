import { Session } from 'next-auth';

// export function checkIsAdmin(session: Session | null) {
//   return session?.user?.role === 'admin';
// }

export function checkIsAdmin(session: Session | null) {
  return session?.user?.email === 'admin@gmail.com';
}
