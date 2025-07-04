import Image from "next/image";
import Link from "next/link";

export default function Header() {
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
            <Link href="/login" className="text-sm">Login</Link>
        </header>
    )
}