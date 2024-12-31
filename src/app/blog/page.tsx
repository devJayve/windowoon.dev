import {getAllPosts} from "@/lib/posts";
import RegPostList from "@/app/blog/components/RegPostList";


export default function BlogPage() {
    const allPosts = getAllPosts();
    return (
        <div className='flex flex-col justify-center'>
            <RegPostList posts={allPosts}/>
        </div>
    );
}
