import {getAllPosts} from "@/lib/posts";
import PostBoxes from "@/components/PostBoxes";
import Header from "@/app/blog/components/Header";
import PopularPostList from "@/app/blog/components/PopularPostList";

export const generateStaticParams = () => {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug
    }));
}

const dummyPosts = [
    { category: 'React', title: 'Introduction to React', imageUrl: '/images/test.png' },
    { category: 'React', title: 'Getting Started with Next.js', imageUrl: '/images/test.png' },
    { category: 'React', title: 'JavaScript Tips and Tricks', imageUrl: '/images/test.png' },
    // 추가 포스트 데이터
];

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <>
            <Header/>
            <PopularPostList  posts={dummyPosts}/>
            <PostBoxes  slugs={posts}/>
        </>
    );
}