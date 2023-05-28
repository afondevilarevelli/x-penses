import React, { useState } from "react";
import Icon from "./Icon";

const allIcons = [
    "FaBookReader",
    "FaGraduationCap",
    "FaAppleAlt",
    "FaCheese",
    "FaCarrot",
    "FaCookie",
    "FaCoffee",
    "FaGlassCheers",
    "FaShoppingCart",
    "FaListAlt",
    "FaEllipsisH",
    "FaGifts",
    "FaChargingStation",
    "FaChair",
    "FaTshirt",
    "FaGlasses",
    "FaClinicMedical",
    "FaFirstAid",
    "FaDumbbell",
    "FaCat",
    "FaDog",
    "FaGhost",
    "FaChessKnight",
    "FaDrum",
    "FaGuitar",
    "FaChurch",
    "FaCity",
    "FaDatabase",
];

export default function IconPicker({ icon, onChange }) {
    const [show, setShow] = useState(false);

    return (
        <div className="dropdown dropdown-top w-full">
            <div tabIndex={0} onClick={() => setShow(true)}>
                <input
                    value={icon}
                    readOnly
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
}
