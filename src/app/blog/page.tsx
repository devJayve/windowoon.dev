import {getAllPosts} from "@/lib/posts";
import PostBoxes from "@/components/PostBoxes";

export const generateStaticParams = () => {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug
    }));
}

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <>
            <h1>blog main</h1>
            <PostBoxes  slugs={posts}/>
        </>
    );
}