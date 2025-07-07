import getSession from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Header() {
    const session = await getSession();

    const handleLogOut = async () => {
        "use server";
        const session = await getSession();
        session.destroy();
        redirect("/login");
    }
    return (
        <header className="h-20 flex justify-between items-center px-20 p-4 bg-[#56A6D6]">
            <button className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div>
                <Link href="/">
                    <Image src="/nuto.svg" alt="nuto_logo" width={132} height={50} className="w-[132px] h-[50px]" />
                </Link>
            </div>
            {session.userId
                ? <form action={handleLogOut}><button className="text-sm">Logout</button></form>
                : <Link href="/login" className="text-sm">Login</Link>
            }
        </header>
    )
}