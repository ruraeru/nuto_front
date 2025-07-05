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
