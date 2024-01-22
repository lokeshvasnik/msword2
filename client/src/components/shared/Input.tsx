import React, { useId } from "react";

const Input = (
    { label, type = "text", className = "", ...props }: any,
    ref: React.LegacyRef<HTMLInputElement> | undefined
): any => {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`focus:shadow-outline w-full rounded px-3 py-2 text-gray-700 focus:outline-none ${className}`}
                {...props}
                id={id}
                ref={ref}
            />
        </div>
    );
};

export default React.forwardRef(Input);
