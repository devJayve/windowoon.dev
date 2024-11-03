'use client';
import PopularPost from "@/app/blog/components/PopularPost";
import {PopularPostListProps} from "@/lib/posts";

export default function PopularPostList({ posts }: PopularPostListProps) {
    return (<div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
        {posts.map((post, index) => (
            <PopularPost
                key={index}
                category={post.category}
                title={post.title}
                imageUrl={post.imageUrl}
            />
        ))}
    </div>);
}