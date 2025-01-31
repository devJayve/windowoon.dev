// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string | null;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      role: string | null;
    };
  }
}
