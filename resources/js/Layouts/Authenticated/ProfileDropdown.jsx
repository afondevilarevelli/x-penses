import React from "react";
import Dropdown from "@/Components/Dropdown";
import { FaArrowDown } from "react-icons/fa";

export default function ProfileDropdown({ user }) {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md items-center">
                    <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
                            <span className="text-3xl">
                                {user.name[0].toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 text-sm text-base-content"
                    >
                        <div className="flex flex-col items-start mr-2">
                            <div>{user.name}</div>
                            <div className="opacity-80">{user.email}</div>
                        </div>

                        <FaArrowDown />
                    </button>
                </span>
            </Dropdown.Trigger>

            <Dropdown.Content>
                <Dropdown.Link href={route("profile.edit")}>
                    Profile
                </Dropdown.Link>
                <Dropdown.Link href={route("logout")} method="post" as="button">
                    Log Out
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    );
}
