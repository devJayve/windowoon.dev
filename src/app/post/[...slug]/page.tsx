import MdxContent from '@/components/mdx/MdxContent';
import CommentList from '@/app/post/[...slug]/components/CommentList';
import { getPost } from '@/lib/posts';
import PostTitle from '@/app/post/[...slug]/components/PostTitle';

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const [category, postSlug] = params.slug;
  const { content, frontMatter } = getPost(category, postSlug);

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <PostTitle frontMatter={frontMatter} />
        <MdxContent source={content} />
        <CommentList />
      </div>
    </article>
  );
}
