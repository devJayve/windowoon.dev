import {RegPostProps} from "@/lib/posts";
import Link from "next/link";

export default function RegPost({title, thumbnailUrl, content, date}: RegPostProps) {
    return (
        <div className="p-4">
            <Link href={"/blog/test"}>
                <div>{title}</div>
                <div>{content}</div>
            </Link>
        </div>);
}