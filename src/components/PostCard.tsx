'use client'
import {usePathname, useRouter} from "next/navigation";

export default function PostCard({slug} : {slug : string}) {
    const router = useRouter();
    const pathname = usePathname()

    const handleClick = () => {


        const newPath = `${pathname}${slug}`;

        router.push(newPath);
    };

    return (
        <>
            <div onClick={handleClick}>{slug}</div>

        </>
    );
}