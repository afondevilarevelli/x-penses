import Logo from "@/Components/Logo";
import React, { useState } from "react";
import { FaBackward, FaForward, FaPlus } from "react-icons/fa";
import links from "./links";
import { Link } from "@inertiajs/react";
import useAppContext from "@/contexts/AppContext";

export default function Sidebar() {
    const { sidebarOpened, toogleSidebar } = useAppContext();

    function onToogleSidebarClicked(ev) {
        ev.preventDefault();
        toogleSidebar();
    }
    return (
        <div
            className={`menu bg-base-300 p-2 h-screen w-screen lg:w-80 text-base-content 
            justify-between items-center ${
                !sidebarOpened ? "lg:w-[74px]" : ""
            }`}
        >
            <div className="flex flex-col items-center w-full gap-4">
                <Logo size={sidebarOpened ? 150 : 60} />

                <button className="btn btn-primary btn-wide space-x-2">
                    <FaPlus className="text-xl" />
                    {sidebarOpened && <div className="text-2xl">New</div>}
                </button>

                <ul className="menu w-full">
                    {links.map((item, idx) => (
                        <li key={idx} className={!item.route ? "disabled" : ""}>
                            <Link
                                href={
                                    item.route ? route(item.route) : undefined
                                }
                                className={`${
                                    item.route && route().current(item.route)
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() => {
                                    if (window.innerWidth < 1024)
                                        toogleSidebar();
                                }}
                            >
                                {item.icon}
                                {sidebarOpened && item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <ul className="w-full">
                <li>
                    <a onClick={onToogleSidebarClicked}>
                        <label className="swap swap-rotate">
                            <input
                                type="checkbox"
                                className="bg-transparent border-0 hidden"
                                checked={sidebarOpened}
                                readOnly
                            />
                            <FaBackward className="swap-on h-6 w-6" />
                            <FaForward className="swap-off h-6 w-6" />
                        </label>
                        {sidebarOpened && <>Collapse</>}
                    </a>
                </li>
            </ul>
        </div>
    );
}
