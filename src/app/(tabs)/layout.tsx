import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nuto | 누구나 토닥이는 소비",
    description: "누구나 토닥이는 소비",
    icons: {
        icon: "/nuto.png"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`max-h-[1625px] justify-center flex gap-16 p-5`}>
            <Sidebar />
            {children}
        </div>
    );
}
