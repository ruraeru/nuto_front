import Calendar from "@/components/Calendar";
import Image from "next/image";

export default function CalendarPage() {
    return (
        <div className="p-5 flex flex-col gap-8">
            <p className="font-bold text-4xl">
                <span className="text-5xl">이연우</span>님의 <span className="text-5xl">소비 패턴</span>
            </p>
            <div className="flex gap-4">
                <Calendar />
                <div className="bg-white w-[530px] border-2 border-[#C1E7F0] rounded-xl shadow-lg flex flex-col items-center justify-center">
                    <div className="relative w-[350px] h-[70px]">
                        <Image src="/speech_bubble.svg" alt="speech_bubble" width={350} height={70} />
                        <div className="absolute top-1/7 flex justify-center items-center w-full">
                            <p className="font-medium text-[20px] text-center">지난달 대비 소비가 줄었습니다.</p>
                        </div>
                    </div>

                    <div className="relative w-[350px] h-[70px]">
                        <Image src="/speech_bubble.svg" alt="speech_bubble" width={350} height={70} />
                        <div className="absolute top-1/7 flex justify-center items-center w-full">
                            <p className="font-medium text-[20px] text-center">7월달 중 4일 소비가 크다.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}