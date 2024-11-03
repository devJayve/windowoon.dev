'use client'

import {PopularPostProps} from "@/lib/posts";
import Image from "next/image";
import {useState} from "react";

export default function PopularPost({category, title, imageUrl} : PopularPostProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (<div className="w-40 h-40 rounded-xl overflow-hidden shadow-md bg-gray-100 dark:bg-neutral-800 dark:bg-opacity-50 flex-shrink-0 relative p-3"
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
    >{
        !isHovered ? (
            <div>
            <div className='text-xs font-semibold text-amber-400'>{category}</div>
            <div className='text-lg font-medium'>{title}</div>
    <Image
        src={imageUrl}
        alt={title}
        width={80}
        height={80}
        className="light:filter light:invert absolute bottom-5 right-5"
    />
            </div>
                )
 : (<div>
                <div>content</div>
                <Image
                    src={imageUrl}
                    alt={title}
                    width={80}
                    height={80}
                    className="light:filter light:invert opacity-50 absolute bottom-5 right-5"
                />
 </div>)}</div>);
}