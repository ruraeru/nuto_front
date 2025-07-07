import { CompareExpense, ICompareExpenseIncomeProps } from "@/lib/utils";
import React from "react";
import LoadingSpinner from "../Chart/LoadingSpinner";


export default function ExpenseCompareCard({ expense, text }: { expense: ICompareExpenseIncomeProps | undefined, text: string }) {
    if (!expense) {
        return (
            <div className="mb-4 flex flex-col gap-4">
                <p className="font-semibold text-2xl">{text}</p>
                <div className="bg-gradient-to-tr from-[#7CBBDE] to-[#C1E7F0] w-[270px] h-[235px] rounded-2xl shadow-xl flex flex-col justify-center items-center text-white">
                    <LoadingSpinner />
                </div>
            </div>
        )
    }
    const compareResult = CompareExpense(expense);

    return (
        <div className="mb-4 flex flex-col gap-4">
            <p className="font-semibold text-2xl">{text}</p>
            <div className="bg-gradient-to-tr from-[#7CBBDE] to-[#C1E7F0] w-[270px] h-[235px] rounded-2xl shadow-xl flex flex-col justify-center items-center text-white">
                <React.Fragment>
                    <p>저번달 대비</p>
                    <p className="font-semibold text-4xl py-3">
                        {CompareExpense(expense)}
                    </p>
                    <p>더 지출하였습니다</p>
                </React.Fragment>
            </div>
        </div>
    )
}