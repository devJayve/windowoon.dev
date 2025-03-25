'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';

export async function getSession() {
  return await getServerSession(authOptions);
}
