"use server";

import getSession from "@/lib/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface IConsumeMonth {
  lastMonthExpense: number;
  thisMonthExpense: number;
}

export async function getConsumeMonth(): Promise<IConsumeMonth> {
  const session = await getSession();
  const response = await fetch(`${API_URL}/api/dashboard/consume/month`, {
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
  });

  const json = await response.json();
  return json.data;
}

interface IIcomeMonth {
  lastMonthExpense: number;
  thisMonthExpense: number;
}

export async function getIncomeMonth(): Promise<IIcomeMonth> {
  const session = await getSession();
  const response = await fetch(`${API_URL}/api/dashboard/consume/month`, {
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
  });

  const json = await response.json();
  return json.data;
}

interface IConsumeByCategory {
  labels: string[];
  data: number[];
  totalMount: number;
}

export async function getConsumeByCategory(): Promise<IConsumeByCategory> {
  const session = await getSession();
  const response = await fetch(`${API_URL}/api/dashboard/consume/category`, {
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
  });

  const json = await response.json();
  return json.data;
}

interface IConsumeYear {
  labels: string[];
  data: number[];
}

export async function getConsumeYear(): Promise<IConsumeYear> {
  const session = await getSession();
  const response = await fetch(`${API_URL}/api/dashboard/year`, {
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
  });

  const json = await response.json();
  return json.data;
}

interface IConsumeByGraph {
  labels: string[];
  data: number[];
}

export async function getConsumeByGraph(): Promise<IConsumeByGraph> {
  const session = await getSession();
  const response = await fetch(`${API_URL}/api/dashboard/consume/graph`, {
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
  });

  const json = await response.json();
  return json.data;
}
