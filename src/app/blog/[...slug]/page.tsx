import { serialize } from 'next-mdx-remote/serialize';

import PostTitle from '@/app/blog/[...slug]/components/PostTitle';
import MdxContent from '@/components/mdx/MdxContent';
import { getPost } from '@/lib/posts';

export default async function BlogPostPage({ params }: { params: { slug: string[] } }) {
  const [category, postSlug] = params.slug;
  const { content, frontMatter } = getPost(category, postSlug);
  const mdxSrc = await serialize(content);

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <PostTitle frontMatter={frontMatter} />
        <MdxContent source={mdxSrc} />
      </div>
    </article>
  );
}
