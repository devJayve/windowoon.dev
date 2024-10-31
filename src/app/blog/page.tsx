import {getAllPosts} from "@/lib/posts";
import PostBoxes from "@/components/PostBoxes";
import Header from "@/app/blog/components/Header";

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
            <Header/>
            <PostBoxes  slugs={posts}/>
        </>
    );
}