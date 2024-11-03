import {RegPostProps} from "@/lib/posts";
import Link from "next/link";

export default function RegPost({title, thumbnailUrl, content, date, slug}: RegPostProps) {
    return (
        <Link href={`/blog/${slug}`}>
            <div className="flex p-4">
                <div className='basis-3/4 flex-grow'>
                    <div className='font-semibold'>{title}</div>
                    <div className='font-light'>{content}</div>
                    <p className='font-light text-sm mt-3'>{date}</p>
                </div>
                <div className='basis-1/4 flex-grow'>
                    <img className='rounded-xl' src={thumbnailUrl}/>
                </div>
            </div>
        </Link>
    );
}