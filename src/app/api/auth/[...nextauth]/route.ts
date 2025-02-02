import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db/drizzle';
import { accounts, authenticators, sessions, users, verificationTokens } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db.$primary, {
    usersTable: users,
    accountsTable: accounts,
    authenticatorsTable: authenticators,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    async session({ session }) {
      if (!session.user.email) return session;

      const [selectedUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, session.user.email))
        .limit(1);

      session.user = selectedUser;
      return session;
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/login',
  },
};

// NextAuth 핸들러 설정
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
