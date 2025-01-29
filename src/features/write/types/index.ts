import { CategoryTable } from '@/db/schema';
import { CreatePostRequest } from '@/features/post/types';

export type Category = typeof CategoryTable.$inferSelect;

export type WriteFormState = CreatePostRequest;
