import ProfileDropdown from "./ProfileDropdown";
import { FaBars, FaTimes } from "react-icons/fa";
import useAppContext from "@/contexts/AppContext";
import ThemeSwap from "./ThemeSwap";

export default function Navbar() {
    const { sidebarOpened, toogleSidebar } = useAppContext();

    return (
        <nav className="bg-secondary">
            <div className="mx-auto px-4 sm:px-6 xl:px-8">
                <div className="flex justify-between h-16">
                    <div
                        className="tooltip tooltip-right my-auto "
                        data-tip={
                            (sidebarOpened ? "Close" : "Open") + "Sidebar"
                        }
                    >
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

                            <FaTimes className="swap-on h-6 w-6 text-secondary-content" />
                            <FaBars className="swap-off h-6 w-6 text-secondary-content" />
                        </label>
                    </div>

                    <div className="flex items-center ml-6">
                        <ThemeSwap />

                        <div className="ml-6">
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
