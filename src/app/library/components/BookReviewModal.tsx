import {BookReviewModalProps} from "@/types/library";
import Image from "next/image";
import book from "../../../../public/images/book_test.png";

export default function BookReviewModal({onClose}: BookReviewModalProps) {
    return (<div className="fixed inset-0 z-50">
        <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
        />
        <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-4xl bg-white dark:bg-neutral-800 rounded-lg shadow-xl overflow-hidden">
            <div className="relative flex p-6">
                <div className="w-1/3 relative">
                    <div className="aspect-[3/4] relative">
                        <Image
                            src={book}
                            alt="book detail"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
                <div className="flex-1 ml-6">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">책 제목</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        책에 대한 자세한 설명이 들어갑니다.
                    </p>
                    <div className="space-y-2">
                        <p className="dark:text-gray-300"><span className="font-semibold">저자:</span> 작가 이름</p>
                        <p className="dark:text-gray-300"><span className="font-semibold">출판사:</span> 출판사 이름</p>
                        <p className="dark:text-gray-300"><span className="font-semibold">출판일:</span> 2024.01.01
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>);
}
