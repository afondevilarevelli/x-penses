import { useState } from "react";
import Logo from "@/Components/Logo";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import ProfileDropdown from "./ProfileDropdown";
import { FaBars, FaTimes } from "react-icons/fa";
import useAppContext from "@/contexts/AppContext";

export default function Navbar({ user }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const { sidebarOpened, toogleSidebar } = useAppContext();

    return (
        <nav className="bg-neutral">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <label
                        className="swap"
                        onClick={(ev) => {
                            ev.preventDefault();
                            toogleSidebar();
                        }}
                    >
                        <input
                            type="checkbox"
                            className="bg-transparent border-0 hidden"
                            checked={sidebarOpened}
                            readOnly
                        />

                        <FaTimes className="swap-on h-6 w-6" />
                        <FaBars className="swap-off h-6 w-6" />
                    </label>

                    <div className="flex items-center ml-6">
                        <div className="ml-3 relative">
                            <ProfileDropdown user={user} />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " sm:hidden"
                }
            >
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800">
                            {user.name}
                        </div>
                        <div className="font-medium text-sm text-gray-500">
                            {user.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route("profile.edit")}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div> */}
        </nav>
    );
}
