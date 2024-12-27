import Link from "next/link";
import {RegPostProps} from "@/types/post";
import {getImagePath} from "@/lib/posts";


export default function RegPost({frontMatter, category, slug}: RegPostProps) {
    return (
        <Link href={`/blog/${category}/${slug}`}>
            <div className="flex p-4">
                <div className='basis-3/4 flex-grow'>
                    <div className='font-semibold'>{frontMatter.title}</div>
                    <div className='font-light'>{frontMatter.summary}</div>
                    <p className='font-light text-sm mt-3'>{frontMatter.date}</p>
                </div>
                <div className='basis-1/4 flex-grow'>
                    <img className='rounded-xl' src={getImagePath(category, slug, frontMatter.thumbnailURL)}/>
                </div>
            </div>
        </Link>
    );
}
