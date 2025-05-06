export default function Page() {
    return (
        <div className="">
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl font-bold">카드 총액</h1>
                <p className="text-lg/tight font-semibold">여러 개의 카드를 사용하는 경우, 어떤 카드에서 얼마를 썼는지 관리하기 어려웠던 적이 있지 않나요?<br />이곳에서는 사용자가 등록한 카드별로 총 사용 금액을 자동 집계하여 보여드립니다.<br />카드별 소비 패턴을 쉽게 파악하고, 보다 체계적인 지출 관리를 시작해보세요.</p>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <span>카드 추가하기</span>
                </div>
                <div className="flex gap-4">
                    <div className="w-[204px] flex flex-col gap-4">
                        <div className="w-full flex flex-col gap-4">
                            <div className="size-[204px] bg-gray-400 rounded-4xl" />
                            <div className="w-full p-3 text-center bg-gray-400 rounded-4xl">
                                수정하기
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-16">
                        <div className="flex flex-wrap gap-4 w-[716px]">
                            <div className="w-[350px] h-[235px] bg-cyan-400 rounded-4xl" />
                            <div className="w-[350px] h-[235px] bg-cyan-400 rounded-4xl" />
                            <div className="w-[350px] h-[235px] bg-cyan-400 rounded-4xl" />
                            <div className="w-[350px] h-[235px] bg-cyan-400 rounded-4xl" />
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
