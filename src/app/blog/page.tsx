import {getAllPosts} from "@/lib/posts";
import RegPostList from "@/app/blog/components/RegPostList";
import DynamicBackground from "@/app/blog/components/DynamicBackground";


export default function BlogPage() {
    const allPosts = getAllPosts();
    return (
        <>
            <DynamicBackground/>
            <div className='flex flex-col justify-center'>
                <RegPostList posts={allPosts}/>
            </div>
        </>
    );
}
