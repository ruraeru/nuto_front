"use client"

import { ChangeEvent, startTransition, useActionState, useCallback, useEffect, useState } from "react";
import questionGemini from "./actions";
import { uploadReceiptData } from "./uploadActions";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { IinitialState, RecieptType, TransactionType } from "@/types/recieptType";
import Input from "@/components/Input";
import TagInput from "@/components/TagInput";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCards, ICardInfo } from "@/lib/card";


const initialState: IinitialState = {
    output: null,
    prompt: "",
}

const validateImageFile = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (file.size > maxSize) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return false;
    }

    if (!allowedTypes.includes(file.type)) {
        alert('지원되는 이미지 형식은 JPEG, PNG, GIF, WebP입니다.');
        return false;
    }

    return true;
};

// 초기 상품 데이터 생성 함수
const createInitialProductData = (): RecieptType => ({
    recieptName: "",
    storeName: "",
    address: "",
    purchaseDate: "",
    category: [],
    totalAmount: 0,
    transactionType: '지출',
    selectedCardNumber: "",
});

export default function RecieptUpload() {
    const [previewImg, setPreview] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [state, action, isPending] = useActionState(questionGemini, initialState);
    const [productData, setProductData] = useState<RecieptType>(createInitialProductData());
    const [isUploading, setIsUploading] = useState(false);

    const { data: cardInfo, isLoading } = useQuery<ICardInfo[]>({
        queryKey: ['cards'],
        queryFn: getCards
    });

    const handleImageChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = e;
        if (!files || files.length === 0) return;

        const file = files[0];

        if (!validateImageFile(file)) {
            e.target.value = ''; // 입력 초기화
            return;
        }

        // 이전 미리보기 URL 정리
        if (previewImg) {
            URL.revokeObjectURL(previewImg);
        }

        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        setUploadedFile(file); // 업로드용 파일 저장

        // 이미지가 선택되면 바로 영수증 분석 액션 실행
        const formData = new FormData();
        formData.append('imagePart', file);
        startTransition(() => {
            action(formData);
        })
    }, [previewImg, action]);

    useEffect(() => {
        if (state.output) {
            setProductData(state.output);
        }
    }, [state]);

    // 컴포넌트 언마운트 시 URL 정리
    useEffect(() => {
        return () => {
            if (previewImg) {
                URL.revokeObjectURL(previewImg);
            }
        };
    }, [previewImg]);

    // 입력 필드 변경 핸들러 (기존 Input 컴포넌트용)
    const handleInfoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setProductData(prevData => ({
            ...prevData,
            [name]: name === 'totalAmount' ? Number(value) || 0 : value
        }));
    }, []);

    // 거래 타입 변경 핸들러
    const handleTransactionTypeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            transactionType: value as TransactionType
        }));
    }, []);

    // 태그 변경 핸들러
    const handleTagChange = useCallback((tags: string[]) => {
        setProductData(prevData => ({
            ...prevData,
            category: tags
        }));
    }, []);

    // 카드 선택 변경 핸들러
    const handleCardChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            selectedCardNumber: value // 선택된 카드 번호를 상태에 저장
        }));
    }, []);

    // 업로드 핸들러
    const handleUpload = useCallback(async () => {
        if (isUploading) return;

        // 필수 필드 검증
        if (!productData.recieptName.trim()) {
            alert('파일 명칭을 입력해주세요.');
            return;
        }

        if (!productData.storeName.trim()) {
            alert('가게 명칭을 입력해주세요.');
            return;
        }

        if (productData.totalAmount <= 0) {
            alert('올바른 금액을 입력해주세요.');
            return;
        }

        // 카드 선택 필수 여부에 따라 추가 검증
        if (!productData.selectedCardNumber) {
            alert('카드를 선택해주세요.');
            return;
        }


        setIsUploading(true);


        const result = await uploadReceiptData(productData, uploadedFile || undefined);

        if (result.success) {
            alert(result.message);
            console.log('업로드 성공:', result.data);

            // 성공 시 페이지 이동
            redirect("/consumption");
        } else {
            alert(result.message);
            console.error('업로드 실패:', result.error);
        }

    }, [productData, isUploading, uploadedFile]);

    const isFormValid = productData.recieptName.trim() && productData.storeName.trim() && productData.selectedCardNumber;

    return (
        <div className="flex justify-between pt-8 gap-5 max-w-7xl mx-auto">
            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <label
                        htmlFor="photo"
                        className="border w-[430px] aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-2xl cursor-pointer bg-center bg-no-repeat bg-contain hover:border-cyan-400 transition-colors"
                        style={{
                            backgroundImage: previewImg ? `url(${previewImg})` : "none"
                        }}
                    >
                        {!previewImg ? (
                            <>
                                <PhotoIcon className="w-20" />
                                <div className="text-neutral-400 text-sm">
                                    사진을 추가해주세요.
                                </div>
                                <div className="text-neutral-500 text-xs mt-1">
                                    (최대 5MB, JPEG/PNG/GIF/WebP)
                                </div>
                            </>
                        ) : null}
                    </label>

                    <input
                        id="photo"
                        className="hidden"
                        type="file"
                        accept="image/gif, image/png, image/jpg, image/jpeg, image/webp"
                        name="imagePart"
                        onChange={handleImageChange} // 이미지 변경 시 바로 액션 실행
                    />
                    <Input
                        label="파일 명칭 *"
                        name="recieptName"
                        onChange={handleInfoChange}
                        value={productData.recieptName}
                        placeholder="파일 이름을 입력해주세요"
                        disabled={isPending}
                    />
                </div>
            </div>
            <div className="w-full flex flex-col gap-5">
                <div className={`flex flex-col gap-5 p-5 ${isPending && "animate-pulse"}`}>
                    <div className="flex flex-col gap-4">
                        {/* 수입/지출 선택 */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">거래 구분 *</label>
                            <div className="flex gap-2">
                                <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${productData.transactionType === '지출'
                                    ? 'border-red-500 bg-red-50 text-red-700'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="transactionType"
                                        value="지출"
                                        checked={productData.transactionType === '지출'}
                                        onChange={handleTransactionTypeChange}
                                        disabled={isPending}
                                        className="sr-only"
                                    />
                                    <span className="text-lg">💸</span>
                                    <span className="font-medium">지출</span>
                                </label>
                                <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${productData.transactionType === '수입'
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="transactionType"
                                        value="수입"
                                        checked={productData.transactionType === '수입'}
                                        onChange={handleTransactionTypeChange}
                                        disabled={isPending}
                                        className="sr-only"
                                    />
                                    <span className="text-lg">💰</span>
                                    <span className="font-medium">수입</span>
                                </label>
                            </div>
                        </div>

                        {/* 카테고리 선택 */}
                        <div className="flex flex-col gap-2">
                            <TagInput
                                initialTags={productData.category}
                                onTagsChange={handleTagChange}
                                disabled={isPending}
                            />
                        </div>

                        <Input
                            label="결제 시간"
                            name="purchaseDate"
                            onChange={handleInfoChange}
                            value={productData.purchaseDate}
                            placeholder="결제 시간을 입력해주세요"
                            disabled={isPending}
                        />

                        <Input
                            label="가게 명칭 *"
                            name="storeName"
                            onChange={handleInfoChange}
                            value={productData.storeName}
                            placeholder="가게 명칭을 입력해주세요"
                            disabled={isPending}
                        />

                        {/* 카드 선택 */}
                        <div className="flex flex-col gap-4">
                            <label htmlFor="card-select">
                                카드 *
                            </label>
                            <select
                                id="card-select"
                                name="selectedCardNumber"
                                value={productData.selectedCardNumber}
                                onChange={handleCardChange}
                                disabled={isPending}
                                className="border border-gray-300 rounded-full px-4 py-3 text-base text-gray-900 bg-white transition duration-150 ease-in-out focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 placeholder:text-gray-400 appearance-none pr-10 bg-no-repeat bg-[length:1rem] bg-[position:right_0.75rem_center]"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236B7280'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`
                                }}
                            >
                                <option value="">카드를 선택해주세요</option>
                                <option value="1">기타</option>
                                {!isLoading ? (
                                    cardInfo && Array.isArray(cardInfo) && cardInfo.length > 0 ? (
                                        cardInfo.map((card, idx) => (
                                            <option key={idx} value={idx + 1}>
                                                {card.cardType} ({card.cardNumber.slice(-4)}) {/* 카드 이름과 카드 번호 마지막 4자리 표시 */}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">카드 정보가 없습니다.</option>
                                    )
                                ) : (
                                    <option value="">카드 정보 불러오는 중...</option>
                                )}
                            </select>
                        </div>

                        {/* 수입 지출 구분 */}
                        <Input
                            label={`${productData.transactionType === '수입' ? '수입' : '지출'} 금액 *`}
                            name="totalAmount"
                            type="number"
                            onChange={handleInfoChange}
                            value={productData.totalAmount}
                            placeholder="금액을 작성해주세요"
                            disabled={isPending}
                        />
                    </div>

                    <button
                        disabled={isPending || isUploading || !isFormValid}
                        onClick={handleUpload}
                        className="h-12 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed w-full bg-cyan-500 text-white font-medium rounded-md text-center hover:bg-cyan-400 transition-colors"
                    >
                        {isUploading ? '업로드 중...' : '업로드 하기!'}
                    </button>

                    {!isFormValid && (
                        <div className="text-sm text-red-500 text-center">
                            * 표시된 필수 항목과 이미지를 모두 입력해주세요.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
