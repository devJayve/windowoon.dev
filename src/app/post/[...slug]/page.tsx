import MdxContent from '@/shared/components/mdx/MdxContent';
import CommentList from '@/app/post/[...slug]/components/CommentList';
import PostTitle from '@/app/post/[...slug]/components/PostTitle';

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const [postId] = params.slug;
  const getPost = async () => {
    const response = await fetch(`http://localhost:3000/api/post/${postId}`);
    const result = await response.json();
    return result.data;
  };

  const post = await getPost();
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
