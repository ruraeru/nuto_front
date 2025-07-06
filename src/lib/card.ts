"use server";

import getSession from "./session";

export interface ICardInfo {
  cardNumber: string;
  totalAmount: number;
  cardType: string;
  expiryDate: string;
}

export interface CardFetchReturnProps {
  success: boolean;
  message: string;
  data: ICardInfo[];
}

export async function getCards(): Promise<CardFetchReturnProps> {
  const session = await getSession();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cards/`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
    }
  );

  const json = await response.json();
  return json;
}

// "success": true,
//     "message": "카드 목록 조회 성공",
//     "data": [
//         {
//             "cardNumber": "1234-5678-9012-3456",
//             "totalAmount": 500000,
//             "cardType": "카카오뱅크",
//             "expiryDate": "2026-12"
//         },
