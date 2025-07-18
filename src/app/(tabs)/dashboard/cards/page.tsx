"use client"

import LoadingSpinner from "@/components/Chart/LoadingSpinner";
import Card from "@/components/dashboard/Card";
import { getCard, getCards, ICardInfo } from "@/lib/card";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function MyCards() {
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const CARDS_PER_PAGE = 4;

    const { data: cardInfo, isLoading } = useQuery<ICardInfo[]>({
        queryKey: ['cards'],
        queryFn: getCards
    });

    // 총 페이지 수 계산
    const totalPages = Math.ceil((cardInfo?.length || 0) / CARDS_PER_PAGE);

    // 현재 페이지의 카드들만 필터링
    const getCurrentPageCards = () => {
        if (!cardInfo) return [];
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        const endIndex = startIndex + CARDS_PER_PAGE;
        return cardInfo.slice(startIndex, endIndex);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // 페이지 변경 시 선택된 카드 초기화
            setSelectedCards([]);
        }
    };

    // 페이지 번호 배열 생성
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            const end = Math.min(totalPages, start + maxVisiblePages - 1);

            // 끝에서 시작점 조정
            if (end - start + 1 < maxVisiblePages) {
                start = Math.max(1, end - maxVisiblePages + 1);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    const handleDeleteModeToggle = () => {
        setIsDeleteMode(!isDeleteMode);
        setSelectedCards([]); // 삭제 모드 전환 시 선택된 카드 초기화
    };

    const handleCardSelect = (cardIndex: number) => {
        // 실제 카드 인덱스 계산 (현재 페이지 + 페이지 내 인덱스)
        const realCardIndex = (currentPage - 1) * CARDS_PER_PAGE + cardIndex;

        setSelectedCards(prev =>
            prev.includes(realCardIndex)
                ? prev.filter(index => index !== realCardIndex)
                : [...prev, realCardIndex]
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
                                cardInfo && cardInfo.length > 0 ? (
                                    getCurrentPageCards().map((card, idx) => {
                                        const realCardIndex = (currentPage - 1) * CARDS_PER_PAGE + idx;
                                        return (
                                            <div key={realCardIndex} className="relative">
                                                <Card
                                                    gradientColors={realCardIndex % 2 == 1 ? ["#C1E7F0", "#7CBBDE"] : ["#FFC21F", "#F68701"]}
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
                                                                checked={selectedCards.includes(realCardIndex)}
                                                                onChange={() => handleCardSelect(idx)}
                                                                className="w-6 h-6 rounded border-2 cursor-pointer
                                                                z-40 checked:bg-red-500 checked:border-red-500"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })
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
                            </div>
                        )}

                        {/* 페이지네이션 - 카드가 있고 여러 페이지가 있을 때만 표시 */}
                        {cardInfo && cardInfo.length > 0 && totalPages > 1 && (
                            <div className="flex justify-center items-center mt-4">
                                <ul className="flex items-center gap-2">
                                    {/* 이전 페이지 버튼 */}
                                    <li>
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`p-2 rounded-lg ${currentPage === 1
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <ChevronLeftIcon width={20} />
                                        </button>
                                    </li>

                                    {/* 첫 페이지 */}
                                    {getPageNumbers()[0] > 1 && (
                                        <>
                                            <li>
                                                <button
                                                    onClick={() => handlePageChange(1)}
                                                    className="px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium"
                                                >
                                                    1
                                                </button>
                                            </li>
                                            {getPageNumbers()[0] > 2 && (
                                                <li className="px-2 text-gray-500">...</li>
                                            )}
                                        </>
                                    )}

                                    {/* 페이지 번호들 */}
                                    {getPageNumbers().map((page) => (
                                        <li key={page}>
                                            <button
                                                onClick={() => handlePageChange(page)}
                                                className={`px-3 py-2 rounded-lg text-sm font-medium ${currentPage === page
                                                    ? 'bg-[#C1E7F0] text-[#1f2937]'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    ))}

                                    {/* 마지막 페이지 */}
                                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                                        <>
                                            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                                                <li className="px-2 text-gray-500">...</li>
                                            )}
                                            <li>
                                                <button
                                                    onClick={() => handlePageChange(totalPages)}
                                                    className="px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium"
                                                >
                                                    {totalPages}
                                                </button>
                                            </li>
                                        </>
                                    )}

                                    {/* 다음 페이지 버튼 */}
                                    <li>
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`p-2 rounded-lg ${currentPage === totalPages
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <ChevronRightIcon width={20} />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}