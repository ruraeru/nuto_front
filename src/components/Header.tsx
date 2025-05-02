import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-100">
            <button className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <h1 className="text-2xl font-bold">nuto</h1>
            <Link href="/login" className="text-sm">Login</Link>
        </header>
    )
}