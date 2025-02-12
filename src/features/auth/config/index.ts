import { AuthOptions } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db/drizzle';
import { accounts, authenticators, sessions, UserTable, verificationTokens } from '@/db/schema';
import { eq } from 'drizzle-orm';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db.$primary, {
    usersTable: UserTable,
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
        .from(UserTable)
        .where(eq(UserTable.email, session.user.email))
        .limit(1);

      session.user = selectedUser;
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
