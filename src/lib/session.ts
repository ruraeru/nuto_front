import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionData {
  userId: string;
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
}

interface SessionConfig {
  cookieName: string;
  password: string;
  // cookieOptions: {
  //   secure: boolean;
  //   httpOnly: boolean;
  //   sameSite: "lax" | "static" | "none";
  //   maxAge?: number;
  // };
}

export const sessionConfig: SessionConfig = {
  cookieName: "nuto_session",
  password: process.env.COOKIE_PASSWORD as string,
  // cookieOptions: {
  //   secure: false,
  //   httpOnly: true,
  //   sameSite: "lax",
  //   maxAge: 3,
  // },
};

export default async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionConfig);
}
