import Card from "@/components/dashboard/Card";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Page() {
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
                            <div className="size-[204px] border-1 border-[#D1D1D1] shadow-xl rounded-4xl">
                                <PlusIcon color="#D1D1D1" width={30} className="mx-auto h-full" />
                            </div>
                            <div className="w-full p-3 text-center text-white bg-[#56A6D6] rounded-4xl">
                                수정하기
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-16">
                        <div className="flex flex-wrap gap-4 w-[716px]">
                            <Card gradientColors={["#FFC21F", "#F68701"]}
                                cardInfo={{
                                    usageAmount: "56,000",
                                    cardName: "토스뱅크",
                                    cardNumber: "4907-0000-0000...",
                                    cardExpirationPeriod: "12/22",
                                    cardBrand: "MATER",
                                }} />

                            <Card gradientColors={["#C1E7F0", "#7CBBDE"]}
                                cardInfo={{
                                    usageAmount: "120,250",
                                    cardName: "하나은행",
                                    cardNumber: "4097-0000-0000...",
                                    cardExpirationPeriod: "12/22",
                                    cardBrand: "VISA",
                                }} />
                            <Card gradientColors={["#FFC21F", "#F68701"]}
                                cardInfo={{
                                    usageAmount: "56,000",
                                    cardName: "토스뱅크",
                                    cardNumber: "4907-0000-0000...",
                                    cardExpirationPeriod: "12/22",
                                    cardBrand: "MATER",
                                }} />

                            <Card gradientColors={["#C1E7F0", "#7CBBDE"]}
                                cardInfo={{
                                    usageAmount: "120,250",
                                    cardName: "하나은행",
                                    cardNumber: "4097-0000-0000...",
                                    cardExpirationPeriod: "12/22",
                                    cardBrand: "VISA",
                                }} />
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
