// actions/uploadActions.ts
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
    formData.append("receiptData", JSON.stringify(receiptData));

    // 이미지 파일이 있다면 추가
    if (imageFile) {
      formData.append("image", imageFile);
    }

    formData.append("recieptName", receiptData.recieptName);
    formData.append("storeName", receiptData.storeName);
    formData.append("address", receiptData.address);
    formData.append("purchaseDate", receiptData.purchaseDate);
    formData.append("totalAmount", receiptData.totalAmount.toString());
    formData.append("transactionType", receiptData.transactionType);
    formData.append("category", JSON.stringify(receiptData.category));

    console.log(formData);
    const session = await getSession();
    // 백엔드로 POST 요청
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Receipts`,
      {
        method: "POST",
        body: formData,
        headers: {
          // Content-Type을 설정하지 않음 (브라우저가 자동으로 설정)
          Authorization: `Bearer ${session.accessToken}`, // 필요시 인증 토큰 추가
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

// JSON 형태로만 전송하는 대안 액션
// export async function uploadReceiptDataJSON(receiptData: RecieptType) {
//   const session = await getSession();
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/receipts`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${session.accessToken}`, // 필요시 인증 토큰 추가
//         },
//         body: JSON.stringify(receiptData),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `HTTP error! status: ${response.status}, message: ${errorText}`
//       );
//     }

//     const result = await response.json();
//     return {
//       success: true,
//       data: result,
//       message: "영수증 업로드가 완료되었습니다.",
//     };
//   } catch (error) {
//     console.error("Upload error:", error);
//     return {
//       success: false,
//       error:
//         error instanceof Error
//           ? error.message
//           : "알 수 없는 오류가 발생했습니다.",
//       message: "업로드 중 오류가 발생했습니다.",
//     };
//   }
// }

// // 이미지를 Base64로 변환하여 JSON에 포함하는 액션
// export async function uploadReceiptWithBase64Image(
//   receiptData: RecieptType,
//   imageFile?: File
// ) {
//   try {
//     let base64Image = "";

//     if (imageFile) {
//       // 이미지를 Base64로 변환
//       const arrayBuffer = await imageFile.arrayBuffer();
//       const base64 = Buffer.from(arrayBuffer).toString("base64");
//       base64Image = `data:${imageFile.type};base64,${base64}`;
//     }

//     const requestData = {
//       ...receiptData,
//       image: base64Image,
//       imageType: imageFile?.type || "",
//     };

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/receipts`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.API_TOKEN}`, // 필요시 인증 토큰 추가
//         },
//         body: JSON.stringify(requestData),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `HTTP error! status: ${response.status}, message: ${errorText}`
//       );
//     }

//     const result = await response.json();
//     return {
//       success: true,
//       data: result,
//       message: "영수증 업로드가 완료되었습니다.",
//     };
//   } catch (error) {
//     console.error("Upload error:", error);
//     return {
//       success: false,
//       error:
//         error instanceof Error
//           ? error.message
//           : "알 수 없는 오류가 발생했습니다.",
//       message: "업로드 중 오류가 발생했습니다.",
//     };
//   }
// }
