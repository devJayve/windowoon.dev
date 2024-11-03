import {RegPostListProps} from "@/lib/posts";
import RegPost from "@/app/blog/components/RegPost";


export default function RegPostList({posts}: RegPostListProps) {
    return (<div>
        {posts.map((post, index) => <RegPost
            key={index}
            title={post.title}
            content={post.content}
            date={post.date}
            thumbnailUrl={post.thumbnailUrl}
        />)}
    </div>);
}