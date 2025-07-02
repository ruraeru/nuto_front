import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"

export default function spendingHistory() {
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
                                <li>All</li>
                                <li>Month</li>
                                <li>Category</li>
                                <li>Card</li>
                            </ul>

                            {/* search input */}
                            <div className="relative flex items-center w-[606px] h-[50px] rounded-xl border border-[#D1D1D1] shadow-xl">
                                <input type="text" className="
                                flex-auto h-full rounded-xl px-5 bg-transparent outline-none" placeholder="검색어 입력" />

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
        </div>
    )
}