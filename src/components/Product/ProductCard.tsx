import Image from 'next/image';
import React from 'react';

type Productcategory = "카드" | "적금" | "예금";


export interface ProductCardProps {
    category: Productcategory;
    productName: string;
    productDescription: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    category,
    productName,
    productDescription,
}) => {
    const isCard = category.startsWith("카드");
    return (
        <div className="w-[305px] h-[260px] bg-white rounded-2xl border border-[#C1E7F0] relative overflow-hidden shadow-md">
            <div style={{
                backgroundColor: isCard ? "#DFEFFE" : "#D7F4FC"
            }} className="w-full h-[89px] rounded-t-2xl absolute top-0 left-0" />
            {/* 카테고리 텍스트 */}
            <p className="text-xl text-[#8F8F8F] absolute top-8 left-8">{category}</p>

            {/* 상품 아이콘 */}
            {category === "카드" && <Image
                src="/cardProductIcon.svg"
                alt="카드 추천 상품"
                width={80}
                height={80}
                className="absolute right-3 top-[52px]"
            />}

            {category === "적금" && <Image
                src="/depositIcon.svg"
                alt="적금 추천 상품"
                width={80}
                height={80}
                className="absolute right-3 top-[52px]"
            />}

            {category === "예금" && <Image
                src="/bankDepositIcon.svg"
                alt="예금 추천 상품"
                width={80}
                height={80}
                className="absolute right-3 top-[52px]"
            />}

            {/* 상품명 및 설명 */}
            <div className="absolute top-[108px] left-[29px] flex flex-col gap-6">
                <p className="font-medium text-3xl leading-tight w-[170px]">
                    {productName}</p>
                <p className="font-medium text-lg text-[#8F8F8F]">{productDescription}</p>
            </div>
        </div>
    );
};

export default ProductCard;
