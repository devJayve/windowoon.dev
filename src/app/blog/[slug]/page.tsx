// app/blog/[slug]/page.tsx
import {getAllPosts} from "@/lib/posts";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = params;

    return (
        <div>
            detail
        </div>
    );
}