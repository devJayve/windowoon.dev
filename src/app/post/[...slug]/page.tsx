import MdxContent from '@/shared/components/mdx/MdxContent';
import CommentList from '@/features/post/components/CommentList';
import PostTitle from '@/features/post/components/PostTitle';
import { getPost } from '@/features/post/lib';

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const [postId] = params.slug;

  const post = await getPost(parseInt(postId));

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <PostTitle title={post.title} />
        <MdxContent source={post.content} />
        <CommentList />
      </div>
    </article>
  );
}
