"use client"

import Calendar, { EventInfo, Events } from "@/components/Calendar";

export default function Page() {
    const eventsData: Events = {
        '2025-05-02': { description: ['교통비', '식비 지출'], amount: 90000 },
        '2025-05-10': { description: ['월세 자동이체'], amount: 500000 },
        '2025-05-31': { description: ['월세 자동이체'], amount: 500000 },
    };
    const handleDateClick = (date: Date, event?: EventInfo) => {
        console.log("Clicked Date:", date.toLocaleDateString());
        if (event) {
            console.log("Event:", event);
        }
    };
    return (
        <div className="h-screen flex justify-center">
            <div className="m-5 flex flex-col gap-5">
                <div>
                    <h1 className="font-extrabold text-4xl">이연우님의 소비 패턴</h1>
                </div>
                <div className="flex items-end gap-5">
                    <div className="flex flex-col gap-5">
                        <div>
                            <div className="flex justify-between">
                                <h3>카테고리별 소비 내역</h3>
                                <p>모두보기</p>
                            </div>
                            <div className="flex gap-5 bg-gray-500 p-5 rounded-2xl justify-around items-center h-[160px]">
                                {[1, 2, 3].map((item, index) => (
                                    <div key={index} className="flex flex-col items-center gap-3">
                                        <div className="bg-gray-200 size-16 rounded-2xl flex items-center justify-center">
                                            <p>{item}</p>
                                        </div>
                                        <div>
                                            <p>식비</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <h3>금융 상품 추천</h3>
                                <p>금융 상품 추천 받기</p>
                            </div>
                            <div className="flex gap-5 bg-gray-500 p-5 rounded-2xl w-[416px] h-[278px] items-center justify-center">
                                <h1>금융 상품 추천</h1>
                            </div>
                        </div>
                    </div>
                    <Calendar
                        events={eventsData}
                        onDateClick={handleDateClick}
                        initialDate={new Date(2025, 4, 1)}
                    />
                </div>
            </div>
        </div>
    )
}