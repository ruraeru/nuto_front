"use server";

import getSession from "@/lib/session";
import { RecieptType } from "@/types/recieptType";

export async function uploadReceiptData(
  receiptData: RecieptType,
  imageFile?: File
) {
  try {
    const formData = new FormData();

    // 영수증 데이터를 JSON 문자열로 변환하여 추가

    const dtoJsonString = JSON.stringify({
      name: receiptData.recieptName,
      shop_name: receiptData.storeName,
      date: receiptData.purchaseDate.split(" ")[0],
      price: receiptData.totalAmount,
      cardId: receiptData.selectedCardNumber,
      categoryId: 2,
    });

    const dtoBlob = new Blob([dtoJsonString], { type: "application/json" });
    formData.append("dto", dtoBlob);

    // 이미지 파일이 있다면 추가
    if (imageFile) {
      formData.append("image", imageFile);
    }

    console.log(formData);
    const session = await getSession();
    // 백엔드로 POST 요청
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/receipts/`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
      message: "영수증 업로드가 완료되었습니다.",
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
      message: "업로드 중 오류가 발생했습니다.",
    };
  }
}
