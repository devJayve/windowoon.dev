import Link from 'next/link';

import { RegPostProps } from '@/types/post';

export default function RegPost({ frontMatter, category, slug }: RegPostProps) {
  const formattedDate = frontMatter.date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <Link href={`/blog/${category}/${slug}`}>
      <div className="flex p-4">
        <div className="grow basis-3/4">
          <p className="mt-3 text-sm font-light">{formattedDate}</p>
          <div className="font-semibold">{frontMatter.title}</div>
        </div>
        <div className="grow basis-1/4"></div>
      </div>
    </Link>
  );
}
