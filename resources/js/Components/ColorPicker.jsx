import React, { useState } from "react";
import { CirclePicker } from "react-color";

export default function ColorPicker({ color = "#fffff", onChange }) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <input
                type="text"
                value={color}
                className={`input w-full transition-opacity input-bordered relative after:content-[''] after:absolute after:right-6 
                after:bottom-1/2 after:translate-y-1/2 after:w-6 after:h-6 after:bg-red-300`}
                onClick={() => setShow((s) => !s)}
                style={{ opacity: show ? 0.5 : 1 }}
            />

            <div
                className="absolute w-8 h-8 top-1/2 -translate-y-1/2 transition-opacity right-4 rounded-full"
                style={{ backgroundColor: color, opacity: show ? 0.5 : 1 }}
                onClick={() => setShow((s) => !s)}
            />

            {show && (
                <div className="absolute -top-full left-1/4">
                    <CirclePicker
                        color={color}
                        onChangeComplete={(c) => {
                            setShow(false);
                            onChange(c.hex);
                        }}
                    />
                </div>
            )}
        </div>
    );
}
