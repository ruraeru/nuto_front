"use server";

import getSession from "./session";

interface ConsumptionInfo {
  name: string;
  amount: number;
  cardName: string;
  date: string;
  categoryName: string;
}

interface ConsumptionRes {
  content: ConsumptionInfo[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export async function getConsumption(
  page: number = 1,
  searchTerm: string = "",
  category: string = "All"
): Promise<ConsumptionRes> {
  const session = await getSession();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/consumption/all?page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  const json = await response.json();
  return json.data;
}
