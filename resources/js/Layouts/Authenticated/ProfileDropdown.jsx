import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import { Link } from "@inertiajs/react";

export default function ProfileDropdown() {
    const user = useUser();

    return (
        <div className="dropdown">
            <span tabIndex={0} className="inline-flex rounded-md items-center">
                <div className="avatar placeholder">
                    <div className="bg-base-100 text-base-content rounded-full w-10 h-10">
                        <span className="text-3xl">
                            {user.name[0].toUpperCase()}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm text-secondary-content"
                >
                    <div className="flex flex-col items-start mr-2">
                        <div>{user.name}</div>
                        <div className="opacity-80">{user.email}</div>
                    </div>
                </button>
            </span>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li>
                    <Link href={route("profile.edit")}>Profile</Link>
                </li>
                <li>
                    <Link href={route("logout")} method="post" as="button">
                        Log Out
                    </Link>
                </li>
            </ul>
        </div>
    );
}
