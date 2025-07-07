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
  userid: string;
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

export async function verificationToken(
  accessToken: string
): Promise<AuthApiResponse<string>> {
  if (!accessToken) {
    return {
      success: false,
      message: "Access Token이 제공되지 않았습니다.",
      statusCode: 400,
    };
  }
  return authFetch(
    "", // API_URL/api/auth/ 바로 뒤에 아무것도 없음
    "POST",
    undefined, // POST 요청이지만 본문 없음
    { Authorization: "Bearer " + accessToken },
    "text" // 응답을 텍스트로 파싱
  );
}
