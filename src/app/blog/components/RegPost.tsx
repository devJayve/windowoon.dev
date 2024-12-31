import Link from "next/link";
import {RegPostProps} from "@/types/post";
import {getImagePath} from "@/lib/posts";


export default function RegPost({frontMatter, category, slug}: RegPostProps) {
    const formattedDate = frontMatter.date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
        <Link href={`/blog/${category}/${slug}`}>
            <div className="flex p-4">
                <div className='basis-3/4 flex-grow'>
                    <p className='font-light text-sm mt-3'>{formattedDate}</p>
                    <div className='font-semibold'>{frontMatter.title}</div>
                </div>
                <div className='basis-1/4 flex-grow'>
                </div>
            </div>
        </Link>
    );
}
