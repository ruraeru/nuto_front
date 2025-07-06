"use server";

import getSession from "./session";

export async function getCardsConsumeHistory() {
  const session = await getSession();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/consume/graph`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  const json = await response.json();
  return json.data;
}
