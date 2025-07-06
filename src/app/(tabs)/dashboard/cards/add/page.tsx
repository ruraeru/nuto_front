"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { useState } from "react";
export default function AddCards() {
    const [cardInfo, setCardInfo] = useState({
        cardName: "",
        cardNumber: "",
        cardExpirationPeriod: ""
    });

    const handleCardInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardInfo({
            ...cardInfo,
            [name]: value
        })
    }

    return (
        <div>
            <div className="flex flex-col gap-4 mb-4">
                <h1 className="text-5xl font-bold">카드 총액</h1>
                <p className="text-lg/tight font-semibold">여러 개의 카드를 사용하는 경우, 어떤 카드에서 얼마를 썼는지 관리하기 어려웠던 적이 있지 않나요?<br />이곳에서는 사용자가 등록한 카드별로 총 사용 금액을 자동 집계하여 보여드립니다.<br />카드별 소비 패턴을 쉽게 파악하고, 보다 체계적인 지출 관리를 시작해보세요.</p>
            </div>
            <div className="flex gap-16">
                <div className={`shadow-xl bg-gradient-to-tl from-[#444444] to-[#DCDCDC] flex flex-col justify-center px-5 py-3 w-[540px] h-[366px] rounded-3xl relative`}>
                    {/* 카드 하단 블러 */}
                    <div className="absolute bottom-0 left-0 right-0 h-[104px] bg-gradient-to-tl from-[#444444] to-[#DCDCDC] opacity-50 rounded-b-3xl z-0" />
                    {/* 카드 상단 */}
                    <div className="z-10 absolute top-10 right-10">
                        <Image src="/card_chip.svg" alt="ic-chip" width={55} height={55} />
                    </div>
                    {/* 카드 중앙 */}
                    <div className="flex gap-16 px-5 items-center z-10">
                        <div>
                            <p className="text-2xl font-medium text-white">카드 명칭</p>
                            <div className="w-[150px] h-[30px] border border-white">
                                <p className="text-[26px] font-medium h-full -mt-1">{cardInfo.cardName}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-medium text-white">VALID THRU</p>
                            <div className="w-[150px] h-[30px] border border-white">
                                <p className="text-[26px] font-medium h-full -mt-1">{cardInfo.cardExpirationPeriod}</p>
                            </div>
                        </div>
                    </div>
                    {/* 카드 하단 */}
                    <div className="flex justify-between items-center px-10 absolute w-full bottom-8 left-0 mx-auto z-10">
                        <div className="w-fit min-w-[200px] h-[40px] border border-white">
                            <p className="text-3xl font-semibold tracking-wider h-full">{cardInfo.cardNumber}</p>
                        </div>
                        <Image src="/master_card_symbol.svg" alt="master_card_symbol" width={68} height={45} />
                    </div>
                </div>


                <div className="w-[365px] h-[366px] flex flex-col">
                    <div className="flex flex-col gap-8 mb-4">
                        <Input label="카드 명칭" name="cardName" placeholder="카드 이름을 작성해주세요" onChange={handleCardInfo} />
                        <Input label="유효 기간" name="cardExpirationPeriod" placeholder="카드 유효 기간을 작성해주세요" onChange={handleCardInfo} />
                        <Input label="카드 번호" name="cardNumber" placeholder="카드 번호를 작성해주세요" onChange={handleCardInfo} />
                    </div>
                    <Button text="등록하기" />
                </div>
            </div>
        </div>
    )
}