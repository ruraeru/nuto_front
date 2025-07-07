"use client"

import Link from "next/link";
import Card from "@/components/dashboard/Card";
import DoughnutChart from "@/components/Chart/DoughnutChart";
import LineChart from "@/components/Chart/LineChart";
import { getCards, ICardInfo } from "@/lib/card";
import { useQuery } from "@tanstack/react-query";
import PieChart from "@/components/Chart/PieChart";
import { getConsumeMonth, getIncomeMonth } from "@/api/dashboard";
import LoadingSpinner from "@/components/Chart/LoadingSpinner";
import React from "react";
import ExpenseCompareCard from "@/components/dashboard/ExpenseCompareCard";

export default function Page() {
    const { data, isLoading } = useQuery<ICardInfo[]>({
        queryKey: ['cards'],
        queryFn: async () => (await getCards()).data
    });
    const { data: consumeMonth } = useQuery({
        queryKey: ['consume-month'],
        queryFn: getConsumeMonth
    });
    const { data: incomeMonth } = useQuery({
        queryKey: ['income-month'],
        queryFn: getIncomeMonth
    });
    return (
        <div className="flex flex-col gap-12">
            <div className="flex justify-center gap-6">
                <div className="flex flex-col w-[730px] gap-4">
                    <div className="flex justify-between items-end">
                        <p className="font-semibold text-2xl">My Cards</p>
                        <Link href="/dashboard/cards">모두 보기</Link>
                    </div>

                    {isLoading ? (
                        <LoadingSpinner text="카드 데이터 불러오는 중" />
                    ) : (
                        data && (
                            <div className="flex gap-6">
                                <Card gradientColors={["#FFC21F", "#F68701"]}
                                    cardInfo={{
                                        usageAmount: data[0].totalAmount,
                                        cardName: data[0].cardType,
                                        cardNumber: data[0].cardNumber,
                                        cardExpirationPeriod: data[0].expiryDate,
                                        cardBrand: "MATER",
                                    }} />

                                <Card gradientColors={["#C1E7F0", "#7CBBDE"]}
                                    cardInfo={{
                                        usageAmount: data[1].totalAmount,
                                        cardName: data[1].cardType,
                                        cardNumber: data[1].cardNumber,
                                        cardExpirationPeriod: data[1].expiryDate,
                                        cardBrand: "VISA",
                                    }} />
                            </div>
                        )
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="font-semibold text-2xl">올해 내 소비는?</p>
                    </div>
                    <div className="border-2 border-[#C1E7F0] shadow-xl rounded-2xl place-items-center w-[270px] h-[235px]">
                        <PieChart />
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-4">
                <div className="flex flex-col justify-between gap-4">
                    <div className="w-[730px] h-[460px]">
                        <div className="flex justify-between w-full">
                            <p className="font-semibold text-2xl">소비 그래프</p>
                            <Link href="/dashboard/cards/graph">모두 보기</Link>
                        </div>
                        <div className="h-[460px] w-full p-5 border-2 border-[#C1E7F0] rounded-xl">
                            <LineChart />
                        </div>
                    </div>
                    <div className="w-[730px]">
                        <div className="flex justify-between w-full">
                            <p className="font-semibold text-2xl">한달 소비 내역</p>
                            <Link href="/dashboard/spendingHistory">모두 보기</Link>
                        </div>
                        <div className="h-[463px] border-2 border-[#C1E7F0] rounded-2xl shadow-2xl p-3">
                            <table className="w-full">
                                <caption className="text-left p-5 text-black font-semibold text-2xl border-b-2 border-[#C1E7F0]">2025.04 소비 내역</caption>
                                <thead className="border-b-2 border-[#C1E7F0]">
                                    <tr className="*:p-3">
                                        <th>이름</th>
                                        <th>금액</th>
                                        <th>카드</th>
                                        <th>날짜</th>
                                        <th>카테고리</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center font-medium *:border-b-1 *:border-[#C1E7F0] *:last:border-none ">
                                    <tr className="*:px-5 *:py-7">
                                        <td>
                                            버거킹
                                        </td>
                                        <td>10,000</td>
                                        <td>신한은행</td>
                                        <td>25.04.11</td>
                                        <td>식비</td>
                                    </tr>
                                    <tr className="*:px-5 *:py-7">
                                        <td>
                                            버거킹
                                        </td>
                                        <td>10,000</td>
                                        <td>신한은행</td>
                                        <td>25.04.11</td>
                                        <td>식비</td>
                                    </tr>
                                    <tr className="*:px-5 *:py-7">
                                        <td>
                                            버거킹
                                        </td>
                                        <td>10,000</td>
                                        <td>신한은행</td>
                                        <td>25.04.11</td>
                                        <td>식비</td>
                                    </tr>
                                    <tr className="*:px-5 *:py-7">
                                        <td>
                                            버거킹
                                        </td>
                                        <td>10,000</td>
                                        <td>신한은행</td>
                                        <td>25.04.11</td>
                                        <td>식비</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <div className="flex flex-col justify-center gap-4">
                        <ExpenseCompareCard expense={consumeMonth} text="이번달 내 지출은?" />
                        <ExpenseCompareCard expense={incomeMonth} text="이번달 내 수익은?" />
                    </div>
                    <div>
                        <div>
                            <div className="mb-4">
                                <p className="font-semibold text-2xl">카테고리별 소비</p>
                            </div>
                            <div className="border-2 border-[#C1E7F0] rounded-2xl w-[270px] h-[383px] p-5 shadow-xl">
                                <DoughnutChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}