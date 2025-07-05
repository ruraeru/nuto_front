const API_URL = "http://127.0.0.1:8080";

export async function sendEmailCode(email: string) {
  console.log(email);
  const res = await fetch(`${API_URL}/api/auth/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  }).then((res) => res.json());

  console.log(res);
}

export async function verificationEmailCode(email: string, code: string) {
  console.log(email, code);
  const res = await fetch(`${API_URL}/api/auth/verification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      code,
    }),
  }).then((res) => res.json());
  return res;
}

export interface SignUpProps {
  userid: string;
  name: string;
  password: string;
  age: number;
  job: string;
}

export async function signUp(formData: SignUpProps) {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
    }),
  }).then((res) => res.json());

  return res;
}

export async function AuthLogin({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      console.error("AuthLogin API 에러: ", errorData);

      return {
        success: false,
        message:
          errorData.message ||
          "로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.",
        statusCode: response.status,
      };
    }

    const data = await response.json();

    return {
      success: true,
      message: "로그인 성공!",
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
      userId,
    };
  } catch (err) {
    console.error("AuthLogin 네트워크 오류 : ", err);
    return {
      success: false,
      message: "서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function verificationToken(accessToken: string) {
  const response = await fetch(`${API_URL}/api/auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  if (response.ok) {
    const data = await response.text();
    console.log(data);
    // return await response.json();
  }
}
