"use server";

import { authenticatedFetch } from "@/api/api";

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
  searchTerm?: string,
  category?: string
): Promise<ConsumptionRes> {
  const response = await authenticatedFetch<ConsumptionRes>(
    `/api/consumption/all?page=${page}`,
    {
      method: "GET",
    }
  );
  if (response.success && response.data) {
    // if (searchTerm) {
    //   console.log(
    //     response.data.content.filter((item) => item.name.includes(searchTerm))
    //   );
    //   return response.data.content.filter((item) =>
    //     item.name.includes(searchTerm)
    //   );
    // }
    return response.data;
  } else {
    console.error("getConsumption: API 응답 실패 또는 데이터 없음", response);
    throw new Error(
      response.message || "소비 내역 데이터를 가져오는 데 실패했습니다."
    );
  }
  // if (category) {
  //   return await getConsumptionByCategory(category);
  // } else {
  //   const response = await authenticatedFetch<ConsumptionRes>(
  //     `/api/consumption/all?page=${page}`,
  //     {
  //       method: "GET",
  //     }
  //   );
  //   if (response.success && response.data) {
  //     return response.data;
  //   } else {
  //     console.error("getConsumption: API 응답 실패 또는 데이터 없음", response);
  //     throw new Error(
  //       response.message || "소비 내역 데이터를 가져오는 데 실패했습니다."
  //     );
  //   }
  // }
}

interface ICategories {
  id: number;
  name: string;
  type: string;
}

export async function getConsumptionCategories(): Promise<ICategories[]> {
  const response = await authenticatedFetch<ICategories[]>(
    "/api/consumption/categories",
    {
      method: "GET",
    }
  );
  if (response.success && response.data) {
    return response.data.slice(0, 6);
  } else {
    console.error("getConsumption: API 응답 실패 또는 데이터 없음", response);
    throw new Error(
      response.message || "소비 내역 데이터를 가져오는 데 실패했습니다."
    );
  }
}

export async function getConsumptionByCategory(
  category: string
): Promise<ConsumptionRes> {
  const response = await authenticatedFetch<ConsumptionRes>(
    `/api/consumption/category?${category}`,
    {
      method: "GET",
    }
  );
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error(
      "getConsumptionByCategory: API 응답 실패 또는 데이터 없음",
      response
    );
    throw new Error(
      response.message || "소비 내역 데이터를 가져오는 데 실패했습니다."
    );
  }
}
