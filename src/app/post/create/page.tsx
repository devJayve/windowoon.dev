import { getCategories } from '@/features/category/lib/getCategories';
import PostForm from '@/features/post-form/components/PostForm';

export default async function CreatePostPage() {
  const categories = await getCategories();

  return <PostForm mode="create" categories={categories} />;
}
