"use server";

import { addCard, ICardInfo } from "@/lib/card";

export async function addCardAction(_: unknown, formData: FormData) {
  const data = {
    cardNumber: formData.get("cardNumber"),
    totalAmount: 0,
    cardType: formData.get("cardType"),
    expiryDate: formData.get("expiryDate"),
  };

  const resData = await addCard(data as ICardInfo);

  console.log(resData);
}
