import React, { useEffect, useState } from "react";
import { CirclePicker } from "react-color";
import * as Icons from "react-icons/fa";
import Icon from "./Icon";
import { Popover } from "@headlessui/react";

const allIcons = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
];

export default function IconPicker({ icon, onChange }) {
    const [show, setShow] = useState(false);

    // const [allIcons, setAllIcons] = useState([]);

    // useEffect(() => {
    //     setAllIcons(Object.keys(Icons));
    // }, []);

    return (
        <div className="dropdown dropdown-top w-full">
            <div tabIndex={0} onClick={() => setShow(true)}>
                <input
                    value={icon}
                    className={`input w-full transition-opacity input-bordered`}
                    onClick={() => setShow((s) => !s)}
                    style={{ opacity: show ? 0.5 : 1 }}
                />

                <div
                    className="absolute w-8 h-8 top-1/2 -translate-y-1/2 transition-opacity right-4 rounded-full"
                    style={{ opacity: show ? 0.5 : 1 }}
                    // onClick={() => setShow((s) => !s)}
                >
                    <Icon name={icon} size={32} />
                </div>
            </div>

            {show && (
                <div
                    tabIndex={0}
                    className={`dropdown-content menu p-4 w-fit h-48 shadow bg-base-100 rounded-box space-y-4
                    overflow-y-auto`}
                >
                    <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                        {allIcons.map((iconName, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    onChange(iconName);
                                    setShow(false);
                                }}
                            >
                                <Icon name={iconName} size={32} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="relative">
            <input
                value={icon}
                className={`input w-full transition-opacity input-bordered relative after:content-[''] after:absolute after:right-6
                after:bottom-1/2 after:translate-y-1/2 after:w-6 after:h-6 after:bg-red-300`}
                onClick={() => setShow((s) => !s)}
                style={{ opacity: show ? 0.5 : 1 }}
            />

            <div
                className="absolute w-8 h-8 top-1/2 -translate-y-1/2 transition-opacity right-4 rounded-full"
                style={{ opacity: show ? 0.5 : 1 }}
                onClick={() => setShow((s) => !s)}
            >
                <Icon name={icon} />
            </div>

            {show && (
                <div className="absolute -top-full left-1/4">
                    <div className="grid grid-cols-4">
                        {allIcons.map((iconName, idx) => (
                            <div key={idx}>
                                <Icon name={iconName} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
