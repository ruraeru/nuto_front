"use server";

import { authenticatedFetch } from "@/api/api";
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

export async function addCard(data: ICardInfo) {
  const session = await getSession();
  const json = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cards/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  return json;
}

export async function getCards(): Promise<ICardInfo[]> {
  const response = await authenticatedFetch("/api/cards/", {
    method: "GET",
  });
  if (response.success && response.data) {
    return response.data as ICardInfo[];
  } else {
    console.error("getCards: API 응답 실패 또는 데이터 없음", response);
    throw new Error(
      response.message || "카드 데이터를 가져오는 데 실패했습니다."
    );
  }
}

export async function getCard(cardId: number) {
  const session = await getSession();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cards/${cardId}`,
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

export async function deleteCard(cardId: number) {
  const session = await getSession();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cards/delete/${cardId}`,
    {
      method: "DELETE",
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
