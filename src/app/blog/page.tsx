import {getAllPosts} from "@/lib/posts";
import RegPostList from "@/app/blog/components/RegPostList";
import CategoryRadioList from "@/app/blog/components/CategoryRadioList";


export default function BlogPage() {
    const allPosts = getAllPosts();
    return (
        <div className='flex flex-col justify-center'>
            {/*<PopularPostList posts={dummyPosts}/>*/}
            <CategoryRadioList />
            <RegPostList posts={allPosts}/>
        </div>
    );
}
