import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SpendingHistory() {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <span>카드 추가하기</span>
            </div>
            <div className="flex gap-4">
                <div className="w-[204px] flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-4">
                        <Link href="/spendingHistory/recieptUpload">
                            <div className="size-[204px] bg-gray-400 rounded-4xl flex justify-center items-center">
                                <PlusIcon className="size-10" />
                            </div>
                        </Link>
                        <div className="w-full p-3 text-center bg-gray-400 rounded-4xl">
                            영수증 없이 기록하기
                        </div>
                        <div className="w-full p-3 text-center bg-gray-400 rounded-4xl">
                            수정하기
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-16">
                    <div className="flex flex-wrap gap-4 w-[716px]">
                        {[1, 2, 3, 4].map((_, index) => (
                            <div key={index} className="w-[350px] h-[275] bg-cyan-400 rounded-4xl relative">
                                <div className="w-[350px] h-[235px] bg-neutral-400 rounded-4xl absolute bottom-0" />
                                <div className="absolute bottom-4 right-4">
                                    <p>{index + 3}월</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        &larr; 1 &rarr;
                    </div>
                </div>
            </div>
        </div>
    )
}