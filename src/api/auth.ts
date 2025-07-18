"use server";

import getSession from "@/lib/session";
import { AuthApiResponse, authFetch } from "./api";

export async function sendEmailCode(email: string): Promise<AuthApiResponse> {
  return authFetch("send-email", "POST", { email });
}

export async function verificationEmailCode(
  email: string,
  code: string
): Promise<AuthApiResponse> {
  return authFetch("verification", "POST", { email, code });
}

export interface SignUpProps {
  userId: string;
  name: string;
  password: string;
  age: number;
  job: string;
}

export async function signUp(formData: SignUpProps): Promise<AuthApiResponse> {
  return authFetch("signup", "POST", formData);
}

export async function AuthLogin({
  userId,
  password,
}: {
  userId: string;
  password: string;
}): Promise<
  AuthApiResponse<{ accessToken: string; refreshToken: string; userId: string }>
> {
  const result = await authFetch("login", "POST", { userId, password });
  if (result.success && result.data) {
    return {
      ...result,
      data: {
        accessToken: result.data.data.accessToken,
        refreshToken: result.data.data.refreshToken,
        userId: result.data.userId || userId,
      },
    };
  }
  return result;
}

export async function verificationToken(): Promise<AuthApiResponse<string>> {
  const session = await getSession();
  return authFetch(
    "", // API_URL/api/auth/ 바로 뒤에 아무것도 없음
    "POST",
    undefined, // POST 요청이지만 본문 없음
    { Authorization: "Bearer " + session.accessToken },
    "text" // 응답을 텍스트로 파싱
  );
}

interface IreissueToken {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

//토큰 재발급 함수 추후에 서버에서 만료된 토큰으로 요청을 주면 토큰이 만료된 토큰이라는 리턴을 줘야함...
export async function reissueToken() {
  const session = await getSession();
  const result = await authFetch<IreissueToken>("reissue", "POST", {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
  });

  if (result.success && result.data) {
    session.accessToken = result.data.accessToken;
    session.refreshToken = result.data.refreshToken;
    await session.save();
  }
}
