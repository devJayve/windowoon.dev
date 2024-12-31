import MdxContent from "@/components/mdx/MdxContent";
import {serialize} from "next-mdx-remote/serialize";
import PostTitle from "@/app/blog/[...slug]/PostTitle";
import {getPost} from "@/lib/posts";

export default async function BlogPostPage({params}: {
    params: { slug: string[] }
}) {
    const [category, postSlug] = params.slug;
    const {content, frontMatter} = getPost(category, postSlug);
    const mdxSrc = await serialize(content);

    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <PostTitle frontMatter={frontMatter}/>
                <MdxContent source={mdxSrc}/>
            </div>
        </article>
    );
}
