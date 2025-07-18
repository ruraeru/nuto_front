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
import ExpenseCompareCard from "@/components/dashboard/ConsumptionCompareCard";
import SpendingHistoryTable from "@/components/SpendingHistoryTable";

export default function Page() {
    const { data: cardInfo } = useQuery<ICardInfo[]>({
        queryKey: ['cards'],
        queryFn: getCards
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
                    {cardInfo ? (
                        <div className="flex gap-6">
                            <Card gradientColors={["#FFC21F", "#F68701"]}
                                cardInfo={{
                                    usageAmount: cardInfo[0]?.totalAmount,
                                    cardName: cardInfo[0]?.cardType,
                                    cardNumber: cardInfo[0]?.cardNumber,
                                    cardExpirationPeriod: cardInfo[0]?.expiryDate,
                                    cardBrand: "MATER",
                                }} />

                            <Card gradientColors={["#C1E7F0", "#7CBBDE"]}
                                cardInfo={{
                                    usageAmount: cardInfo[1]?.totalAmount,
                                    cardName: cardInfo[1]?.cardType,
                                    cardNumber: cardInfo[1]?.cardNumber,
                                    cardExpirationPeriod: cardInfo[1]?.expiryDate,
                                    cardBrand: "VISA",
                                }} />
                        </div>
                    ) : <LoadingSpinner text="카드 데이터 불러오는 중" />}
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
                        <div className="flex items-center py-3 justify-between w-full">
                            <p className="font-semibold text-2xl p-3">소비 그래프</p>
                            <Link href="/dashboard/cards/graph">모두 보기</Link>
                        </div>
                        <div className="h-[460px] w-full p-5 border-2 border-[#C1E7F0] rounded-xl">
                            <LineChart />
                        </div>
                    </div>
                    <div className="w-[730px]">
                        <div className="flex items-center py-3 justify-between w-full">
                            <p className="font-semibold text-2xl">한달 소비 내역</p>
                            <Link href="/dashboard/spendingHistory">모두 보기</Link>
                        </div>
                        <div className="min-h-[463px] border-2 border-[#C1E7F0] rounded-2xl shadow-2xl">
                            <SpendingHistoryTable />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <div className="flex flex-col justify-center gap-4">
                        <ExpenseCompareCard expense={consumeMonth} text="이번달 내 지출은?" />
                        <ExpenseCompareCard expense={incomeMonth} text="이번달 내 수익은?" isIncome />
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