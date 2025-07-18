import getSession from "@/lib/session";

interface IConsumeTopCategories {
  id: number;
  name: string;
  type: string;
}
export async function getConsumeTopCategories(): Promise<
  IConsumeTopCategories[]
> {
  const session = await getSession();
  const json = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/main/top-categories`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
    }
  ).then((res) => res.json());

  return json as IConsumeTopCategories[];
}
