'use client'

import {PopularPostProps} from "@/lib/posts";
import Image from "next/image";
import {useState} from "react";

export default function PopularPost({category, title, imageUrl} : PopularPostProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (<div className="w-40 h-40 rounded-lg overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800 flex-shrink-0
                            bg-gradient-radial from-purple-200 to-purple-50 relative"
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
    >{
        !isHovered ? (
            <div>
            <div>{category}</div>
            <div>{title}</div>
    <Image
        src={imageUrl}
        alt={title}
        width={80}
        height={80}
        className="filter invert absolute bottom-5 right-5"
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
                    className="filter invert opacity-50 absolute bottom-5 right-5"
                />
 </div>)}</div>);
}