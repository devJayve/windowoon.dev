import {getPostData} from "@/lib/posts";
import MdxContent from "@/components/mdx/MdxContent";
import {serialize} from "next-mdx-remote/serialize";
import PostTitle from "@/app/blog/[slug]/PostTitle";

export default async function BlogPostPage({ params } : {slug: string}) {
    const {content, frontMatter} = getPostData(params.slug);
    const mdxSrc = await serialize(content);

    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <PostTitle frontMatter={frontMatter}/>
                <MdxContent frontMatter={frontMatter} source={mdxSrc} />
            </div>
        </article>
    );
}
