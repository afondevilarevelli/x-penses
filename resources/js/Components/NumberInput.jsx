import React from "react";

export default function NumberInput({
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

                <input
                    className={`input w-full ${
                        error ? "input-error" : "input-bordered"
                    }`}
                    placeholder={placeholder}
                    onKeyDown={(e) => {
                        if (
                            !/[0-9]/.test(e.key) &&
                            e.key != "Delete" &&
                            e.key != "Backspace" &&
                            e.key != "ArrowLeft" &&
                            e.key != "ArrowRight"
                        )
                            e.preventDefault();
                    }}
                    autoFocus
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
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
