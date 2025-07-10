"use client"

import LoadingSpinner from "@/components/Chart/LoadingSpinner";
import { getConsumption } from "@/lib/receipts";
import { ChevronLeftIcon, ChevronRightIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

export default function SpendingHistoryPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const { data, isLoading } = useQuery({
        queryKey: ["spending", currentPage, searchTerm, selectedCategory],
        queryFn: () => getConsumption(currentPage, searchTerm, selectedCategory)
    });

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= (data?.totalPages || 1)) {
            setCurrentPage(page);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
    };

    // 페이지 번호 배열 생성
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const totalPages = data?.totalPages || 1;

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

    console.log(data)

    return (
        <div className="">
            <div className="flex flex-col gap-4 mb-6">
                <h1 className="text-5xl font-bold">소비 내역</h1>
                <p className="text-lg/tight font-semibold">날짜별, 카테고리별, 금액별, 카드사별로 정리된 소비 내역을 한눈에 볼 수 있습니다.<br />언제, 어떤 항목에, 얼마를 어떤 카드로 결제했는지 쉽게 파악할 수 있어,<br />소비 패턴을 분석하고 계획적인 지출을 도와줍니다.</p>
            </div>
            <div className="">
                <div className="w-full h-36">
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">
                            <ul className="flex items-center gap-5 px-5 font-medium border-1 border-[#D1D1D1] rounded-xl w-fit h-12 
                        shadow-lg
                        *:h-9 *:border-1 *:border-[#C1E7F0] *:hover:bg-[#C1E7F0]
                        *:cursor-pointer
                        *:p-3 *:rounded-xl
                        *:flex *:place-items-center
                        ">
                                <li
                                    className={selectedCategory === "All" ? "bg-[#C1E7F0]" : ""}
                                    onClick={() => handleCategoryChange("All")}
                                >
                                    All
                                </li>
                                <li onClick={() => handleCategoryChange("Month")}>Month</li>
                                <li onClick={() => handleCategoryChange("Category")}>Category</li>
                                <li onClick={() => handleCategoryChange("Card")}>Card</li>
                            </ul>

                            {/* search input */}
                            <div className="relative flex items-center w-[606px] h-[50px] rounded-xl border border-[#D1D1D1] shadow-xl">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="flex-auto h-full rounded-xl px-5 bg-transparent outline-none"
                                    placeholder="검색어 입력"
                                />
                                <MagnifyingGlassIcon width={19} className="absolute right-4 cursor-pointer" />
                            </div>
                        </div>

                        <ul className="flex gap-4 *:flex *:gap-1 *:border-2 *:border-[#7CBBDE] *:px-5 *:py-2  *:rounded-3xl *:font-medium">
                            <li>
                                <FunnelIcon fill="none" stroke="black" width={14} />
                                의류/화장품
                            </li>
                            <li>
                                <FunnelIcon fill="none" stroke="black" width={14} />
                                교통비
                            </li>
                            <li>
                                <FunnelIcon fill="none" stroke="black" width={14} />
                                식비
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-[1006px]">
                    <div className="h-[500px] border-2 border-[#C1E7F0] rounded-2xl p-3">
                        {!isLoading ? (
                            <div className="h-full flex flex-col">
                                <table className="w-full">
                                    <thead className="border-b-2 border-[#C1E7F0]">
                                        <tr className="*:p-5">
                                            <th>이름</th>
                                            <th>금액</th>
                                            <th>카드</th>
                                            <th>날짜</th>
                                            <th>카테고리</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center font-medium *:border-b-1 *:border-[#C1E7F0] *:last:border-none ">
                                        {data?.content && data.content.length > 0 ? (
                                            data.content.map((info, idx) => (
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
                                                    {searchTerm || selectedCategory !== "All"
                                                        ? "검색 결과가 없습니다."
                                                        : "소비 내역이 없습니다."}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : <LoadingSpinner text="소비 내역 불러오는 중" />}
                    </div>

                    {/* 페이지네이션 */}
                    <div className="flex justify-center items-center mt-4">
                        <ul className="flex items-center gap-2">
                            {/* 이전 페이지 버튼 */}
                            <li>
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={data?.first}
                                    className={`p-2 rounded-lg ${data?.first
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
                            {getPageNumbers()[getPageNumbers().length - 1] < (data?.totalPages || 1) && (
                                <>
                                    {getPageNumbers()[getPageNumbers().length - 1] < (data?.totalPages || 1) - 1 && (
                                        <li className="px-2 text-gray-500">...</li>
                                    )}
                                    <li>
                                        <button
                                            onClick={() => handlePageChange(data?.totalPages || 1)}
                                            className="px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium"
                                        >
                                            {data?.totalPages || 1}
                                        </button>
                                    </li>
                                </>
                            )}

                            {/* 다음 페이지 버튼 */}
                            <li>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={data?.last}
                                    className={`p-2 rounded-lg ${data?.last
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <ChevronRightIcon width={20} />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}