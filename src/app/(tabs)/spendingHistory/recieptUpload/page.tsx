"use client"

import { ChangeEvent, useActionState, useState } from "react";
import questionGemini from "./actions";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { IinitialState } from "@/types/recieptType";
import RecieptInfoChangeForm from "@/components/reciept-info-change-form"

const initialState: IinitialState = {
    output: null,
    prompt: "",
}

export default function RecieptUpload() {
    const [previewImg, setPreivew] = useState<string | null>(null);
    const [state, action, isPending] = useActionState(questionGemini, initialState);
    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = e;
        if (!files) return;
        const file = files[0];

        setPreivew(URL.createObjectURL(file));
    }
    return (
        <div className="flex justify-between pt-20 p-16 gap-5">
            <form action={action} className="w-full flex flex-col gap-5">
                <label
                    htmlFor="photo"
                    className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed
                    cursor-pointer bg-center bg-no-repeat bg-contain"
                    style={{
                        backgroundImage: previewImg ? `url(${previewImg})` : "none"
                    }}
                >
                    {!previewImg ? (
                        <>
                            <PhotoIcon className="w-20" />
                            <div className="text-neutral-400 text-sm">
                                사진을 추가해주세요.
                            </div>
                        </>
                    ) : null}
                </label>
                <input
                    id="photo"
                    className="bg-transparent rounded-md hidden h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-slate-500-500 border-none placeholder:text-neutral-400"
                    type="file"
                    accept="image/*"
                    name="imagePart"
                    onChange={onImageChange}
                />
                <button disabled={Boolean(!previewImg)} type="submit" className="bg-cyan-500 cursor-pointer disabled:bg-neutral-500 disabled:cursor-not-allowed p-5 rounded-full">Parsing</button>
            </form>
            <div className="w-full flex flex-col gap-5" >
                {/* <div className="flex items-center justify-center">
                    {
                        isPending && (
                            <div className="animate-spin rounded-full h-16 w-16 border-l-2 border-cyan-600" />
                        )
                    }
                </div> */}
                <RecieptInfoChangeForm isLoading={isPending} initialProductData={state?.output} />
            </div>
        </div>
    );
}
