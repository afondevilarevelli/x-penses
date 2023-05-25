import useAppContext from "@/contexts/AppContext";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSwap() {
    const { theme, toogleTheme } = useAppContext();

    return (
        <div
            className="tooltip tooltip-left"
            data-tip={theme == "night" ? "Light mode" : "Dark mode"}
        >
            <label className="swap swap-rotate">
                <input
                    type="checkbox"
                    className="hidden"
                    onChange={() => toogleTheme()}
                    checked={theme == "night"}
                />

                <FaSun className="swap-on w-6 h-6 text-neutral-content" />
                <FaMoon className="swap-off w-6 h-6 text-neutral-content" />
            </label>
        </div>
    );
}
