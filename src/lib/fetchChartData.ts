import { authenticatedFetch } from "@/api/api";

interface ICardsConsumeHistory {
  labels: number[];
  data: number[];
}

export async function getCardsConsumeHistory(): Promise<ICardsConsumeHistory> {
  const response = await authenticatedFetch<ICardsConsumeHistory>(
    "/api/graph",
    {
      method: "GET",
    }
  );

  if (response.success && response.data) {
    return response.data;
  } else {
    console.error(
      "getCardsConsumeHistory: API 응답 실패 또는 데이터 없음",
      response
    );
    throw new Error(
      response.message || "소비 그래프 데이터를 가져오는 데 실패했습니다."
    );
  }
}
