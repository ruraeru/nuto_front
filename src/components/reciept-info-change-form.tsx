"use client"

// import { AddProducts } from "@/lib/addProducts";
import { redirect } from "next/navigation";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Input from "./Input";
import TagInput from "./TagInput";
import { RecieptType } from "@/types/recieptType";

function ProductInfoChangeForm({ initialProductData, isLoading }: { initialProductData: RecieptType | null, isLoading: boolean }) {
    const [productData, setProductData] = useState<RecieptType>(initialProductData || {
        storeName: "",
        address: "",
        purchaseDate: "",
        category: [],
        totalAmount: 0,
    });

    useEffect(() => {
        if (initialProductData) setProductData(initialProductData);
    }, [initialProductData]);

    const onChangeInfo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }, []);

    const onUpload = useCallback(async () => {
        console.log(productData);
        // if (await AddProducts(productData)) {
        //     alert("업로드 성공!");
        //     redirect("/products");
        // }
    }, [productData]);
    return (
        <div className={`flex flex-col gap-5 p-5 ${isLoading && "animate-pulse"}`}>
            <div className="flex flex-col gap-5">
                <div className="*:text-black w-full p-2 *:w-full flex flex-col gap-2">
                    <div className="flex flex-col">
                        <Input
                            label="이름"
                            name="storeName"
                            onChange={onChangeInfo}
                            value={productData?.storeName}
                            placeholder="가게 명칭을 입력해주세요"
                        />
                    </div>
                    <div>
                        <TagInput initialTags={productData?.category} />
                    </div>
                    <div className="flex flex-col">
                        <Input
                            label="주소"
                            name="address"
                            onChange={onChangeInfo}
                            value={productData?.address}
                            placeholder="가게 주소를 작성해주세요"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Input
                            label="합계 가격"
                            name="totalAmount"
                            onChange={onChangeInfo}
                            value={productData?.totalAmount}
                            placeholder="금액을 작성해주세요"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Input
                            label="결제 시간"
                            name="purchaseDate"
                            onChange={onChangeInfo}
                            value={productData?.purchaseDate}
                            placeholder="결제 시간을 입력해주세요"
                        />
                    </div>
                </div>
            </div>
            <button disabled={isLoading} onClick={onUpload} className="h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed w-full bg-cyan-500 text-white font-medium rounded-md text-center hover:bg-cyan-400 transition-colors">
                업로드 하기!
            </button>
        </div >
    );
}

export default React.memo(ProductInfoChangeForm);