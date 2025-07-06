"use client"

import Card from "@/components/dashboard/Card";
import { getCards, ICardInfo } from "@/lib/card";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Page() {
    const { data, isLoading } = useQuery<ICardInfo[]>({
        queryKey: ['cards'],
        queryFn: async () => (await getCards()).data
    });
    return (
        <div>
            <div className="flex flex-col gap-4 mb-4">
                <h1 className="text-5xl font-bold">카드 총액</h1>
                <p className="text-lg/tight font-semibold">여러 개의 카드를 사용하는 경우, 어떤 카드에서 얼마를 썼는지 관리하기 어려웠던 적이 있지 않나요?<br />이곳에서는 사용자가 등록한 카드별로 총 사용 금액을 자동 집계하여 보여드립니다.<br />카드별 소비 패턴을 쉽게 파악하고, 보다 체계적인 지출 관리를 시작해보세요.</p>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <p className="font-semibold text-2xl">카드 추가하기</p>
                </div>
                <div className="flex gap-4">
                    <div className="w-[202px] flex flex-col gap-4">
                        <div className="w-full flex flex-col gap-4">
                            <Link href="cards/add">
                                <div className="size-[204px] border-1 border-[#D1D1D1] shadow-xl rounded-4xl">
                                    <PlusIcon color="#D1D1D1" width={30} className="mx-auto h-full" />
                                </div>
                            </Link>
                            <div className="w-full p-3 text-center text-white bg-[#56A6D6] rounded-4xl">
                                삭제하기
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-16">
                        <div className="flex flex-wrap gap-4 w-[716px]">
                            {isLoading ? (
                                <div>카드 내역 불러오는 중....</div>
                            ) : (
                                data && data.map((card, idx) => (
                                    <Card key={idx} gradientColors={idx % 2 == 1 ? ["#C1E7F0", "#7CBBDE"] : ["#FFC21F", "#F68701"]}
                                        cardInfo={{
                                            usageAmount: card.totalAmount,
                                            cardName: card.cardType,
                                            cardNumber: card.cardNumber,
                                            cardExpirationPeriod: card.expiryDate,
                                            cardBrand: "MATER",
                                        }} />
                                ))
                            )}
                        </div>
                        <div>
                            &larr; 1 &rarr;
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
