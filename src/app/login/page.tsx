import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex justify-center items-center h-screen text-white">
            <div className="flex flex-col items-center w-[670px] bg-gray-800 h-fit p-5 rounded-2xl">
                <div>
                    <h1 className="text-4xl py-8">로그인</h1>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-5">
                            <Input name="email" placeholder="이메일" />
                            <Input name="password" placeholder="비밀번호" />
                        </div>
                        <div>
                            <input type="checkbox" />
                            <label>로그인 상태 유지</label>
                        </div>
                        <Button text="로그인" />
                    </form>
                    <div className="flex gap-5 items-center justify-center">
                        <Link href="findPassword">비밀번호 찾기</Link>
                        <Link href="findPassword">아이디 찾기</Link>
                        <Link href="findPassword">회원가입</Link>
                    </div>
                    <div className="flex gap-6 justify-center">
                        <div className="size-12 bg-amber-50 rounded-full" />
                        <div className="size-12 bg-amber-50 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}