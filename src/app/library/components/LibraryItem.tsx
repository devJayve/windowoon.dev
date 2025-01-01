'use client'
import Image from "next/image";
import {useState} from "react";
import book from "../../../../public/images/book_test.png";
import BookReviewModal from "@/app/library/components/BookReviewModal";

export default function LibraryItem() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='flex flex-col aspect-[4/5] bg-indigo-300 rounded-lg overflow-hidden cursor-pointer'
                 onClick={() => setIsOpen(true)}>
                <div className='flex-[3]'>
                    <BookImage/>
                </div>
                <div className='flex-1'>
                    <BookDescription/>
                </div>
            </div>
            {
                isOpen && <BookReviewModal onClose={() => setIsOpen(false)}/>
            }
        </>
    );
}

function BookImage() {
    return (<div className='relative flex items-center justify-center h-full'>
        <div className='absolute z-10'>
            <Image src={book} alt='book1'
                   width={120}
                   height={0}
                   className='shadow-lg'/>
        </div>
        <div className='relative w-full h-full'>
            <Image
                src={book}
                alt='book1'
                fill
                objectFit='cover'
            />
            <div className='absolute inset-0 backdrop-blur bg-white/20 dark:bg-black/20'></div>
        </div>
    </div>);
}

function BookDescription() {
    return (<div className='bg-white h-full dark:bg-neutral-800 justify-center flex items-center'>북 설명</div>);
}
