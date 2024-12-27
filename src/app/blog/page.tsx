import {getAllPosts, getPostData, getPostMetadata, RegPostListProps, RegPostProps} from "@/lib/posts";
import Header from "@/app/blog/components/Header";
import PopularPostList from "@/app/blog/components/PopularPostList";
import RegPostList from "@/app/blog/components/RegPostList";
import CategoryRadioList from "@/app/blog/CategoryRadioList";

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
    { category: 'React', title: 'JavaScript Tips and Tricks', imageUrl: '/images/test.png' },
    { category: 'React', title: 'JavaScript Tips and Tricks', imageUrl: '/images/test.png' },
    { category: 'React', title: 'JavaScript Tips and Tricks', imageUrl: '/images/test.png' },
    // 추가 포스트 데이터
];

const regPostList: RegPostProps[] =
    [
        {
            title: "Understanding TypeScript Basics",
            content: "This post covers the basics of TypeScript and how it can enhance your JavaScript code.",
            thumbnailUrl: "/images/cat.jpg",
            date: "2024-01-10",
            slug: '/test',
        },
        {
            title: "Getting Started with React",
            content: "An introductory guide to help you start building applications with React.",
            thumbnailUrl: "/images/cat.jpg",
            date: "2024-01-15",
            slug: '/test',
        },
        {
            title: "Building Responsive Layouts with CSS Grid",
            content: "Learn how to create responsive designs with CSS Grid in this tutorial.",
            thumbnailUrl: "/images/cat.jpg",
            date: "2024-01-20",
            slug: '/test',
        },
        {
            title: "Exploring Next.js Features",
            content: "A deep dive into some of the most powerful features offered by Next.js.",
            thumbnailUrl: "/images/cat.jpg",
            date: "2024-01-25",
            slug: '/test',
        },
        {
            title: "JavaScript ES6: New Features",
            content: "Explore the new features introduced in ES6 and how they simplify JavaScript programming.",
            thumbnailUrl: "/images/cat.jpg",
            date: "2024-02-01",
            slug: '/test',

        },
    ];


export default function BlogPage() {
    const posts = getAllPosts().map(post => {
        const postData = getPostData(post.slug);
        return getPostMetadata({
            slug: post.slug,
            frontMatter: postData.frontMatter
        });
    });

    return (
        <div className='flex flex-col justify-center'>
            <Header/>
            <PopularPostList posts={dummyPosts}/>
            <CategoryRadioList />
            <RegPostList posts={posts}/>
        </div>
    );
}
