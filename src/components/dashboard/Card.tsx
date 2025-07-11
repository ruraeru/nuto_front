import { parseExpiryDate } from "@/lib/utils";
import Image from "next/image";


interface CardProps {
    gradientColors: string[];
    cardInfo: {
        usageAmount: number;
        cardName: string;
        cardNumber: string;
        cardExpirationPeriod: string;
        cardBrand: string;
        /**
        usageAmount: "120,250",
        cardName: "하나은행",
        cardNumber: "4097-0000-0000...",
        cardExpirationPeriod: "12/22",
        cardBrand: "VISA",
        */
    }
}

export default function Card({ gradientColors, cardInfo }: CardProps) {
    const cardBackgroundStyle = {
        background: `linear-gradient(to bottom right, ${gradientColors[0]}, ${gradientColors[1]})`
    }
    return (
        <div style={cardBackgroundStyle} className={`shadow-xl flex flex-col justify-around px-5 py-3 text-white w-[350px] h-[235px] rounded-3xl relative`}>
            {/* 카드 하단 블러 */}
            <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-white/20 rounded-b-xl z-0" />
            {/* 카드 상단 */}
            <div className="flex justify-between items-center z-10">
                <div>
                    <p className="text-xs opacity-80">사용 금액</p>
                    <p className="text-xl font-semibold">{cardInfo.usageAmount?.toLocaleString("ko-KR")}</p>
                </div>
                <div>
                    <Image src="/card_chip.svg" alt="ic-chip" width={35} height={35} />
                </div>
            </div>
            {/* 카드 중앙 */}
            <div className="flex justify-between items-end mt-4 z-10">
                <div>
                    <p className="text-xs opacity-80">카드 명칭</p>
                    <p className="text-base font-semibold">{cardInfo.cardName}</p>
                </div>
                <div>
                    <p className="text-xs opacity-80">VALID THRU</p>
                    {cardInfo.cardExpirationPeriod && <p className="text-base font-semibold">{parseExpiryDate(cardInfo.cardExpirationPeriod)}</p>}
                </div>
            </div>
            {/* 카드 하단 */}
            <div className="flex justify-between items-end mt-4 z-10">
                <p className="text-xl font-semibold tracking-wider">{cardInfo.cardNumber}</p>
                <Image src="/master_card_symbol.svg" alt="master_card_symbol" width={44} height={30} />
            </div>
        </div>
    )
}