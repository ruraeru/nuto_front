"use server";

import { CalendarEvent } from "@/components/Calendar";
import { authenticatedFetch } from "./api";

export async function getCalendarConsumes(): Promise<CalendarEvent[]> {
  const response = await authenticatedFetch<CalendarEvent[]>("/api/calendar", {
    method: "GET",
  });
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error(
      "getCalendarConsumes: API 응답 실패 또는 데이터 없음",
      response
    );
    throw new Error(
      response.message || "캘린더 소비 데이터를 가져오는 데 실패했습니다."
    );
  }
}
