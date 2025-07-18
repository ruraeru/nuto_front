"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { sendEmailCode, signUp, verificationEmailCode } from "@/api/auth";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function SignUpPage() {
    const [emailInfo, setEmailInfo] = useState({
        email: "",
        code: "",
    });

    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirm_password: "",
        name: "",
        age: 0,
        job: "학생",
        otherJob: "",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "email" || name === "code") {
            setEmailInfo(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSendEmailCode = async () => {
        if (!emailInfo.email) {
            alert("이메일을 입력해주세요.");
            return;
        }
        try {
            const response = await sendEmailCode(emailInfo.email);
            console.log("이메일 인증 코드 전송 응답:", response);
            alert("인증 코드가 이메일로 전송되었습니다. 이메일을 확인해주세요.");
        } catch (error) {
            console.error("이메일 인증 코드 전송 실패:", error);
            alert("이메일 인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleVerificationEmailCode = async () => {
        if (!emailInfo.code) {
            alert("코드를 입력해주세요.");
            return;
        }

        try {
            const response = await verificationEmailCode(emailInfo.email, emailInfo.code);
            alert(response.message);
            // 인증 성공 시 필드 비활성화
            if (response.success) {
                setIsEmailVerified(true);
            }
        } catch (error) {
            console.error("이메일 코드 확인 실패:", error);
            alert("이메일 코드 확인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // 이메일 인증이 완료되었는지 확인
        if (!isEmailVerified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }
        const response = await signUp({
            userId: emailInfo.email,
            name: formData.name,
            password: formData.password,
            age: formData.age,
            job: formData.job
        });
        if (response.success) {
            alert("회원가입 성공");
            redirect("/home");
        }
        else {
            console.error("회원가입 실패:", response.error);
            alert("회원가입 실패, 다시 시도해주세요.");
        }
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center w-[670px] h-fit bg-gradient-to-b from-[#7CBBDE] to-[#FFFFFF] shadow-2xl p-5 rounded-2xl">
                <div>
                    <h1 className="text-4xl py-8 font-bold">회원가입</h1>
                </div>
                <div className="flex flex-col gap-5 w-full px-20">
                    <div className="flex justify-between items-center gap-5 w-full">
                        <Input
                            style={{ width: "300px" }}
                            value={emailInfo.email}
                            onChange={onChange}
                            label=""
                            name="email"
                            placeholder="이메일"
                            type="email"
                            disabled={isEmailVerified} // 인증 성공 시 비활성화
                        />
                        <div>
                            <button
                                onClick={handleSendEmailCode}
                                className={`text-sm font-medium px-4 py-2 rounded-4xl
                                 transition-colors ${isEmailVerified ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#C1E7F0] hover:bg-[#C1E7F0]/50'}`}
                                disabled={isEmailVerified} // 인증 성공 시 비활성화
                            >
                                이메일 인증
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-5">
                        <Input
                            style={{ width: "300px" }}
                            value={emailInfo.code}
                            onChange={onChange}
                            label=""
                            name="code"
                            placeholder="이메일 코드"
                            type="text"
                            disabled={isEmailVerified} // 인증 성공 시 비활성화
                        />
                        <button
                            onClick={handleVerificationEmailCode}
                            className={`text-sm font-medium px-4 w-24 py-2 rounded-4xl
                                 transition-colors ${isEmailVerified ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#C1E7F0] hover:bg-[#C1E7F0]/50'}`}
                            disabled={isEmailVerified} // 인증 성공 시 비활성화
                        >
                            코드 확인
                        </button>
                    </div>
                    <form className="flex flex-col gap-5" onSubmit={handleSignupSubmit}>
                        <Input
                            value={formData.password}
                            onChange={onChange}
                            label=""
                            name="password"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                        />
                        <Input
                            value={formData.confirm_password}
                            onChange={onChange}
                            label=""
                            name="confirm_password"
                            type="password"
                            placeholder="비밀번호를 한 번 더 입력해주세요"
                        />
                        <Input
                            value={formData.name}
                            onChange={onChange}
                            label=""
                            name="name"
                            placeholder="이름을 입력해주세요"
                        />

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">나이를 입력해주세요</label>
                            <Input
                                value={formData.age}
                                onChange={onChange}
                                label=""
                                name="age"
                                type="number"
                                placeholder="나이를 입력해주세요"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">직업을 입력해주세요</label>
                            <div>
                                <select
                                    name="job"
                                    value={formData.job}
                                    onChange={onChange}
                                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="학생">학생</option>
                                    <option value="주부">주부</option>
                                    <option value="무직">무직</option>
                                    <option value="기타">기타</option>
                                </select>
                                {formData.job === '기타' && (
                                    <Input
                                        value={formData.otherJob}
                                        onChange={onChange}
                                        label=""
                                        name="otherJob"
                                        type="text"
                                        placeholder="직업을 직접 입력해주세요"
                                        className="mt-2"
                                    />
                                )}
                            </div>
                        </div>
                        <Button text="회원가입" />
                    </form>
                </div>
            </div>
        </div>
    );
}
