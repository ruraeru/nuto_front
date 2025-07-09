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
                        <Link href="/consumption/receiptUpload">
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
                    <div className="flex flex-wrap gap-2 w-[716px]">
                        {[1, 2, 3, 4].map((_, index) => (
                            <div key={index} style={{
                                background: "center / contain no-repeat url(/orangeBG.svg)"
                            }} className="w-[350px] h-[275px] bg-none rounded-4xl relative">
                                <div className="w-[350px] h-[120px] bg-[#F68701] rounded-b-4xl absolute bottom-5 shadow-xl z-10" />

                                <div className="bg-white w-[100px] h-[75px] rounded-t-2xl absolute top-23 left-15 -rotate-12 shadow-2xl" />

                                <div className="bg-white w-[100px] h-[75px] rounded-t-2xl absolute top-25 left-35 shadow-2xl" />

                                <div className="bg-white w-[100px] h-[75px] rounded-t-2xl absolute top-20 left-53 shadow-2xl" />

                                <div className="absolute left-5 top-38 text-white z-10">
                                    <p className="font-bold text-4xl">{index + 3}월</p>
                                    <p className="font-medium">24장</p>
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