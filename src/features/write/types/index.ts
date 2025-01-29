import { CategoryTable } from '@/db/schema';

export type Category = typeof CategoryTable.$inferSelect;

export interface WriteFormState {
  title: string;
  slug: string;
  description: string;
  categories: string[];
  content?: string;
}
