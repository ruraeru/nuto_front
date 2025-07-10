"use server";

import { authenticatedFetch } from "./api";

interface IConsumeMonth {
  lastMonthExpense: number;
  thisMonthExpense: number;
}

interface IIcomeMonth {
  lastMonthExpense: number;
  thisMonthExpense: number;
}

interface IConsumeByCategory {
  labels: string[];
  data: number[];
  totalMount: number;
}

interface IConsumeYear {
  labels: string[];
  data: number[];
}

interface IConsumeByGraph {
  labels: string[];
  data: number[];
}

export async function getConsumeMonth(): Promise<IConsumeMonth> {
  const response = await authenticatedFetch<IConsumeMonth>(
    "/api/dashboard/consume/month",
    {
      method: "GET",
    }
  );

  if (response.success && response.data) {
    return response.data as IConsumeMonth;
  } else {
    console.error("getConsumeMonth: API 응답 실패 또는 데이터 없음", response);
    throw new Error(
      response.message || "월별 소비 데이터를 가져오는 데 실패했습니다."
    );
  }
}

export async function getIncomeMonth(): Promise<IIcomeMonth> {
  const response = await authenticatedFetch<IIcomeMonth>(
    "/api/dashboard/income/month",
    {
      method: "GET",
    }
  );
  if (response.success && response.data) {
    return response.data as IIcomeMonth;
  } else {
    console.error("getIncomeMonth: API 응답 실패 또는 데이터 없음", response);
    throw new Error(
      response.message || "월별 수입 데이터를 가져오는 데 실패했습니다."
    );
  }
}

export async function getConsumeByCategory(): Promise<IConsumeByCategory> {
  const response = await authenticatedFetch<IConsumeByCategory>(
    "/api/dashboard/consume/category",
    { method: "GET" }
  );
  if (response.success && response.data) {
    return response.data as IConsumeByCategory;
  } else {
    console.error(
      "getConsumeByCategory: API 응답 실패 또는 데이터 없음",
      response
    );
    throw new Error(
      response.message || "카테고리별 소비 데이터를 가져오는 데 실패했습니다."
    );
  }
}

export async function getConsumeYear(): Promise<IConsumeYear> {
  const response = await authenticatedFetch<IConsumeYear>(
    "/api/dashboard/year",
    {
      method: "GET",
    }
  );
  if (response.success && response.data) {
    return response.data as IConsumeYear;
  } else {
    console.error("getConsumeYear: API 응답 실패 또는 데이터 없음", response);
    throw new Error(
      response.message || "연간 소비 데이터를 가져오는 데 실패했습니다."
    );
  }
}

export async function getConsumeByGraph(): Promise<IConsumeByGraph> {
  const response = await authenticatedFetch<IConsumeByGraph>(
    "/api/dashboard/consume/graph",
    {
      method: "GET",
    }
  );
  if (response.success && response.data) {
    return response.data as IConsumeByGraph;
  } else {
    console.error(
      "getConsumeByGraph: API 응답 실패 또는 데이터 없음",
      response
    );
    throw new Error(
      response.message || "그래프 소비 데이터를 가져오는 데 실패했습니다."
    );
  }
}
