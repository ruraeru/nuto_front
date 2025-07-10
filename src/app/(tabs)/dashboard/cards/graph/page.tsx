"use client"

import LineChart from "@/components/Chart/LineChart";
import { useState } from "react";

export default function CardsGraph() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // 7 (getMonth()는 0부터 시작하므로 +1)

    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(event.target.value));
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(Number(event.target.value));
    };

    const years = [2022, 2023, 2024, 2025, 2026];
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
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
                    <LineChart year={selectedYear} month={selectedMonth} />
                </div>
                <div className="flex gap-4 p-4">
                    <select
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="p-2 border rounded-md"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="p-2 border rounded-md"
                    >
                        {months.map(month => (
                            <option key={month} value={month}>
                                {month}월
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}