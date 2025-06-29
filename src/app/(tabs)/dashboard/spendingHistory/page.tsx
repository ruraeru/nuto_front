export default function spendingHistory() {
    return (
        <div className="">
            <div className="flex flex-col gap-4 mb-6">
                <h1 className="text-5xl font-bold">소비 내역</h1>
                <p className="text-lg/tight font-semibold">날짜별, 카테고리별, 금액별, 카드사별로 정리된 소비 내역을 한눈에 볼 수 있습니다.<br />언제, 어떤 항목에, 얼마를 어떤 카드로 결제했는지 쉽게 파악할 수 있어,<br />소비 패턴을 분석하고 계획적인 지출을 도와줍니다.</p>
            </div>
            <div className="">
                <div className="w-full h-36">
                    <div>
                        <ul className="flex gap-5 *:p-3 *:rounded-xl px-5 *:cursor-pointer *:hover:bg-neutral-500 *:hover:text-white bg-neutral-200  rounded-xl w-fit">
                            <li>날짜</li>
                            <li>카테고리</li>
                            <li>금액</li>
                        </ul>
                    </div>
                </div>
                <table className="w-full">
                    <thead className="border-b-1">
                        <tr className="*:py-2 text-left">
                            <th>이름</th>
                            <th>금액</th>
                            <th>카드</th>
                            <th>날짜</th>
                            <th>카테고리</th>
                        </tr>
                    </thead>
                    <tbody className="font-bold">
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <tr key={index} className="*:py-5 border-b-1">
                                <td>버거킹</td>
                                <td>8,400</td>
                                <td>신한카드</td>
                                <td>2025-01-23</td>
                                <td>음식</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}