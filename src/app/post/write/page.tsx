import { getCategories } from '@/features/write/lib/getCategories';
import WriteForm from '@/features/write/components/WriteForm';

export default async function WritePage() {
  const categories = await getCategories();

  return <WriteForm categories={categories} />;
}
