import RegPost from "@/app/blog/components/RegPost";
import {RegPostListProps} from "@/types/post";

export default function RegPostList({posts}: RegPostListProps) {
    return (<div>
        {posts.map((post, index) => <RegPost
            key={index}
            category={post.category}
            slug={post.slug}
            frontMatter={post.frontMatter}
        />)}
    </div>);
}
