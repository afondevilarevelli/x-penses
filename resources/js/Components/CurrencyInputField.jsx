import React from "react";
import CurrencyInput from "react-currency-input-field";

export default function CurrencyInputField({
    label,
    value,
    onChange,
    placeholder = "",
    error = null,
    leftIcon = null,
}) {
    return (
        <div className="form-control mt-4">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <label className="input-group">
                {leftIcon && <span>{leftIcon}</span>}

                <CurrencyInput
                    placeholder={placeholder}
                    value={value}
                    decimalsLimit={2}
                    onValueChange={(value, name) => onChange(value)}
                    className={`input w-full ${
                        error ? "input-error" : "input-bordered"
                    }`}
                />
            </label>

            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
}
