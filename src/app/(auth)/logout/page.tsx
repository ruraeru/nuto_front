"use client"

import useAuthStore from "@/lib/authStore";
import { redirect } from "next/navigation";

export default function LogoutPage() {
    const { logout } = useAuthStore();
    logout();
    redirect("/login");
}