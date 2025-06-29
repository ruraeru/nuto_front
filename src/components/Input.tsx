import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps {
    name: string;
    label: string;
    errors?: string[];
}

const _Input = ({ name, label, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-base font-medium text-gray-700" htmlFor={name}>
                    {label}
                </label>
                <input
                    id={name}
                    ref={ref}
                    name={name}
                    className="
                border border-gray-300 rounded-md
                px-4 py-3
                text-base text-gray-900 bg-white
                transition duration-150 ease-in-out
                focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                placeholder:text-gray-400
            "
                    {...rest}
                />
            </div>
            {errors?.map((error, index) => (
                <span key={index} className="text-red-500 text-sm">
                    {error}
                </span>
            ))}
        </div>
    )
}

export default forwardRef(_Input);