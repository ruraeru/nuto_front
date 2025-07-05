"use server";

import { AuthLogin, verificationToken } from "@/lib/auth";
import getSession from "@/lib/session";
import z from "zod";

const loginSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

export async function login(prevState: unknown, formData: FormData) {
  const data = {
    userId: formData.get("userId"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    const errorMessage =
      fieldErrors.userId?.[0] ||
      fieldErrors.password?.[0] ||
      "유효하지 않은 입력입니다.";
    return { success: false, message: errorMessage };
  }

  const authRes = await AuthLogin(result.data);

  if (authRes.success) {
    const session = await getSession();

    session.accessToken = authRes.accessToken;
    session.refreshToken = authRes.refreshToken;
    session.isLoggedIn = true;
    session.userId = result.data.userId;

    await session.save();
    console.log("로그인 및 세션 저장 성공 : ", session);
    return { success: true, message: "로그인 성공!" };
  } else {
    console.error("AuthLogin 실패 : ", authRes.message);
    return {
      success: false,
      message:
        authRes.message ||
        "로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.",
    };
  }
}
