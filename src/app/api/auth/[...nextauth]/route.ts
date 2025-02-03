import NextAuth from 'next-auth';
import { authOptions } from '@/features/auth/config';

// NextAuth 핸들러 설정
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
