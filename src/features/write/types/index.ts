import { CategoryTable } from '@/db/schema/post';
import { CreatePostRequest } from '@/features/post/types';

export type Category = typeof CategoryTable.$inferSelect;

export type WriteFormState = CreatePostRequest;
