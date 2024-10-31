import {getPostData} from "@/lib/posts";
import MdxContent from "@/components/MdxContent";
import {serialize} from "next-mdx-remote/serialize";

export default async function BlogPostPage({ params } : {slug: string}) {
    const {content, frontMatter} = getPostData(params.slug);
    const mdxSrc = await serialize(content);

    return (
        <div>
            <MdxContent source={mdxSrc} />
        </div>
    );
}