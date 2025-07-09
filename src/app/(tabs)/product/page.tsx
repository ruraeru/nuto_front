import ProductCard from "@/components/Product/ProductCard";

export default function ProductPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl font-bold">금융 상품</h1>
                <p className="text-lg/tight font-semibold">금융 상품 추천페이지에서는 사용자의 소비 습관과 생활 패턴을 분석하여 가장 적합한 카드, 적급, 대출 상품 등을 추천합니다.</p>
            </div>
            <div className="flex flex-col gap-32">
                <div>
                    <h1 className="text-4xl font-bold p-5">추천 상품</h1>
                    <div className="flex gap-8">
                        <ProductCard category="적금" productName="굴비 적금" productDescription="간단한 설명" />
                        <ProductCard category="카드" productName="DeepDream 체크카드" productDescription="간단한 설명" />
                        <ProductCard category="예금" productName="토스 뱅크" productDescription="간단한 설명" />
                    </div>
                </div>
                <div>
                    <div className="flex items-end justify-between p-5">
                        <h1 className="text-4xl font-bold">카드 상품</h1>
                        <p className="font-medium">모두 보기</p>
                    </div>
                    <div className="flex gap-8">
                        <ProductCard category="카드" productName="DeepDream 체크카드" productDescription="간단한 설명" />
                        <ProductCard category="카드" productName="DeepDream 체크카드" productDescription="간단한 설명" />
                        <ProductCard category="카드" productName="DeepDream 체크카드" productDescription="간단한 설명" />
                    </div>
                </div>
                <div>
                    <div className="flex items-end justify-between p-5">
                        <h1 className="text-4xl font-bold">저축 상품</h1>
                        <p className="font-medium">모두 보기</p>
                    </div>
                    <div className="flex gap-8">
                        <ProductCard category="예금" productName="토스 뱅크" productDescription="간단한 설명" />
                        <ProductCard category="예금" productName="토스 뱅크" productDescription="간단한 설명" />
                        <ProductCard category="예금" productName="토스 뱅크" productDescription="간단한 설명" />
                    </div>
                </div>
            </div>
        </div>
    )
}