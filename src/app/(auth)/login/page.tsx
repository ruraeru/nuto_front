import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center w-[670px] h-[500px] bg-gradient-to-b from-[#7CBBDE] to-[#C1E7F0] shadow-2xl p-5 rounded-2xl">
                <div>
                    <h1 className="text-4xl py-8 font-bold">로그인</h1>
                </div>
                <div className="w-3/4 flex flex-col gap-5">
                    <form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-5">
                            <Input label="" name="email" placeholder="이메일" />
                            <Input label="" name="password" placeholder="비밀번호" />
                        </div>
                        <div className="ml-4 flex items-center gap-2">
                            <input type="checkbox" className="size-4" />
                            <label className="font-medium">로그인 상태 유지</label>
                        </div>
                        <Button text="로그인" />
                    </form>
                    <div className="flex gap-5 items-center font-medium justify-center">
                        <Link href="findPassword">비밀번호 찾기</Link>
                        <Link href="findId">아이디 찾기</Link>
                        <Link href="signup">회원가입</Link>
                    </div>
                    <div className="flex gap-6 justify-center">
                        <div className="size-12 bg-amber-50 shadow-2xl rounded-full" />
                        <div className="size-12 bg-amber-50 shadow-2xl rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}