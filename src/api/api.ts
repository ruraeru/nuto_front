"use server";

import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface FetchApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  statusCode?: number;
}

/**
 * API 요청을 위한 헬퍼 함수
 * @param path API 엔드포인트 경로 (예: "/api/dashboard/consume/month")
 * @param options fetch 옵션 (method, body 등)
 * @returns Promise<ApiResponse<T>> - 서버에서 반환되는 공통 응답 구조
 * @throws Error - 인증 실패, 네트워크 오류, 서버 오류 시 에러 발생
 */
export async function authenticatedFetch<T>(
  path: string,
  options?: RequestInit
): Promise<FetchApiResponse<T>> {
  const session = await getSession();

  if (!session || !session.accessToken) {
    console.error(
      `authenticatedFetch 에러: ${path} - 세션 또는 Access Token이 없습니다.`
    );
    redirect("/login");
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + session.accessToken,
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${path}`, config);
    const responseText = await response.text();
    let parsedData: FetchApiResponse<T>;

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      try {
        parsedData = JSON.parse(responseText);
      } catch (jsonError) {
        console.error(
          `authenticatedFetch 에러: ${path} - JSON 파싱 실패`,
          jsonError
        );
        console.error("원시 응답 텍스트:", responseText);
        throw new Error(
          `서버 오류: 유효하지 않은 JSON 응답 (${response.status})`
        );
      }
    } else {
      // JSON이 아닌 응답일 경우, 임의의 ApiResponse 구조로 만듭니다.
      console.error(
        `authenticatedFetch 에러: ${path} - 비-JSON 응답`,
        responseText
      );
      throw new Error(
        `서버 오류: ${responseText || `알 수 없는 오류 (${response.status})`}`
      );
    }

    if (!response.ok) {
      throw new Error(
        parsedData.message || `API 요청 실패: ${response.status}`
      );
    }

    return parsedData;
  } catch (error) {
    console.error(`authenticatedFetch 네트워크/처리 에러: ${path}`, error);
    throw error;
  }
}

export interface AuthApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  statusCode?: number;
  error?: string;
}

/**
 * 인증 관련 API 호출을 위한 공통 함수
 * @param endpoint API 엔드포인트 (예: 'login', 'send-email', 'signup')
 * @param method HTTP 메서드 (기본값: 'POST')
 * @param body 요청 본문 (객체)
 * @param additionalHeaders 추가 헤더
 * @param parseAs 응답 본문 파싱 방식 ('json' | 'text' | 'none', 기본값: 'json')
 * @returns {ApiResponse} 일관된 API 응답 형식
 */
export async function authFetch<T = any>(
  endpoint: string,
  method: string = "POST",
  body?: object,
  additionalHeaders?: HeadersInit,
  parseAs: "json" | "text" | "none" = "json"
): Promise<AuthApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...additionalHeaders,
    };

    const config: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined, // GET 요청 시 body가 없도록 undefined 처리
    };

    const response = await fetch(`${API_URL}/api/auth/${endpoint}`, config);
    const responseText = await response.text(); // 일단 텍스트로 받아둡니다.

    if (response.ok) {
      // 성공 응답 처리
      let parsedData: T | undefined;
      if (parseAs === "json" && responseText) {
        try {
          parsedData = JSON.parse(responseText);
        } catch (jsonError) {
          console.error(
            `authFetch [${endpoint}] JSON 파싱 실패 (성공 응답):`,
            jsonError
          );
          console.error(`원시 응답 텍스트 (성공 응답):`, responseText);
          return {
            success: false,
            message: `서버 응답 오류: 유효하지 않은 JSON 응답 (${response.status})`,
            statusCode: response.status,
            error: "JSON_PARSE_ERROR",
          };
        }
      } else if (parseAs === "text") {
        parsedData = responseText as T;
      }
      // 'none'이거나 본문이 없으면 parsedData는 undefined

      return {
        success: true,
        data: parsedData,
        message: "요청 성공",
        statusCode: response.status,
      };
    } else {
      // 에러 응답 처리
      let errorData: any = {};
      try {
        if (responseText) {
          // 응답 본문이 비어있지 않은 경우에만 JSON 파싱 시도
          errorData = JSON.parse(responseText);
        }
      } catch (jsonError) {
        console.error(
          `authFetch [${endpoint}] JSON 파싱 실패 (에러 응답):`,
          jsonError
        );
        console.error(`원시 응답 텍스트 (에러 응답):`, responseText);
        // JSON이 아니거나 파싱 실패 시, 원시 텍스트를 메시지로 사용
        return {
          success: false,
          message:
            errorData.message ||
            responseText ||
            `알 수 없는 오류 (${response.status})`,
          statusCode: response.status,
          error: "NON_JSON_ERROR_RESPONSE",
        };
      }

      console.error(`authFetch [${endpoint}] API 에러 응답 데이터:`, errorData);
      return {
        success: false,
        message: errorData.message || `API 요청 실패 (${response.status})`,
        statusCode: response.status,
        error: errorData.error || "API_ERROR",
      };
    }
  } catch (networkError) {
    // 네트워크 요청 자체의 실패 (예: 서버 연결 불가)
    console.error(`authFetch [${endpoint}] 네트워크 에러:`, networkError);
    return {
      success: false,
      message: "네트워크 오류가 발생했습니다. 서버에 연결할 수 없습니다.",
      statusCode: 500, // 또는 적절한 상태 코드
      error: "NETWORK_ERROR",
    };
  }
}
