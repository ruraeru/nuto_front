import Calendar from "@/components/Calendar";
import getSession from "@/lib/session";
import Link from "next/link";

export default async function Page() {
    const session = await getSession();

    return (
        <div className="h-screen flex justify-center">
            <div className="m-5 flex flex-col gap-5">
                <div>
                    <h1 className="font-extrabold text-4xl">{session.userId ? `${session.userId}님의 소비 패턴` : '로딩 중...'}</h1>
                </div>
                <div className="flex items-end gap-5">
                    <div className="flex flex-col gap-10">
                        <div className="w-[416px] h-[210px] relative">
                            <div className="flex justify-between w-full h-full bg-gradient-to-t from-[#C1E7F0] to-[#C1E7F0]/40 rounded-2xl p-4">
                                <h3 className="font-semibold text-xl">카테고리별 소비 내역</h3>
                                <p className="font-semibold">모두보기</p>
                            </div>
                            <div className="absolute bottom-0 w-full flex gap-5 bg-white border border-[#D1D1D1] shadow-xl p-5 rounded-2xl justify-around items-center h-[160px]">

                                <div className="flex flex-col items-center gap-3">
                                    <div className="bg-[#C1E7F0]/20 border border-[#7CBBDE] size-16 rounded-2xl flex items-center justify-center">
                                        <p className="font-semibold">{28}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">식비</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    <div className="bg-[#C1E7F0]/50 border border-[#7CBBDE] size-16 rounded-2xl flex items-center justify-center">
                                        <p className="font-semibold">{28}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">식비</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    <div className="bg-[#C1E7F0]/100 border border-[#7CBBDE] size-16 rounded-2xl flex items-center justify-center">
                                        <p className="font-semibold">{28}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">식비</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5 border border-[#C1E7F0] shadow-xl p-5 rounded-2xl w-[416px] h-[278px] items-center justify-center relative">
                            <div className="absolute top-4 right-4 bg-gradient-to-t from-[#7CBBDE] to-[#C1E7F0] size-[18px] rounded-full" />
                            <div className="absolute top-18 left-10">
                                <h3 className="font-semibold text-4xl">금융 상품 명칭</h3>
                                <p className="font-medium">금융 상품 요약 설명</p>
                            </div>
                            <div className="bg-[#56A6D6] w-[218px] h-[60px] rounded-full flex items-center justify-center absolute bottom-3 right-3">
                                <Link href={"/product"} className="font-medium text-white">금융 상품 더 보기 &rarr;</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col relative">
                        <Calendar />
                        <div className='w-[584px] h-[497px] absolute bg-gradient-to-t from-[#7CBBDE] to-[#C1E7F0] rounded-2xl rotate-8 -z-10 -top-2 left-9' />
                    </div>
                </div>
            </div>
        </div>
    )
}