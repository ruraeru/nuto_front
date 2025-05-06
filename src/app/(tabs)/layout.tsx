import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Nuto | 누구나 토닥이는 소비",
    description: "누구나 토닥이는 소비",
    icons: {
        icon: "/nuto.png"
    }
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-h-[1625px] flex justify-center relative">
            <Sidebar />
            <div className="w-[1280px] m-5">
                {children}
            </div>
        </div>
    );
}
