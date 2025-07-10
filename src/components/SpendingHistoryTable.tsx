"use client"

import { getConsumption } from "@/lib/receipts";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./Chart/LoadingSpinner";

export default function SpendingHistoryTable() {
    const { data: spendingHistoryData, isLoading } = useQuery({
        queryKey: ["spending"],
        queryFn: () => getConsumption(1)
    });

    if (isLoading) {
        return <LoadingSpinner text="소비 내역 불러오는 중" />
    }

    return (
        <table className="w-full max-h-[463px] overflow-hidden">
            <caption className="text-left p-5 text-black font-semibold text-2xl border-b-2 border-[#C1E7F0]">2025.04 소비 내역</caption>
            <thead className="border-b-2 border-[#C1E7F0]">
                <tr className="*:p-5">
                    <th>이름</th>
                    <th>금액</th>
                    <th>카드</th>
                    <th>날짜</th>
                    <th>카테고리</th>
                </tr>
            </thead>
            <tbody className="text-center font-medium *:border-b-1 *:border-[#C1E7F0] *:last:border-none">
                {spendingHistoryData?.content && spendingHistoryData.content.length > 0 ? (
                    spendingHistoryData.content.slice(1).map((info, idx) => (
                        <tr key={idx} className="*:px-5 *:py-7">
                            <td>{info.name}</td>
                            <td>{info.amount.toLocaleString("ko-KR")}원</td>
                            <td>{info.cardName}</td>
                            <td>{info.date}</td>
                            <td>{info.categoryName}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="py-20 text-lg text-gray-500">
                            소비 내역이 없습니다.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}