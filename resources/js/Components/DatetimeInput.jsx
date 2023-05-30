import React, { useEffect, useState } from "react";
import { FaCalendar, FaTimes } from "react-icons/fa";

export default function DateTimeInput({
    label,
    value,
    onChange,
    error = null,
    leftIcon = null,
    inputClass = "",
}) {
    function formatDate() {
        if (!value) return null;

        const formattedMonth =
            value.getMonth() < 10
                ? `0${value.getMonth()}`
                : `${value.getMonth()}`;
        const formattedDays =
            value.getDay() < 10 ? `0${value.getDay()}` : `${value.getDay()}`;
        const formattedHours =
            value.getHours() < 10
                ? `0${value.getHours()}`
                : `${value.getHours()}`;
        const formattedMinutes =
            value.getMinutes() < 10
                ? `0${value.getMinutes()}`
                : `${value.getMinutes()}`;

        return `${value.getFullYear()}-${formattedMonth}-${formattedDays}T${formattedHours}:${formattedMinutes}`;
    }

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <label className="input-group">
                {leftIcon && <span>{leftIcon}</span>}

                <input
                    type="datetime-local"
                    value={formatDate()}
                    onChange={(ev) =>
                        onChange(new Date(ev.currentTarget.value))
                    }
                    className={`input w-full ${inputClass} ${
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
