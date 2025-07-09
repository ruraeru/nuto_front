import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function NotificationPage() {
    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl font-bold">공지사항</h1>
                <p className="text-lg/tight font-semibold">더 편리하고 똑똑한 서비스를 위해 확인 부탁드립니다.</p>
                <div className="relative flex items-center w-[998px] h-[50px] rounded-xl border border-[#D1D1D1] shadow-xl">
                    <input type="text" className="flex-auto h-full rounded-xl px-5 bg-transparent outline-none" placeholder="검색어 입력" />
                    <MagnifyingGlassIcon width={19} className="absolute right-4 cursor-pointer" />
                </div>
            </div>
            <div className="w-[1006px]">
                <div className="h-[500px] p-3">
                    <table className="w-full">
                        <thead className="border-b-2 border-[#C1E7F0]">
                            <tr className="*:p-5">
                                <th>제목</th>
                                <th>작성자</th>
                                <th>날짜</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody className="text-center font-medium *:border-b-1 *:border-[#C1E7F0] *:last:border-none">
                            {Array(5).fill(5).map((_, idx) => (
                                <tr className="*:px-5 *:py-7" key={idx}>
                                    <td>
                                        신규 기능
                                    </td>
                                    <td>nuto</td>
                                    <td>2025-07-01</td>
                                    <td>5</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}