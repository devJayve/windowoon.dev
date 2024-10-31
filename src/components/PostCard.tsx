'use client'
import Link from "next/link";

export default function PostCard({slug} : {slug : string}) {
    return (
        <div>
            <Link href={`/blog/${slug}`}>{slug}</Link>
        </div>
    );
}