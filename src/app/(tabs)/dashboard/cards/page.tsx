"use client"

import LoadingSpinner from "@/components/Chart/LoadingSpinner";
import Card from "@/components/dashboard/Card";
import { getCard, getCards, ICardInfo } from "@/lib/card";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function MyCards() {
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [selectedCards, setSelectedCards] = useState<number[]>([]);

    const { data, isLoading } = useQuery<ICardInfo[]>({
        queryKey: ['cards'],
        queryFn: async () => (await getCards()).data
    });
    console.log(data)

    const handleDeleteModeToggle = () => {
        setIsDeleteMode(!isDeleteMode);
        setSelectedCards([]); // 삭제 모드 전환 시 선택된 카드 초기화
    };

    const handleCardSelect = (cardIndex: number) => {
        setSelectedCards(prev =>
            prev.includes(cardIndex)
                ? prev.filter(index => index !== cardIndex)
                : [...prev, cardIndex]
        );
    };

    const handleDeleteSelected = () => {
        const deleteCards = async () => {
            selectedCards.map(async (card) => {
                const json = await getCard(card + 1);
                console.log(json)
            });
            console.log('선택된 카드 삭제:', selectedCards);
        }
        deleteCards();
        setSelectedCards([]);
        setIsDeleteMode(false);
    };

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
                            <button
                                onClick={handleDeleteModeToggle}
                                className={`w-full p-3 text-center text-white rounded-4xl transition-colors ${isDeleteMode ? 'bg-red-600' : 'bg-[#56A6D6]'
                                    }`}
                            >
                                {isDeleteMode ? '취소' : '삭제하기'}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-16">
                        <div className="flex flex-wrap gap-4 w-[716px]">
                            {isLoading ? (
                                <div className="mx-auto h-96"><LoadingSpinner text="카드 정보 불러오는 중" /></div>
                            ) : (
                                data && data.length > 0 ? (
                                    data.map((card, idx) => (
                                        <div key={idx} className="relative">
                                            <Card
                                                gradientColors={idx % 2 == 1 ? ["#C1E7F0", "#7CBBDE"] : ["#FFC21F", "#F68701"]}
                                                cardInfo={{
                                                    usageAmount: card.totalAmount,
                                                    cardName: card.cardType,
                                                    cardNumber: card.cardNumber,
                                                    cardExpirationPeriod: card.expiryDate,
                                                    cardBrand: "MATER",
                                                }}
                                            />
                                            {isDeleteMode && (
                                                <div className="w-[350px] h-[235px] bg-white opacity-50 absolute top-0 rounded-3xl z-20 cursor-pointer" onClick={() => handleCardSelect(idx)}>
                                                    <div className="absolute top-4 right-4 z-20">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedCards.includes(idx)}
                                                            onChange={() => handleCardSelect(idx)}
                                                            className="w-6 h-6 rounded border-2 cursor-pointer
                                                            z-40 checked:bg-red-500 checked:border-red-500"
                                                        />
                                                    </div>
                                                </div>


                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="mx-auto h-96 text-4xl flex items-center font-semibold">카드 정보가 없습니다.</div>
                                )
                            )}
                        </div>

                        {/* 삭제 모드일 때 선택된 카드 수와 삭제 버튼 표시 */}
                        {isDeleteMode && (
                            <div className="flex items-center gap-4">
                                <span className="text-lg font-semibold">
                                    선택된 카드: {selectedCards.length}개
                                </span>
                                <form>
                                    <button
                                        onClick={handleDeleteSelected}
                                        disabled={selectedCards.length === 0}
                                        className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors ${selectedCards.length > 0
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        선택한 카드 삭제
                                    </button>
                                </form>
                            </div>
                        )}

                        <div>
                            &larr; 1 &rarr;
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}