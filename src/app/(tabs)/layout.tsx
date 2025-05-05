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
        <div className="p-16 h-screen flex">
            {/* <div className="fixed inset-y-0 left-0 z-50 w-56 transition-transform duration-300 ease-in-out transform lg:translate-x-0 lg:relative lg:inset-0 lg:z-0">
            </div> */}
            <Sidebar />
            {children}
        </div>
    );
}
