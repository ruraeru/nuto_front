"use client"

import LineChart from "@/components/Chart/LineChart";

export default function CardsGraph() {
    return (
        <div>
            <div className="flex flex-col gap-4 mb-4">
                <h1 className="text-5xl font-bold">카드 총액</h1>
                <p className="text-lg/tight font-semibold">
                    매일매일 얼마나 소비했는지 궁금하셨나요? 한 달 동안의 소비 변화를 직관적으로 확인할 수 있습니다. <br />
                    가장 많이 소비한 날과 가장 적게 소비한 날을 바로 파악할 수 있습니다.
                </p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="w-[1006px] h-[460px] p-5 border-2 border-[#C1E7F0] rounded-lg">
                    <LineChart />
                </div>
                <div className="*:border-1 *:px-3 *:py-1 *:rounded-lg flex gap-4">
                    <select>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                    </select>
                    <select>
                        <option>3월</option>
                        <option>4월</option>
                        <option>5월</option>
                        <option>6월</option>
                        <option>7월</option>
                    </select>
                </div>
            </div>
        </div>
    )
}